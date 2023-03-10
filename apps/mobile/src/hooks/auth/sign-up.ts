import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

import { useProfile } from './profile'

export const useSignUp = () => {
  const router = useRouter()

  const { refetch } = useProfile()

  const {
    error: mutationError,
    isLoading,
    mutate,
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
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          throw new Error(error.message)
        }

        await mutate({
          name,
        })

        await refetch()

        router.replace('/onboarding')
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [mutate, refetch, router]
  )

  return {
    error: error || mutationError?.message,
    loading: loading || isLoading,
    signUp,
  }
}
