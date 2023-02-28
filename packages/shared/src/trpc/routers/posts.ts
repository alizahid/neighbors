import { z } from 'zod'

import { db } from '~/lib/prisma'
import { PostCreateSchema } from '~/schemas/posts/create'

import { isResident } from '../helpers'
import { type server } from '../index'

export const posts = (t: typeof server) =>
  t.router({
    create: t.procedure
      .input(PostCreateSchema)
      .mutation(async ({ ctx, input }) => {
        isResident(ctx, input.buildingId)

        const post = await db.post.create({
          data: {
            body: input.body,
            buildingId: input.buildingId,
            meta: input.meta,
            type: input.type,
            userId: ctx.user.id,
          },
        })

        return post.id
      }),
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

        const likes = await db.like.findMany({
          where: {
            postId: {
              in: posts.map(({ id }) => id),
            },
            userId: ctx.user.id,
          },
        })

        const next = posts.length > 100 ? posts.pop()?.id : undefined

        return {
          next,
          posts: posts.map((post) => ({
            ...post,
            liked: !!likes.find(({ postId }) => postId === post.id),
          })),
        }
      }),
  })
