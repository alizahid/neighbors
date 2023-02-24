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

const postAttachments = z.array(
  z.object({
    type: z.enum(['image']),
    url: z.string(),
  })
)

export const db = prisma.$extends({
  result: {
    post: {
      attachments: {
        compute({ attachments }) {
          return postAttachments.parse(attachments)
        },
        needs: {
          attachments: true,
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
