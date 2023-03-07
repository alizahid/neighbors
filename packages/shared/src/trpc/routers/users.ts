import { z } from 'zod'

import { db } from '~/lib/prisma'
import { UserUpdateSchema } from '~/schemas/users/update'

import { isLoggedIn, isNotNull } from '../helpers'
import { t } from '../server'

export const users = t.router({
  get: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      isLoggedIn(ctx)

      return db.user.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  profile: t.procedure.query(({ ctx }) => ctx.user),
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
  update: t.procedure.input(UserUpdateSchema).mutation(({ ctx, input }) => {
    isLoggedIn(ctx)

    return db.user.update({
      data: {
        image: input.image,
        meta: input.meta,
        name: input.name,
      },
      where: {
        id: ctx.user.id,
      },
    })
  }),
})
