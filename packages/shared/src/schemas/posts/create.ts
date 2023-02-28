import { z } from 'zod'

import { PostMetaSchema } from './meta'

const meta = PostMetaSchema.pick({
  attachments: true,
})

export const PostCreateSchema = z.discriminatedUnion('type', [
  z.object({
    body: z.string().min(10),
    buildingId: z.string(),
    meta,
    type: z.literal('post'),
  }),
  z.object({
    body: z.string().min(10),
    buildingId: z.string(),
    meta: meta.extend({
      currency: z.string().default('AED'),
      price: z.number().min(1),
      product: z.string().min(2),
      quantity: z.number().min(1),
    }),
    type: z.literal('item'),
  }),
])

export type PostCreateView = z.infer<typeof PostCreateSchema>
