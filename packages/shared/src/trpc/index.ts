import * as Sentry from '@sentry/nextjs'
import { createNextApiHandler } from '@trpc/server/adapters/next'

import { createContext } from './context'
import { buildings } from './routers/buildings'
import { chat } from './routers/chat'
import { comments } from './routers/comments'
import { notifications } from './routers/notifications'
import { posts } from './routers/posts'
import { residencies } from './routers/residencies'
import { users } from './routers/users'
import { t } from './server'

export const router = t.router({
  buildings,
  chat,
  comments,
  notifications,
  posts,
  residencies,
  users,
})

export type NeighborsRouter = typeof router

export const createNextHandler = () =>
  createNextApiHandler({
    createContext,
    onError({ error }) {
      Sentry.captureException(error)
    },
    router,
  })
