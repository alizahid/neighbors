import { z } from 'zod'

export const UserMetaSchema = z.object({
  bio: z.string().default(''),
})

export type UserMetaView = z.infer<typeof UserMetaSchema>
