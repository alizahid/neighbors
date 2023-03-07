import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { type FunctionComponent, type ReactNode } from 'react'

import {
  asyncStoragePersister,
  queryClient,
  trpc,
  trpcClient,
} from '~/lib/trpc'

type Props = {
  children: ReactNode
}

export const ApiProvider: FunctionComponent<Props> = ({ children }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            const key = query.queryKey.join(':')

            return key.startsWith('chat') || key.startsWith('channel')
          },
        },
        persister: asyncStoragePersister,
      }}
    >
      {children}
    </PersistQueryClientProvider>
  </trpc.Provider>
)
