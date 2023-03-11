import { z } from 'zod'

export const NotificationTypeSchema = z.enum(['comment'])

export type NotificationTypeView = z.infer<typeof NotificationTypeSchema>
