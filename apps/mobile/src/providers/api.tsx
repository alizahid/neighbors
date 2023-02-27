import { QueryClientProvider } from '@tanstack/react-query'
import { type FunctionComponent, type ReactNode } from 'react'

import { queryClient, trpc, trpcClient } from '~/lib/trpc'

type Props = {
  children: ReactNode
}

export const ApiProvider: FunctionComponent<Props> = ({ children }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpc.Provider>
)
