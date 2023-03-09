import { z } from 'zod'

import { db } from '~/lib/prisma'
import { PostSchema } from '~/schemas/posts'
import { PostCreateSchema } from '~/schemas/posts/create'

import { isLoggedIn, isNotNull, isResident } from '../helpers'
import { t } from '../server'

export const posts = t.router({
  create: t.procedure
    .input(PostCreateSchema)
    .mutation(async ({ ctx, input }) => {
      isResident(ctx, input.buildingId)

      const post = await db.post.create({
        data: {
          body: input.body,
          building: {
            connect: {
              id: input.buildingId,
            },
          },
          likes: {
            create: {
              user: {
                connect: {
                  id: ctx.user.id,
                },
              },
            },
          },
          meta: input.meta,
          type: input.type,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
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
          user: true,
        },
        where: {
          id: input.id,
        },
      })

      isNotNull(post)
      isResident(ctx, post.buildingId)

      const like = await db.like.findFirst({
        where: {
          postId: post.id,
          userId: ctx.user.id,
        },
      })

      return {
        ...PostSchema.parse(post),
        liked: !!like,
      }
    }),
  like: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      const post = await db.post.findUnique({
        where: {
          id: input.id,
        },
      })

      isNotNull(post)
      isResident(ctx, post.buildingId)

      const exists = await db.like.findFirst({
        where: {
          postId: post.id,
          userId: ctx.user.id,
        },
      })

      if (exists) {
        await db.like.delete({
          where: {
            id: exists.id,
          },
        })
      } else {
        await db.like.create({
          data: {
            postId: post.id,
            userId: ctx.user.id,
          },
        })
      }

      return !exists
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
        },
      })

      const next = posts.length > 100 ? posts.pop()?.id : undefined

      const likes = (
        await db.like.findMany({
          select: {
            id: true,
          },
          where: {
            postId: {
              in: posts.map(({ id }) => id),
            },
            userId: ctx.user.id,
          },
        })
      ).map(({ id }) => id)

      return {
        next,
        posts: posts.map((post) => ({
          ...PostSchema.parse(post),
          liked: likes.includes(post.id),
        })),
      }
    }),
})
