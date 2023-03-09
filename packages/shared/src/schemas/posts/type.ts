import { z } from 'zod'

export const PostTypeSchema = z.enum(['post', 'item', 'event']).default('post')

export type PostTypeView = z.infer<typeof PostTypeSchema>
