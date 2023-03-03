import { z } from 'zod'

import { db } from '~/lib/prisma'
import { ChatSendSchema } from '~/schemas/chat/create'

import { isLoggedIn, isNotNull } from '../helpers'
import { type server } from '../index'

export const chat = (t: typeof server) =>
  t.router({
    channel: t.procedure
      .input(
        z.object({
          id: z.string(),
        })
      )
      .query(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const channel = await db.channel.findUnique({
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
          where: {
            id: input.id,
          },
        })

        isNotNull(channel)

        const member = channel.members.find(
          ({ userId }) => userId === ctx.user.id
        )

        isNotNull(member)

        return channel
      }),
    channels: t.procedure.query(({ ctx }) => {
      isLoggedIn(ctx)

      return db.channel.findMany({
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        where: {
          members: {
            some: {
              userId: ctx.user.id,
            },
          },
        },
      })
    }),
    markChecked: t.procedure
      .input(
        z.object({
          channelId: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const channel = await db.channel.findUnique({
          include: {
            members: true,
          },
          where: {
            id: input.channelId,
          },
        })

        isNotNull(channel)

        const member = channel.members.find(
          ({ userId }) => userId === ctx.user.id
        )

        isNotNull(member)

        await db.member.update({
          data: {
            checkedAt: new Date(),
          },
          where: {
            id: member.id,
          },
        })

        return {
          memberId: member.id,
          userId: ctx.user.id,
        }
      }),
    messages: t.procedure
      .input(
        z.object({
          channelId: z.string(),
          cursor: z.string().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const channel = await db.channel.findUnique({
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
          where: {
            id: input.channelId,
          },
        })

        isNotNull(channel)

        const member = channel.members.find(
          ({ userId }) => userId === ctx.user.id
        )

        isNotNull(member)

        const messages = await db.message.findMany({
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
            channelId: channel.id,
          },
        })

        const next = messages.length > 100 ? messages.pop()?.id : undefined

        return {
          messages,
          next,
        }
      }),
    send: t.procedure.input(ChatSendSchema).mutation(async ({ ctx, input }) => {
      isLoggedIn(ctx)

      const channel = await db.channel.findFirst({
        include: {
          members: true,
        },
        where: {
          id: input.channelId,
          members: {
            some: {
              userId: ctx.user.id,
            },
          },
        },
      })

      isNotNull(channel)

      const message = await db.message.create({
        data: {
          body: input.message,
          channelId: channel.id,
          userId: ctx.user.id,
        },
      })

      await db.channel.update({
        data: {
          message: input.message,
        },
        where: {
          id: channel.id,
        },
      })

      const member = channel.members.find(
        ({ userId }) => userId === ctx.user.id
      )

      isNotNull(member)

      await db.member.update({
        data: {
          checkedAt: new Date(),
        },
        where: {
          id: member.id,
        },
      })

      return message
    }),
    start: t.procedure
      .input(
        z.object({
          message: z.string().optional(),
          userId: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        isLoggedIn(ctx)

        const exists = await db.channel.findFirst({
          where: {
            members: {
              every: {
                userId: {
                  in: [ctx.user.id, input.userId],
                },
              },
            },
          },
        })

        if (exists) {
          return exists.id
        }

        const channel = await db.channel.create({
          data: {
            members: {
              createMany: {
                data: [
                  {
                    userId: ctx.user.id,
                  },
                  {
                    userId: input.userId,
                  },
                ],
              },
            },
          },
        })

        if (input.message) {
          await db.message.create({
            data: {
              body: input.message,
              channelId: channel.id,
              userId: ctx.user.id,
            },
          })

          await db.channel.update({
            data: {
              message: input.message,
            },
            where: {
              id: channel.id,
            },
          })
        }

        return channel.id
      }),
  })
