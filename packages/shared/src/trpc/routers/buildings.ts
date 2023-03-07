import { z } from 'zod'

import { db } from '~/lib/prisma'

import { isLoggedIn, isNotNull } from '../helpers'
import { t } from '../server'

export const buildings = t.router({
  get: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      isLoggedIn(ctx)

      return db.building.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  join: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      const building = await db.building.findUnique({
        where: {
          id: input.id,
        },
      })

      isNotNull(building)

      const residency = await db.resident.findFirst({
        where: {
          buildingId: building.id,
          userId: ctx.user.id,
        },
      })

      if (residency) {
        return residency
      }

      return db.resident.create({
        data: {
          buildingId: building.id,
          userId: ctx.user.id,
        },
      })
    }),
})
