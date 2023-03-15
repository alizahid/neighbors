import { type RealtimePostgresInsertPayload } from '@supabase/supabase-js'
import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { produce } from 'immer'
import { first } from 'lodash-es'
import { useCallback, useEffect, useMemo } from 'react'

import { groupMessages } from '~/lib/chat'
import { supabase } from '~/lib/supabase'
import { queryClient, trpc } from '~/lib/trpc'
import { ChatChannelSchema, type ChatChannelView } from '~/schemas/chat/channel'
import { ChatMessageSchema, type ChatMessageView } from '~/schemas/chat/message'
import { type Database } from '~/types/supabase'

type MessageRow = Database['public']['Tables']['Message']['Row']

export const useChat = (channelId: string) => {
  const { data: channel } = useQuery(['channels', channelId], async () => {
    const { data } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .single()

    return ChatChannelSchema.parse(data)
  })

  const utils = trpc.useContext()

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery(
      ['chat', channelId],
      async ({ pageParam = 0 }) => {
        const from = pageParam
        const to = pageParam + 100

        const { count, data } = await supabase
          .from('messages')
          .select('*', {
            count: 'exact',
          })
          .eq('channelId', channelId)
          .order('createdAt', {
            ascending: false,
          })
          .range(from, to)

        return {
          data: data?.map((item) => ChatMessageSchema.parse(item)) ?? [],
          next: (count ?? 0) > to ? to + 1 : undefined,
        }
      },
      {
        getNextPageParam: ({ next }) => next,
      }
    )

  const { mutate: markChecked } = trpc.chat.markChecked.useMutation({
    onSuccess({ userId }) {
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
            ({ data }) => data.findIndex(({ id }) => id === channelId) >= 0
          )

          const channelIndex = next.pages[pageIndex]?.data.findIndex(
            ({ id }) => id === channelId
          )

          const channel = next.pages[pageIndex]?.data[channelIndex]

          const member = channel?.members.find((member) => member.id === userId)

          if (member) {
            member.checkedAt = new Date()
          }
        })
      })
    },
  })

  useEffect(() => {
    markChecked({
      channelId,
    })
  }, [channelId, markChecked])

  const onMessageInsert = useCallback(
    (payload: RealtimePostgresInsertPayload<MessageRow>) => {
      const user = channel?.members.find(({ id }) => id === payload.new.userId)

      const message = ChatMessageSchema.parse({
        ...payload.new,
        user: {
          id: user?.id,
          image: user?.image,
          name: user?.name,
        },
      })

      queryClient.setQueryData<
        InfiniteData<{
          data: Array<ChatMessageView>
          next?: number
        }>
      >(['chat', channelId], (data) => {
        if (!data) {
          return data
        }

        return produce(data, (next) => {
          first(next.pages)?.data.unshift(message)
        })
      })
    },
    [channel?.members, channelId]
  )

  useEffect(() => {
    const channel = supabase
      .channel(`channel-${channelId}`)
      .on<MessageRow>(
        'postgres_changes',
        {
          event: 'INSERT',
          filter: `channelId=eq.${channelId}`,
          schema: 'public',
          table: 'Message',
        },
        (payload) => onMessageInsert(payload)
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [channelId, onMessageInsert])

  const messages = useMemo(() => {
    const messages = data?.pages.flatMap(({ data }) => data) ?? []

    return groupMessages(messages)
  }, [data?.pages])

  const fetchMore = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  return {
    channel,
    fetchMore,
    loading: isLoading,
    messages,
    refetch,
  }
}
