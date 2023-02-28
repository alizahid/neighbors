import { z } from 'zod'

export const PostTypeSchema = z.enum(['post', 'item']).default('post')

export type PostTypeView = z.infer<typeof PostTypeSchema>
