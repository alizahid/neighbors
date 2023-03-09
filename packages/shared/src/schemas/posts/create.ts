import { z } from 'zod'

import { PostMetaSchema } from './meta'

export const PostCreateSchema = z
  .object({
    body: z.string().min(10),
    buildingId: z.string(),
  })
  .and(PostMetaSchema)

export type PostCreateView = z.infer<typeof PostCreateSchema>
