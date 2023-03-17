import { PrismaClient } from '@prisma/client'

import { NotificationTypeSchema } from '~/schemas/notifications/type'
import { UserMetaSchema } from '~/schemas/users/meta'

import { type Target } from './notifications'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export const db = prisma.$extends({
  result: {
    notification: {
      target: {
        compute({ target }) {
          return target as Target
        },
        needs: {
          target: true,
        },
      },
      type: {
        compute({ type }) {
          return NotificationTypeSchema.parse(type)
        },
        needs: {
          type: true,
        },
      },
    },
    user: {
      meta: {
        compute({ meta }) {
          return UserMetaSchema.parse(meta)
        },
        needs: {
          meta: true,
        },
      },
    },
  },
})
