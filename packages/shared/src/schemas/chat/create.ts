import { z } from 'zod'

import { AttachmentsSchema } from '../attachments'

export const ChatSendSchema = z.object({
  channelId: z.string(),
  message: z.string().min(2),
  meta: z.object({
    attachments: AttachmentsSchema,
  }),
})

export type ChatSendView = z.infer<typeof ChatSendSchema>
