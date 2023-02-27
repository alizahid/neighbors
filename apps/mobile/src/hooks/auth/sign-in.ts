import { useCallback, useState } from 'react'

import { supabase } from '~/lib/supabase'

export const useSignIn = () => {
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
          setError(error.message)

          return
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    error,
    loading,
    signIn,
  }
}
