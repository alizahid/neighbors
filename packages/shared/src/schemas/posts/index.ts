import { z } from 'zod'

import { UserSchema } from '../users'
import { PostMetaSchema } from './meta'

export const PostSchema = z
  .object({
    _count: z.object({
      comments: z.number(),
      likes: z.number(),
    }),
    body: z.string(),
    createdAt: z.date(),
    id: z.string(),
    updatedAt: z.date(),
    user: UserSchema,
  })
  .and(PostMetaSchema)

export type PostView = z.infer<typeof PostSchema>
