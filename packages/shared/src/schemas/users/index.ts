import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  image: z.string().nullable(),
  name: z.string(),
})

export type UserView = z.infer<typeof UserSchema>
