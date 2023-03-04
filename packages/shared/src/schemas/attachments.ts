import { z } from 'zod'

export const AttachmentsSchema = z.array(
  z.object({
    type: z.enum(['image']),
    url: z.string(),
  })
)
