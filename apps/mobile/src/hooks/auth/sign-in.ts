import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { supabase } from '~/lib/supabase'

import { useProfile } from './profile'

export const useSignIn = () => {
  const router = useRouter()

  const { refetch } = useProfile()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError(undefined)
      setLoading(true)

      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          throw new Error(error.message)
        }

        refetch()

        router.back()
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [refetch, router]
  )

  return {
    error,
    loading,
    signIn,
  }
}
