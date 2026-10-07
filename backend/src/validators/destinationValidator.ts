import { z } from 'zod';

export const createDestinationSchema = z.object({
  name: z.string().min(2, 'Le nom de la destination doit comporter au moins 2 caractères'),
  slug: z.string().min(2, 'Le slug est obligatoire'),
  subtitle: z.string().optional(),
  description: z.string().min(10, 'La description doit comporter au moins 10 caractères'),
  region: z.string().optional().default('Sénégal'),
  highlights: z.union([z.array(z.string()), z.string()]).optional(),
  imageUrl: z.string().min(1, 'L’image est obligatoire'),
  category: z.string().optional().default('Culture'),
  status: z.enum(['DRAFT', 'UPCOMING', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
});

export const updateDestinationSchema = createDestinationSchema.partial();

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;
