import { z } from 'zod';

export const createReservationSchema = z
  .object({
    fullName: z.string().min(2, 'Le nom complet est obligatoire'),
    email: z.string().email('Adresse email invalide'),
    phone: z.string().optional(),
    phoneWhatsApp: z.string().optional(),
    travelerCount: z.number().int().min(1).optional(),
    numberOfTravelers: z.number().int().min(1).optional(),
    requestedDate: z.string().optional(),
    preferredDate: z.string().optional(),
    destination: z.string().optional().nullable(),
    excursion: z.string().optional().nullable(),
    experienceType: z.string().optional().nullable(),
    duration: z.string().optional().nullable(),
    budget: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
  })
  .refine((data) => !!(data.phone || data.phoneWhatsApp), {
    message: 'Le numéro de téléphone ou WhatsApp est obligatoire',
    path: ['phone'],
  })
  .refine((data) => !!(data.requestedDate || data.preferredDate), {
    message: 'La date souhaitée est obligatoire',
    path: ['requestedDate'],
  })
  .transform((data) => ({
    ...data,
    phoneWhatsApp: data.phoneWhatsApp || data.phone || '',
    phone: data.phone || data.phoneWhatsApp || '',
    numberOfTravelers: data.numberOfTravelers || data.travelerCount || 1,
    travelerCount: data.travelerCount || data.numberOfTravelers || 1,
    preferredDate: data.preferredDate || data.requestedDate || '',
    requestedDate: data.requestedDate || data.preferredDate || '',
  }));

export const updateReservationStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONTACTED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
  notes: z.string().optional().nullable(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateReservationStatusInput = z.infer<typeof updateReservationStatusSchema>;

