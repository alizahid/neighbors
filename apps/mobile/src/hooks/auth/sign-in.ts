import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import * as Sentry from 'sentry-expo'

import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

export const useSignIn = () => {
  const router = useRouter()

  const utils = trpc.useContext()

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

        await utils.users.profile.fetch()

        router.replace('/')
      } catch (error) {
        setError(error.message)

        Sentry.Native.captureException(error)
      } finally {
        setLoading(false)
      }
    },
    [router, utils.users.profile]
  )

  return {
    error,
    loading,
    signIn,
  }
}
