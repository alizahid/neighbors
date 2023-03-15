import { parseJSON } from 'date-fns'
import { z } from 'zod'

export const ChatChannelSchema = z.object({
  id: z.string().cuid(),
  members: z.array(
    z.object({
      checkedAt: z
        .string()
        .nullable()
        .transform((value) => (value ? parseJSON(value) : null)),
      id: z.string().uuid(),
      image: z.string().nullable(),
      name: z.string(),
    })
  ),
  message: z.string().nullable(),
  updatedAt: z.string().transform((value) => parseJSON(value)),
})

export type ChatChannelView = z.infer<typeof ChatChannelSchema>
