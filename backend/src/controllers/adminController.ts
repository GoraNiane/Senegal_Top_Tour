import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalReservations,
      pendingReservations,
      confirmedReservations,
      totalExcursions,
      totalDestinations,
      totalMessages,
      unreadMessages,
      newsletterCount,
      recentReservations,
      recentMessages,
    ] = await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: 'PENDING' } }),
      prisma.reservation.count({ where: { status: 'CONFIRMED' } }),
      prisma.excursion.count(),
      prisma.destination.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.newsletterSubscriber.count({ where: { active: true } }),
      prisma.reservation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      success: true,
      stats: {
        totalReservations,
        pendingReservations,
        confirmedReservations,
        totalExcursions,
        totalDestinations,
        totalMessages,
        unreadMessages,
        newsletterCount,
      },
      recentReservations,
      recentMessages,
    });
  } catch (error: any) {
    console.error('getDashboardStats error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des statistiques du tableau de bord' });
  }
};
