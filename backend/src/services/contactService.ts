import prisma from '../prisma.js';
import { CreateContactMessageInput } from '../validators/contactValidator.js';

export const createContactMessage = async (data: CreateContactMessageInput) => {
  return await prisma.contactMessage.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || 'Demande générale d’informations',
      message: data.message,
      isRead: false,
    },
  });
};

export const getContactMessagesAdmin = async () => {
  return await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const markMessageAsRead = async (id: string) => {
  const existing = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Message introuvable' };
  }

  return await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
};

export const deleteContactMessage = async (id: string) => {
  const existing = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Message introuvable' };
  }

  await prisma.contactMessage.delete({
    where: { id },
  });

  return { id };
};
