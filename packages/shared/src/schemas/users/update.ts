import { z } from 'zod'

import { UserMetaSchema } from './meta'

export const UserUpdateSchema = z.object({
  image: z.string(),
  meta: UserMetaSchema,
  name: z.string().min(2),
})

export type UserUpdateView = z.infer<typeof UserUpdateSchema>
