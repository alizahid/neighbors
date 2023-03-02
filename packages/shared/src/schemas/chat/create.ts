import { z } from 'zod'

export const ChatSendSchema = z.object({
  channelId: z.string(),
  message: z.string().min(2),
})

export type ChatSendView = z.infer<typeof ChatSendSchema>
