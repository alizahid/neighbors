import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { orderBy } from 'lodash-es'
import {
  createContext,
  type FunctionComponent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react'

import { useProfile } from '~/hooks/auth/profile'
import { supabase } from '~/lib/supabase'
import { queryClient, trpc } from '~/lib/trpc'
import { ChatChannelSchema, type ChatChannelView } from '~/schemas/chat/channel'
import { type Database } from '~/types/supabase'

type ChannelRow = Database['public']['Tables']['Channel']['Row']

type ChatValue = {
  channels: Array<ChatChannelView>
  loading: boolean

  fetchMore: () => Promise<unknown>
  refetch: () => Promise<unknown>
}

const ChatContext = createContext<ChatValue>({
  channels: [],
  fetchMore: async () => null,
  loading: true,
  refetch: async () => null,
})

type Props = {
  children: ReactNode
}

export const ChatProvider: FunctionComponent<Props> = ({ children }) => {
  const { profile } = useProfile()

  const utils = trpc.useContext()

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery(
      ['channels'],
      async ({ pageParam = 0 }) => {
        const from = pageParam
        const to = pageParam + 100

        const { count, data } = await supabase
          .from('channels')
          .select('*', {
            count: 'exact',
          })
          .range(from, to)

        return {
          data: data?.map((item) => ChatChannelSchema.parse(item)) ?? [],
          next: (count ?? 0) > to ? to + 1 : undefined,
        }
      },
      {
        enabled: !!profile,
        getNextPageParam: ({ next }) => next,
      }
    )

  const onChannelUpdate = useCallback(
    (payload: RealtimePostgresUpdatePayload<ChannelRow>) => {
      utils.notifications.badge.invalidate()

      queryClient.setQueryData<
        InfiniteData<{
          data: Array<ChatChannelView>
          next?: number
        }>
      >(['channels'], (data) => {
        if (!data) {
          return data
        }

        return produce(data, (next) => {
          const pageIndex = next.pages.findIndex(
            ({ data }) => data.findIndex(({ id }) => id === payload.new.id) >= 0
          )

          const channelIndex = next.pages[pageIndex]?.data.findIndex(
            ({ id }) => id === payload.new.id
          )

          const channel = next.pages[pageIndex]?.data[channelIndex]

          if (channel) {
            channel.updatedAt = new Date()
            channel.message = payload.new.message
          }
        })
      })
    },
    [utils.notifications.badge]
  )

  useEffect(() => {
    const channel = supabase
      .channel('channels')
      .on<ChannelRow>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Channel',
        },
        (payload) => onChannelUpdate(payload)
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [onChannelUpdate])

  const fetchMore = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const channels = orderBy(
    data?.pages.flatMap(({ data }) => data) ?? [],
    'updatedAt',
    'desc'
  )

  return (
    <ChatContext.Provider
      value={{
        channels,
        fetchMore,
        loading: isLoading,
        refetch,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChannels = () => useContext(ChatContext)
