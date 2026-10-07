import { z } from 'zod';

export const subscribeNewsletterSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

export type SubscribeNewsletterInput = z.infer<typeof subscribeNewsletterSchema>;
