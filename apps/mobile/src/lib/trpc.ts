import { createTRPCReact } from '@trpc/react-query'

import { type NeighborsRouter } from '../../../web/src/trpc'

export const trpc = createTRPCReact<NeighborsRouter>()
