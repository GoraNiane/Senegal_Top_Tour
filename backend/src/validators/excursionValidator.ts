import { z } from 'zod';

export const createExcursionSchema = z.object({
  name: z.string().min(2, 'Le nom de l’excursion est obligatoire'),
  slug: z.string().min(2, 'Le slug est obligatoire'),
  subtitle: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().min(10, 'La description doit comporter au moins 10 caractères'),
  fullContent: z.string().optional(),
  duration: z.string().min(1, 'La durée est obligatoire'),
  durationCategory: z.enum(['half_day', 'full_day', 'multi_day']).default('half_day'),
  schedule: z.string().optional(),
  departTime: z.string().optional(),
  returnTime: z.string().optional(),
  departureLocation: z.string().optional().default('Dakar'),
  departureCity: z.string().optional().default('Dakar'),
  price: z.number().optional().nullable(),
  currency: z.string().default('EUR'),
  priceNote: z.string().default('Prix sur demande'),
  inclusions: z.union([z.array(z.string()), z.string()]).optional(),
  exclusions: z.union([z.array(z.string()), z.string()]).optional(),
  practicalInfo: z.union([z.record(z.string()), z.string()]).optional(),
  category: z.string().default('Culture'),
  destinationId: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'UPCOMING', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  featured: z.boolean().optional().default(false),
  isPopular: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
  images: z
    .array(
      z.object({
        url: z.string().min(1),
        caption: z.string().optional(),
        isCover: z.boolean().optional(),
        order: z.number().optional(),
      })
    )
    .optional(),
  itinerary: z
    .array(
      z.object({
        time: z.string().optional(),
        title: z.string().min(1),
        description: z.string().min(1),
        order: z.number().optional(),
      })
    )
    .optional(),
});

export const updateExcursionSchema = createExcursionSchema.partial();

export type CreateExcursionInput = z.infer<typeof createExcursionSchema>;
export type UpdateExcursionInput = z.infer<typeof updateExcursionSchema>;
