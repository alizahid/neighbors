import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db } from '~/lib/prisma'
import { getBadge } from '~/lib/push'

import { isLoggedIn, isNotNull } from '../helpers'
import { t } from '../server'

export const notifications = t.router({
  badge: t.procedure.query(({ ctx }) => {
    isLoggedIn(ctx)

    return getBadge(ctx.user.id)
  }),
  list: t.procedure
    .input(
      z.object({
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      const notifications = await db.notification.findMany({
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        take: 100 + 1,
        where: {
          userId: ctx.user.id,
        },
      })

      const users = await db.user.findMany({
        select: {
          id: true,
          image: true,
          name: true,
        },
        where: {
          id: {
            in: notifications.flatMap(({ actors }) => actors),
          },
        },
      })

      const next =
        notifications.length > 100 ? notifications.pop()?.id : undefined

      return {
        next,
        notifications: notifications.map((notification) => ({
          ...notification,
          actors: users.filter(({ id }) => notification.actors.includes(id)),
        })),
      }
    }),
  markRead: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      if (!input.id) {
        await db.notification.updateMany({
          data: {
            read: true,
          },
          where: {
            userId: ctx.user.id,
          },
        })

        return
      }

      const notification = await db.notification.findUnique({
        where: {
          id: input.id,
        },
      })

      isNotNull(notification)

      if (notification.userId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
        })
      }

      await db.notification.update({
        data: {
          read: true,
        },
        where: {
          id: notification.id,
        },
      })
    }),
  register: t.procedure
    .input(
      z.object({
        id: z.string(),
        token: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      await db.device.create({
        data: {
          id: input.id,
          token: input.token,
          type: input.token,
          userId: ctx.user.id,
        },
      })
    }),
})
