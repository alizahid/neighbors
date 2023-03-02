import { useFocusEffect } from 'expo-router'
import { produce } from 'immer'
import { useCallback, useState } from 'react'

import { type ChannelItem } from '~/components/chat/channel'
import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

export const useChannels = () => {
  const { isLoading, refetch } = trpc.chat.channels.useQuery(undefined, {
    onSuccess(data) {
      setChannels(data)
    },
  })

  const [channels, setChannels] = useState<Array<ChannelItem>>([])
  const [connected, setConnected] = useState(false)

  useFocusEffect(
    useCallback(() => {
      refetch()

      const onChannelUpdate = supabase
        .channel('channels')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'Channel',
          },
          (payload) => {
            setChannels((channels) =>
              produce(channels, (next) => {
                const index = next.findIndex(({ id }) => id === payload.new.id)

                next[index].message = payload.new.message
                next[index].updatedAt = new Date()
              })
            )
          }
        )
        .subscribe((status) => setConnected(status === 'SUBSCRIBED'))

      return () => {
        onChannelUpdate.unsubscribe()
      }
    }, [refetch])
  )

  return {
    channels,
    connected,
    loading: isLoading,
    refetch,
  }
}
