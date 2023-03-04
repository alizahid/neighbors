import { z } from 'zod'

import { AttachmentsSchema } from '../attachments'

export const PostMetaSchema = z.object({
  attachments: AttachmentsSchema,
  currency: z.string().optional(),
  price: z.number().min(1).optional(),
  product: z.string().min(2).optional(),
  quantity: z.number().min(1).optional(),
})

export type PostMetaView = z.infer<typeof PostMetaSchema>
