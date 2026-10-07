import prisma from '../prisma.js';
import { CreateReservationInput, UpdateReservationStatusInput } from '../validators/reservationValidator.js';

export const createReservation = async (data: CreateReservationInput) => {
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const refNumber = `STT-${currentYear}-${randomSuffix}`;

  const reservation = await prisma.reservation.create({
    data: {
      refNumber,
      fullName: data.fullName,
      email: data.email,
      phoneWhatsApp: data.phoneWhatsApp,
      numberOfTravelers: data.numberOfTravelers,
      preferredDate: data.preferredDate,
      destination: data.destination || data.excursion || 'Sénégal',
      experienceType: data.experienceType || data.excursion || data.destination || 'Excursion',
      duration: data.duration || '1/2 journée',
      budget: data.budget || 'Standard',
      message: data.message || '',
      status: 'PENDING',
    },
  });

  return {
    ...reservation,
    travelerCount: reservation.numberOfTravelers,
    requestedDate: reservation.preferredDate,
    phone: reservation.phoneWhatsApp,
  };
};

export const getAllReservationsAdmin = async () => {
  const reservations = await prisma.reservation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reservations.map((r) => ({
    ...r,
    travelerCount: r.numberOfTravelers,
    requestedDate: r.preferredDate,
    phone: r.phoneWhatsApp,
  }));
};

export const updateReservationStatus = async (id: string, data: UpdateReservationStatusInput) => {
  const existing = await prisma.reservation.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Réservation introuvable' };
  }

  const updated = await prisma.reservation.update({
    where: { id },
    data: {
      status: data.status,
      ...(data.notes !== undefined && { notes: data.notes }),
    },
  });

  return {
    ...updated,
    travelerCount: updated.numberOfTravelers,
    requestedDate: updated.preferredDate,
    phone: updated.phoneWhatsApp,
  };
};

export const deleteReservation = async (id: string) => {
  const existing = await prisma.reservation.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Réservation introuvable' };
  }

  await prisma.reservation.delete({
    where: { id },
  });

  return { id };
};
