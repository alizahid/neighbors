import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import * as Sentry from 'sentry-expo'

import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

import { useProfile } from './profile'

export const useSignUp = () => {
  const router = useRouter()

  const { refetch } = useProfile()

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
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          throw new Error(error.message)
        }

        await mutateAsync({
          name,
        })

        await refetch()

        router.replace('/home')
      } catch (error) {
        setError(error.message)

        Sentry.Native.captureException(error)
      } finally {
        setLoading(false)
      }
    },
    [mutateAsync, refetch, router]
  )

  return {
    error: error || mutationError?.message,
    loading: loading || isLoading,
    signUp,
  }
}
