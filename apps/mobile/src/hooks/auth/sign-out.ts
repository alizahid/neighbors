import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { getStorage } from '~/lib/storage'
import { supabase } from '~/lib/supabase'
import { queryClient, trpc } from '~/lib/trpc'

import { useDeviceId } from '../device-id'

export const useSignOut = () => {
  const router = useRouter()

  const { deviceId } = useDeviceId()

  const [loading, setLoading] = useState(false)

  const { mutateAsync } = trpc.users.signOut.useMutation()

  const signOut = useCallback(async () => {
    setLoading(true)

    if (deviceId) {
      await mutateAsync({
        id: deviceId,
      })
    }

    await supabase.auth.signOut()

    queryClient.clear()

    getStorage('supabase').clear()
    getStorage('trpc').clear()
    getStorage('building').clear()

    router.replace('/')

    setLoading(false)
  }, [deviceId, mutateAsync, router])

  return {
    loading,
    signOut,
  }
}
