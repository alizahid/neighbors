import { useCallback, useState } from 'react'

import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

export const useSignUp = () => {
  const {
    error: mutationError,
    isLoading,
    mutateAsync,
  } = trpc.users.signUp.useMutation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const signUp = useCallback(
    async ({
      email,
      name,
      password,
    }: {
      email: string
      name: string
      password: string
    }) => {
      setError(undefined)
      setLoading(true)

      try {
        await supabase.auth.signUp({
          email,
          password,
        })

        await mutateAsync({
          name,
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [mutateAsync]
  )

  return {
    error: error || mutationError?.message,
    loading: loading || isLoading,
    signUp,
  }
}
