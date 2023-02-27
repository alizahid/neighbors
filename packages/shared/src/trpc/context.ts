import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

import { db } from '~/lib/prisma'
import { supabase } from '~/lib/supabase'

const getSession = async (token?: string) => {
  if (!token) {
    return null
  }

  const { data } = await supabase.auth.getUser(token)

  return data.user
}

const getUser = async (id?: string) => {
  if (!id) {
    return null
  }

  return db.user.findUnique({
    include: {
      residencies: {
        include: {
          building: true,
        },
      },
    },
    where: {
      id,
    },
  })
}

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const token = req.cookies.token ?? req.headers.authorization

  const session = await getSession(token)

  const user = await getUser(session?.id)

  return {
    req,
    res,
    session,
    user,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
