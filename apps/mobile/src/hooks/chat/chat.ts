import { parseISO } from 'date-fns'
import { useFocusEffect } from 'expo-router'
import { produce } from 'immer'
import { uniqBy } from 'lodash-es'
import { useCallback, useState } from 'react'
import { z } from 'zod'

import { type MessageItem } from '~/components/chat/message'
import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

const schema = z.object({
  body: z.string(),
  channelId: z.string().cuid(),
  createdAt: z.string().transform((value) => parseISO(value)),
  id: z.string().cuid(),
  meta: z.object({}),
  updatedAt: z.string().transform((value) => parseISO(value)),
  userId: z.string().uuid(),
})

export const useChat = (channelId: string) => {
  const utils = trpc.useContext()

  const {
    data: channel,
    isLoading: isLoadingChannel,
    refetch: refetchChannel,
  } = trpc.chat.channel.useQuery({
    id: channelId,
  })

  const { mutateAsync: markChecked } = trpc.chat.markChecked.useMutation({
    onSuccess(memberId) {
      utils.chat.channels.setData(undefined, (data) =>
        produce(data, (next) => {
          if (!next) {
            return next
          }

          const channelIndex = next.findIndex(({ id }) => id === channelId)

          const memberIndex = next[channelIndex].members.findIndex(
            ({ id }) => id === memberId
          )

          next[channelIndex].members[memberIndex].checkedAt = new Date()
        })
      )
    },
  })

  const { isLoading: isLoadingMessages, refetch: refetchMessages } =
    trpc.chat.messages.useInfiniteQuery(
      {
        channelId,
      },
      {
        onSuccess(data) {
          const items = data.pages.flatMap(({ messages }) => messages)

          setMessages((messages) => uniqBy([...messages, ...items], 'id'))
        },
      }
    )

  const [messages, setMessages] = useState<Array<MessageItem>>([])
  const [connected, setConnected] = useState(false)

  const refetch = useCallback(() => {
    refetchChannel()
    refetchMessages()
  }, [refetchChannel, refetchMessages])

  useFocusEffect(
    useCallback(() => {
      refetch()

      markChecked({
        channelId,
      })

      const onMessageInsert = supabase
        .channel('channels')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            filter: `channelId=eq.${channelId}`,
            schema: 'public',
            table: 'Message',
          },
          (payload) => {
            const message = schema.parse(payload.new)

            setMessages((messages) => [message, ...messages])
          }
        )
        .subscribe((status) => setConnected(status === 'SUBSCRIBED'))

      return () => {
        onMessageInsert.unsubscribe()
      }
    }, [channelId, markChecked, refetch])
  )

  return {
    channel,
    connected,
    loading: isLoadingChannel || isLoadingMessages,
    messages,
    refetch,
  }
}
