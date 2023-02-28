import { z } from 'zod'

import { PostMetaSchema } from './meta'
import { PostTypeSchema } from './type'

export const PostCreateSchema = z.object({
  body: z.string().min(10),
  buildingId: z.string(),
  meta: PostMetaSchema,
  type: PostTypeSchema,
})

export type PostCreateView = z.infer<typeof PostCreateSchema>
