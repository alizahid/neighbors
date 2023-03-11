import { z } from 'zod'

import { db } from '~/lib/prisma'
import { CommentCreateSchema } from '~/schemas/comments/create'

import { isLoggedIn, isNotNull, isResident } from '../helpers'
import { t } from '../server'

export const comments = t.router({
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

      const comment = await db.comment.create({
        data: {
          body: input.body,
          postId: input.postId,
          userId: ctx.user.id,
        },
        include: {
          user: true,
        },
      })

      await db.notification.create({
        data: {
          actor: ctx.user.id,
          buildingId: post.buildingId,
          target: `${post.type}:${post.id}`,
          type: 'comment',
          userId: post.userId,
        },
      })

      return comment
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
