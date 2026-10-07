import prisma from '../prisma.js';
import { SubscribeNewsletterInput } from '../validators/newsletterValidator.js';

export const subscribeNewsletter = async (data: SubscribeNewsletterInput) => {
  const email = data.email.toLowerCase().trim();

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  if (existing) {
    if (!existing.active) {
      return await prisma.newsletterSubscriber.update({
        where: { email },
        data: { active: true },
      });
    }
    return existing;
  }

  return await prisma.newsletterSubscriber.create({
    data: {
      email,
      active: true,
    },
  });
};

export const getNewsletterSubscribersAdmin = async () => {
  return await prisma.newsletterSubscriber.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};
