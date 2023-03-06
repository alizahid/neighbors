import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { produce } from 'immer'
import { useCallback, useState } from 'react'

import { supabase } from '~/lib/supabase'
import { ChatChannelSchema, type ChatChannelView } from '~/schemas/chat/channel'
import { type Database } from '~/types/supabase'

export const useChannels = () => {
  const { isLoading, refetch } = useQuery(
    ['channels'],
    async () => {
      const { data } = await supabase.from('channels').select('*')

      return data?.map((item) => ChatChannelSchema.parse(item))
    },
    {
      onSuccess(data) {
        if (!data) {
          return
        }

        setChannels(data)
      },
    }
  )

  const [channels, setChannels] = useState<Array<ChatChannelView>>([])
  const [connected, setConnected] = useState(false)

  useFocusEffect(
    useCallback(() => {
      refetch()

      const onChannelUpdate = supabase
        .channel('channels')
        .on<Database['public']['Tables']['Channel']['Row']>(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'Channel',
          },
          (payload) =>
            setChannels((channels) =>
              produce(channels, (next) => {
                const channel = next.find(({ id }) => id === payload.new.id)

                if (channel) {
                  channel.message = payload.new.message
                  channel.updatedAt = new Date()
                }
              })
            )
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
