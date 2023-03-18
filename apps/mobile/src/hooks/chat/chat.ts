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
import { queryClient } from '~/lib/trpc'
import { ChatChannelSchema } from '~/schemas/chat/channel'
import { ChatMessageSchema, type ChatMessageView } from '~/schemas/chat/message'
import { type Database } from '~/types/supabase'

import { useChannelChecked } from './checked'

type MessageRow = Database['public']['Tables']['Message']['Row']

export const useChat = (channelId: string) => {
  const { markChecked } = useChannelChecked(channelId)

  const { data: channel } = useQuery(['channels', channelId], async () => {
    const { data } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .single()

    return ChatChannelSchema.parse(data)
  })

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
