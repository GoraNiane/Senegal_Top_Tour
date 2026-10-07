import { z } from 'zod';

export const createContactMessageSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est obligatoire'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10, 'Le message doit comporter au moins 10 caractères'),
});

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
