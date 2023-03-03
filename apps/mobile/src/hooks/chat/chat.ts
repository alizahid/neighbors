import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { produce } from 'immer'
import { uniqBy } from 'lodash-es'
import { useCallback, useMemo, useRef, useState } from 'react'

import { groupMessages } from '~/lib/chat'
import { supabase } from '~/lib/supabase'
import { queryClient, trpc } from '~/lib/trpc'
import { type ChatChannelView } from '~/schemas/chat/channel'
import { ChatMessageSchema, type ChatMessageView } from '~/schemas/chat/message'
import { type ChatUserView } from '~/schemas/chat/user'
import { type Database } from '~/types/supabase'

export const useChat = (channelId: string) => {
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

        users.current = uniqBy(
          data.map(({ user }) => user),
          'id'
        )
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

  const users = useRef<Array<ChatUserView>>([])

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
            const message = ChatMessageSchema.parse({
              ...payload.new,
              user: users.current.find(({ id }) => id === payload.new.userId),
            })

            setMessages((messages) => [message, ...messages])
          }
        )
        .subscribe((status) => setConnected(status === 'SUBSCRIBED'))

      return () => {
        onMessageInsert.unsubscribe()
      }
    }, [channelId, markChecked, users])
  )

  const grouped = useMemo(() => groupMessages(messages), [messages])

  return {
    connected,
    loading: isLoading,
    members: users.current,
    messages: grouped,
    refetch,
  }
}
