import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { all } = req.query;
    const where = all === 'true' ? {} : { isPublished: true };

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des témoignages' });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, country, avatarUrl, rating, comment, tourName, isPublished } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        fullName,
        country: country || 'France',
        avatarUrl,
        rating: rating ? parseInt(String(rating), 10) : 5,
        comment,
        tourName,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    res.status(201).json({ success: true, message: 'Témoignage ajouté', data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout du témoignage' });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { fullName, country, avatarUrl, rating, comment, tourName, isPublished } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        fullName,
        country,
        avatarUrl,
        rating: rating !== undefined ? parseInt(String(rating), 10) : undefined,
        comment,
        tourName,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : undefined,
      },
    });

    res.json({ success: true, message: 'Témoignage mis à jour', data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    res.json({ success: true, message: 'Témoignage supprimé' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression' });
  }
};
