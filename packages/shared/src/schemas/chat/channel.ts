import { parseJSON } from 'date-fns'
import { z } from 'zod'

import { UserSchema } from '../users'

export const ChatChannelSchema = z.object({
  id: z.string().cuid(),
  members: z.array(
    UserSchema.extend({
      checkedAt: z
        .string()
        .nullable()
        .transform((value) => (value ? parseJSON(value) : null)),
    })
  ),
  message: z.string().nullable(),
  updatedAt: z.string().transform((value) => parseJSON(value)),
})

export type ChatChannelView = z.infer<typeof ChatChannelSchema>
