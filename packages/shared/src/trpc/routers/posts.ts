import { z } from 'zod'

import { db } from '~/lib/prisma'
import { PostCreateSchema } from '~/schemas/posts/create'
import { PostTypeSchema } from '~/schemas/posts/type'

import { isLoggedIn, isNotNull, isResident } from '../helpers'
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
    get: t.procedure
      .input(
        z.object({
          id: z.string(),
        })
      )
      .query(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const post = await db.post.findUnique({
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
            likes: {
              select: {
                id: true,
              },
              take: 1,
              where: {
                userId: ctx.user.id,
              },
            },
            user: true,
          },
          where: {
            id: input.id,
          },
        })

        isNotNull(post)
        isResident(ctx, post.buildingId)

        return post
      }),
    list: t.procedure
      .input(
        z.object({
          buildingId: z.string(),
          cursor: z.string().optional(),
          type: PostTypeSchema,
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
            likes: {
              select: {
                id: true,
              },
              take: 1,
              where: {
                userId: ctx.user.id,
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
              not: input.type === 'item' ? 'post' : 'item',
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
