import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { produce } from 'immer'
import { useCallback, useMemo, useState } from 'react'

import { groupMessages } from '~/lib/chat'
import { supabase } from '~/lib/supabase'
import { queryClient, trpc } from '~/lib/trpc'
import { ChatChannelSchema, type ChatChannelView } from '~/schemas/chat/channel'
import { ChatMessageSchema, type ChatMessageView } from '~/schemas/chat/message'
import { type Database } from '~/types/supabase'

export const useChat = (channelId: string) => {
  useQuery(
    ['channels', channelId],
    async () => {
      const { data } = await supabase
        .from('channels')
        .select('*')
        .eq('id', channelId)
        .single()

      return ChatChannelSchema.parse(data)
    },
    {
      onSuccess(data) {
        setChannel(data)
      },
    }
  )

  const { fetchNextPage, hasNextPage, isLoading, refetch } = useInfiniteQuery(
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
      onSuccess(data) {
        setMessages(data.pages.flatMap(({ data }) => data))
      },
    }
  )

  const { mutate: markChecked } = trpc.chat.markChecked.useMutation({
    onSuccess({ userId }) {
      queryClient.setQueryData<Array<ChatChannelView>>(['channels'], (data) => {
        if (!data) {
          return data
        }

        return produce(data, (next) => {
          const channel = next.find(({ id }) => id === channelId)

          const member = channel?.members.find(
            (member) => member.userId === userId
          )

          if (member) {
            member.checkedAt = new Date()
          }
        })
      })
    },
  })

  const [channel, setChannel] = useState<ChatChannelView>()
  const [messages, setMessages] = useState<Array<ChatMessageView>>([])
  const [connected, setConnected] = useState(false)

  useFocusEffect(
    useCallback(() => {
      markChecked({
        channelId,
      })

      const onMessageInsert = supabase
        .channel('channels')
        .on<Database['public']['Tables']['Message']['Row']>(
          'postgres_changes',
          {
            event: 'INSERT',
            filter: `channelId=eq.${channelId}`,
            schema: 'public',
            table: 'Message',
          },
          (payload) => {
            const user = channel?.members.find(
              ({ userId }) => userId === payload.new.userId
            )

            const message = ChatMessageSchema.parse({
              ...payload.new,
              user: {
                id: user?.userId,
                image: user?.image,
                name: user?.name,
              },
            })

            setMessages((messages) => [message, ...messages])
          }
        )
        .subscribe((status) => setConnected(status === 'SUBSCRIBED'))

      return () => {
        onMessageInsert.unsubscribe()
      }
    }, [channel?.members, channelId, markChecked])
  )

  const grouped = useMemo(() => groupMessages(messages), [messages])

  return {
    channel,
    connected,
    fetchMore: () => {
      if (hasNextPage) {
        fetchNextPage()
      }
    },
    loading: isLoading,
    messages: grouped,
    refetch,
  }
}
