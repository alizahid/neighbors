import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db } from '~/lib/prisma'
import { ResidencyUpdateSchema } from '~/schemas/residencies/update'

import { isLoggedIn, isNotNull } from '../helpers'
import { t } from '../server'

export const residencies = t.router({
  leave: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      const residency = await db.resident.findUnique({
        where: {
          id: input.id,
        },
      })

      isNotNull(residency)

      if (residency.userId !== ctx.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        })
      }

      return db.resident.delete({
        where: {
          id: residency.id,
        },
      })
    }),
  update: t.procedure
    .input(ResidencyUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      const residency = await db.resident.findUnique({
        where: {
          id: input.id,
        },
      })

      isNotNull(residency)

      if (residency.userId !== ctx.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        })
      }

      return db.resident.update({
        data: {
          apartment: input.apartment,
          floor: input.floor,
        },
        where: {
          id: residency.id,
        },
      })
    }),
})
