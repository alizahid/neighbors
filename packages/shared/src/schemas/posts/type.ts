import { z } from 'zod'

export const PostTypeSchema = z
  .enum(['ad', 'post', 'item', 'event'])
  .default('post')

export type PostTypeView = z.infer<typeof PostTypeSchema>
