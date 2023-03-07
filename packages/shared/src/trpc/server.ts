import { initTRPC } from '@trpc/server'
import transformer from 'superjson'

import { type Context } from './context'

export const t = initTRPC.context<Context>().create({
  transformer,
})
