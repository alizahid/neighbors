import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db } from '~/lib/prisma'

import { isLoggedIn, isNotNull } from '../helpers'
import { t } from '../server'

export const notifications = t.router({
  badge: t.procedure.query(async ({ ctx }) => {
    isLoggedIn(ctx)

    const channels = await db.channel.findMany({
      include: {
        members: {
          where: {
            userId: ctx.user.id,
          },
        },
      },
      where: {
        members: {
          some: {
            userId: ctx.user.id,
          },
        },
      },
    })

    const chat = channels.filter(
      ({ members, updatedAt }) =>
        !members[0].checkedAt || updatedAt > members[0].checkedAt
    ).length

    const notifications = await db.notification.count({
      where: {
        readAt: null,
        userId: ctx.user.id,
      },
    })

    return {
      chat,
      notifications,
    }
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
        where: {
          id: {
            in: notifications.map(({ actor }) => actor),
          },
        },
      })

      const next =
        notifications.length > 100 ? notifications.pop()?.id : undefined

      return {
        next,
        notifications: notifications.map((notification) => ({
          ...notification,
          actor: users.find(({ id }) => id === notification.actor),
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
            readAt: new Date(),
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
          readAt: new Date(),
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
