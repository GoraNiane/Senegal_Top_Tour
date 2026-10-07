import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/index.js';

// Configure Cloudinary from config / environment
if (config.cloudinary.url) {
  // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
  cloudinary.config({
    cloudinary_url: config.cloudinary.url,
  });
} else if (config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
  });
}

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    config.cloudinary.url ||
    (config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret)
  );
};

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export const uploadToCloudinary = async (
  fileDataOrUrl: string,
  subFolder: string = 'senegal_top_tour'
): Promise<CloudinaryUploadResult> => {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary n\'est pas configuré. Veuillez définir CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET (ou CLOUDINARY_URL) dans vos variables d\'environnement.'
    );
  }

  const folder = config.cloudinary.folder
    ? `${config.cloudinary.folder}/${subFolder}`.replace(/\/+/g, '/')
    : subFolder;

  const result = await cloudinary.uploader.upload(fileDataOrUrl, {
    folder,
    resource_type: 'auto',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
};

export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  if (!isCloudinaryConfigured()) return false;
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === 'ok';
  } catch (error) {
    console.error('Erreur suppression Cloudinary:', error);
    return false;
  }
};
