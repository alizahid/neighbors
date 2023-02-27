import { z } from 'zod'

import { db } from '~/lib/prisma'

import { isNotNull } from '../helpers'
import { type server } from '../index'

export const users = (t: typeof server) =>
  t.router({
    profile: t.procedure.query(({ ctx }) => {
      return ctx.user
    }),
    signUp: t.procedure
      .input(
        z.object({
          name: z.string(),
        })
      )
      .mutation(({ ctx, input }) => {
        isNotNull(ctx.session?.email)

        return db.user.create({
          data: {
            email: ctx.session.email,
            id: ctx.session.id,
            name: input.name,
          },
        })
      }),
  })
