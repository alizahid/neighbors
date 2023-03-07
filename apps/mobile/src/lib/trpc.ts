import { BASE_URL } from '@env'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import {
  createTRPCReact,
  httpBatchLink,
  type HTTPHeaders,
} from '@trpc/react-query'
import { Platform } from 'react-native'
import transformer from 'superjson'

import { type NeighborsRouter } from '~/trpc'

import { supabase } from './supabase'

export const trpc = createTRPCReact<NeighborsRouter>()

const url = __DEV__
  ? Platform.select({
      android: 'http://10.0.2.2:3000',
      default: 'http://localhost:3000',
    })
  : BASE_URL

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
