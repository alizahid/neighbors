import { z } from 'zod'

export const PostMetaSchema = z.object({
  attachments: z.array(
    z.object({
      type: z.enum(['image']),
      url: z.string(),
    })
  ),
  currency: z.string().optional(),
  price: z.number().min(1).optional(),
  product: z.string().min(2).optional(),
  quantity: z.number().min(1).optional(),
})

export type PostMetaView = z.infer<typeof PostMetaSchema>
