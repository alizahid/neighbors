import { BASE_URL } from '@env'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { focusManager, QueryClient } from '@tanstack/react-query'
import {
  createTRPCReact,
  httpBatchLink,
  type HTTPHeaders,
} from '@trpc/react-query'
import { AppState, Platform } from 'react-native'
import transformer from 'superjson'

import { type NeighborsRouter } from '~/trpc'

import { getStorage } from './storage'
import { supabase } from './supabase'

export const trpc = createTRPCReact<NeighborsRouter>()

const url = __DEV__
  ? Platform.select({
      android: 'http://10.0.2.2:3000',
      default: 'http://localhost:3000',
    })
  : BASE_URL

focusManager.setEventListener((handleFocus) => {
  const subscription = AppState.addEventListener('change', (state) =>
    handleFocus(state === 'active')
  )

  return () => subscription.remove()
})

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      async headers() {
        const { data } = await supabase.auth.getSession()

        const headers: HTTPHeaders = {}

        if (data.session?.access_token) {
          headers.authorization = data.session.access_token
        }

        return headers
      },
      url: `${url}/api/trpc`,
    }),
  ],
  transformer,
})

export const queryClient = new QueryClient()

export const asyncStoragePersister = createAsyncStoragePersister({
  deserialize: transformer.parse,
  serialize: transformer.stringify,
  storage: getStorage('trpc'),
})
