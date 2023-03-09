import { PrismaClient } from '@prisma/client'

import { UserMetaSchema } from '~/schemas/users/meta'

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
