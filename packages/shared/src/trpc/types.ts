import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { type NeighborsRouter } from './index'

export type RouterInput = inferRouterInputs<NeighborsRouter>
export type RouterOutput = inferRouterOutputs<NeighborsRouter>
