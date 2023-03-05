import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { supabase } from '~/lib/supabase'
import { queryClient } from '~/lib/trpc'

export const useSignOut = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const signOut = useCallback(async () => {
    setLoading(true)

    await supabase.auth.signOut()

    queryClient.clear()

    router.replace('/')

    setLoading(false)
  }, [router])

  return {
    loading,
    signOut,
  }
}
