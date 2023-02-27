import { z } from 'zod'

import { db } from '~/lib/prisma'

import { isResident } from '../helpers'
import { type server } from '../index'

export const posts = (t: typeof server) =>
  t.router({
    list: t.procedure
      .input(
        z.object({
          buildingId: z.string(),
          cursor: z.string().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        isResident(ctx, input.buildingId)

        const posts = await db.post.findMany({
          cursor: input.cursor
            ? {
                id: input.cursor,
              }
            : undefined,
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
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
              not: 'item',
            },
          },
        })

        const next = posts.length > 100 ? posts.pop()?.id : undefined

        return {
          next,
          posts,
        }
      }),
  })
