import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getGalleryImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const where = category && category !== 'Toutes' ? { category: String(category) } : {};

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    res.json({ success: true, count: images.length, data: images });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des images' });
  }
};

export const createGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, imageUrl, caption, location, order } = req.body;

    const image = await prisma.galleryImage.create({
      data: {
        title,
        category: category || 'Dakar',
        imageUrl,
        caption,
        location,
        order: order ? parseInt(String(order), 10) : 0,
      },
    });

    res.status(201).json({ success: true, message: 'Image ajoutée à la galerie', data: image });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout' });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.galleryImage.delete({ where: { id } });
    res.json({ success: true, message: 'Image supprimée' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression' });
  }
};
