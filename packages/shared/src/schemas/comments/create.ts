import { z } from 'zod'

export const CommentCreateSchema = z.object({
  body: z.string().min(2),
  postId: z.string(),
})

export type CommentCreateView = z.infer<typeof CommentCreateSchema>
