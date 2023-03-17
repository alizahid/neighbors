import { z } from 'zod'

import { AttachmentsSchema } from '../attachments'

export const PostPostMetaSchema = z.object({
  attachments: AttachmentsSchema,
})

export const PostItemMetaSchema = z.object({
  attachments: AttachmentsSchema,
  currency: z.string(),
  price: z.number().min(1),
  product: z.string().min(2),
  quantity: z.number().min(1),
})

export const PostEventMetaSchema = z.object({
  attachments: AttachmentsSchema,
  date: z.string().datetime({
    offset: true,
  }),
  event: z.string(),
  rsvp: z
    .array(
      z.object({
        status: z.enum(['yes', 'no', 'maybe']),
        userId: z.string(),
      })
    )
    .default([]),
})

export const PostMetaSchema = z.discriminatedUnion('type', [
  z.object({
    meta: PostPostMetaSchema,
    type: z.literal('post'),
  }),
  z.object({
    meta: PostItemMetaSchema,
    type: z.literal('item'),
  }),
  z.object({
    meta: PostEventMetaSchema,
    type: z.literal('event'),
  }),
])

export type PostMetaView = z.infer<typeof PostMetaSchema>
