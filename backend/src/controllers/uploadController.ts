import { Request, Response } from 'express';
import { uploadToCloudinary, isCloudinaryConfigured } from '../services/cloudinaryService.js';
import { config } from '../config/index.js';

export const getUploadStatus = async (req: Request, res: Response): Promise<void> => {
  const configured = isCloudinaryConfigured();
  res.json({
    success: true,
    configured,
    cloudName: config.cloudinary.cloudName || (config.cloudinary.url ? 'Configured via CLOUDINARY_URL' : null),
    folder: config.cloudinary.folder,
  });
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { image, folder } = req.body;

    if (!image) {
      res.status(400).json({
        success: false,
        message: 'Aucune image fournie. Veuillez envoyer une image en base64 ou une URL valide.',
      });
      return;
    }

    if (!isCloudinaryConfigured()) {
      res.status(400).json({
        success: false,
        message: 'Cloudinary n\'est pas encore configuré sur le serveur. Veuillez renseigner CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET.',
      });
      return;
    }

    const subFolder = folder || 'media';
    const uploadResult = await uploadToCloudinary(image, subFolder);

    res.json({
      success: true,
      message: 'Image téléversée avec succès sur Cloudinary',
      data: uploadResult,
    });
  } catch (error: any) {
    console.error('Erreur téléversement Cloudinary:', error);
    res.status(500).json({
      success: false,
      message: error?.message || 'Erreur lors du téléversement vers Cloudinary',
    });
  }
};
