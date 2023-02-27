import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

const userMeta = z.object({
  bio: z.string().default(''),
})

const postMeta = z.object({
  attachments: z.array(
    z.object({
      type: z.enum(['image']),
      url: z.string(),
    })
  ),
  currency: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  product: z.string().optional(),
  quantity: z.number().optional(),
})

export const db = prisma.$extends({
  result: {
    post: {
      meta: {
        compute({ meta }) {
          return postMeta.parse(meta)
        },
        needs: {
          meta: true,
        },
      },
    },
    user: {
      meta: {
        compute({ meta }) {
          return userMeta.parse(meta)
        },
        needs: {
          meta: true,
        },
      },
    },
  },
})
