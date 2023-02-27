import { z } from 'zod'

import { db } from '~/lib/prisma'

import { isResident } from '../helpers'
import { type server } from '../index'

export const market = (t: typeof server) =>
  t.router({
    items: t.procedure
      .input(
        z.object({
          buildingId: z.string(),
          cursor: z.string().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        isResident(ctx, input.buildingId)

        const items = await db.post.findMany({
          cursor: input.cursor
            ? {
                id: input.cursor,
              }
            : undefined,
          include: {
            _count: {
              select: {
                comments: true,
              },
            },
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 100 + 1,
          where: {
            buildingId: input.buildingId,
            type: {
              not: 'post',
            },
          },
        })

        const next = items.length > 100 ? items.pop()?.id : undefined

        return {
          items,
          next,
        }
      }),
  })
