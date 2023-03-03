import { parseISO } from 'date-fns'
import { z } from 'zod'

import { ChatUserSchema } from './user'

export const ChatMessageSchema = z.object({
  body: z.string(),
  createdAt: z.string().transform((value) => parseISO(value)),
  grouping: z.enum(['single', 'top', 'middle', 'bottom']).optional(),
  id: z.string().cuid(),
  meta: z.object({}),
  user: ChatUserSchema,
})

export type ChatMessageView = z.infer<typeof ChatMessageSchema>