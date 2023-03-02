import { z } from 'zod'

import { db } from '~/lib/prisma'
import { CommentCreateSchema } from '~/schemas/comments/create'

import { isLoggedIn, isNotNull, isResident } from '../helpers'
import { type server } from '../index'

export const comments = (t: typeof server) =>
  t.router({
    create: t.procedure
      .input(CommentCreateSchema)
      .mutation(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const post = await db.post.findUnique({
          where: {
            id: input.postId,
          },
        })

        isNotNull(post)
        isResident(ctx, post.buildingId)

        return db.comment.create({
          data: {
            body: input.body,
            postId: input.postId,
            userId: ctx.user.id,
          },
          include: {
            user: true,
          },
        })
      }),
    list: t.procedure
      .input(
        z.object({
          cursor: z.string().optional(),
          postId: z.string(),
        })
      )
      .query(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const post = await db.post.findUnique({
          where: {
            id: input.postId,
          },
        })

        isNotNull(post)
        isResident(ctx, post.buildingId)

        const comments = await db.comment.findMany({
          cursor: input.cursor
            ? {
                id: input.cursor,
              }
            : undefined,
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
          take: 100 + 1,
          where: {
            postId: input.postId,
          },
        })

        const next = comments.length > 100 ? comments.pop()?.id : undefined

        return {
          comments,
          next,
        }
      }),
  })
