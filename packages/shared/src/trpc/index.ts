import { initTRPC } from '@trpc/server'
import { createNextApiHandler } from '@trpc/server/adapters/next'
import transformer from 'superjson'

import { type Context, createContext } from './context'
import { market } from './routers/market'
import { posts } from './routers/posts'
import { users } from './routers/users'

export const server = initTRPC.context<Context>().create({
  transformer,
})

export const router = server.router({
  market: market(server),
  posts: posts(server),
  users: users(server),
})

export type NeighborsRouter = typeof router

export const createNextHandler = () =>
  createNextApiHandler({
    createContext,
    router,
  })
