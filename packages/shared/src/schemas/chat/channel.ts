import { parseISO } from 'date-fns'
import { z } from 'zod'

export const ChatChannelSchema = z.object({
  id: z.string().cuid(),
  members: z.array(
    z.object({
      checkedAt: z
        .string()
        .nullable()
        .transform((value) => (value ? parseISO(value) : null)),
      image: z.string().nullable(),
      name: z.string(),
      userId: z.string().uuid(),
    })
  ),
  message: z.string().nullable(),
  updatedAt: z.string().transform((value) => parseISO(value)),
})

export type ChatChannelView = z.infer<typeof ChatChannelSchema>
