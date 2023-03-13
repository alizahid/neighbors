import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { getStorage } from '~/lib/storage'
import { supabase } from '~/lib/supabase'
import { queryClient } from '~/lib/trpc'

export const useSignOut = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const signOut = useCallback(async () => {
    setLoading(true)

    await supabase.auth.signOut()

    queryClient.clear()

    getStorage('supabase').clear()
    getStorage('trpc').clear()
    getStorage('building').clear()

    router.replace('/')

    setLoading(false)
  }, [router])

  return {
    loading,
    signOut,
  }
}
