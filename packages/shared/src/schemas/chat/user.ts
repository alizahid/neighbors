import { z } from 'zod'

export const ChatUserSchema = z.object({
  id: z.string().uuid(),
  image: z.string().nullable(),
  name: z.string(),
})

export type ChatUserView = z.infer<typeof ChatUserSchema>
