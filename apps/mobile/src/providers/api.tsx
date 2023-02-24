import { BASE_URL } from '@env'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, type HTTPHeaders } from '@trpc/client'
import { type FunctionComponent, type ReactNode, useState } from 'react'
import transformer from 'superjson'

import { supabase } from '~/lib/supabase'
import { trpc } from '~/lib/trpc'

type Props = {
  children: ReactNode
}

export const ApiProvider: FunctionComponent<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
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
          url: `${BASE_URL}/api/trpc`,
        }),
      ],
      transformer,
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
