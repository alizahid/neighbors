import { parseJSON } from 'date-fns'
import { z } from 'zod'

import { AttachmentsSchema } from '../attachments'
import { UserSchema } from '../users'

export const ChatMessageSchema = z.object({
  body: z.string(),
  createdAt: z.string().transform((value) => parseJSON(value)),
  grouping: z.enum(['single', 'top', 'middle', 'bottom']).optional(),
  id: z.string().cuid(),
  meta: z.object({
    attachments: AttachmentsSchema.optional(),
  }),
  user: UserSchema,
})

export type ChatMessageView = z.infer<typeof ChatMessageSchema>
