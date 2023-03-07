import { z } from 'zod'

export const ResidencyUpdateSchema = z.object({
  apartment: z.string().nullable(),
  floor: z.string().nullable(),
  id: z.string(),
})

export type ResidencyUpdateView = z.infer<typeof ResidencyUpdateSchema>
