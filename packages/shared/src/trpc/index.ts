import { createNextApiHandler } from '@trpc/server/adapters/next'

import { createContext } from './context'
import { chat } from './routers/chat'
import { comments } from './routers/comments'
import { posts } from './routers/posts'
import { users } from './routers/users'
import { t } from './server'

export const router = t.router({
  chat,
  comments,
  posts,
  users,
})

export type NeighborsRouter = typeof router

export const createNextHandler = () =>
  createNextApiHandler({
    createContext,
    router,
  })
