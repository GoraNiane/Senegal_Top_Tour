import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });

    const parsed = experiences.map((exp: any) => ({
      ...exp,
      highlights: exp.highlights ? JSON.parse(exp.highlights) : [],
    }));

    res.json({ success: true, count: parsed.length, data: parsed });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des expériences' });
  }
};

export const getExperienceBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const experience = await prisma.experience.findUnique({
      where: { slug },
    });

    if (!experience) {
      res.status(404).json({ success: false, message: 'Expérience non trouvée' });
      return;
    }

    res.json({
      success: true,
      data: {
        ...experience,
        highlights: experience.highlights ? JSON.parse(experience.highlights) : [],
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
