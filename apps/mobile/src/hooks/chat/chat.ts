import { useQuery } from '@tanstack/react-query'
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

  const { isLoading, refetch } = useQuery(
    ['chat', channelId],
    async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('channelId', channelId)
        .order('createdAt', {
          ascending: false,
        })
        .limit(100)

      return data?.map((item) => ChatMessageSchema.parse(item))
    },
    {
      onSuccess(data) {
        if (!data) {
          return
        }

        setMessages(data)
      },
    }
  )

  const { mutateAsync: markChecked } = trpc.chat.markChecked.useMutation({
    onSuccess({ userId }) {
      queryClient.setQueryData<Array<ChatChannelView>>(['channels'], (data) =>
        produce(data, (next) => {
          if (!next) {
            return next
          }

          const channelIndex = next.findIndex(({ id }) => id === channelId)
          const memberIndex = next[channelIndex].members.findIndex(
            (member) => member.userId === userId
          )

          next[channelIndex].members[memberIndex].checkedAt = new Date()
        })
      )
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
    loading: isLoading,
    messages: grouped,
    refetch,
  }
}
