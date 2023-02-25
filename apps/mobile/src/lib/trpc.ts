import { createTRPCReact } from '@trpc/react-query'

import { type NeighborsRouter } from '~/trpc'

export const trpc = createTRPCReact<NeighborsRouter>()
