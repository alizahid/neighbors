import { z } from 'zod'

export const NotificationTypeSchema = z.enum(['comment', 'like'])

export type NotificationTypeView = z.infer<typeof NotificationTypeSchema>
