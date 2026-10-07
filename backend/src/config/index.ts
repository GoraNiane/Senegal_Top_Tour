import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'senegal_top_tour_super_secret_jwt_key_2026_luxury',
  adminDefaultEmail: process.env.ADMIN_DEFAULT_EMAIL || 'admin@senegaltoptour.com',
  adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'SenegalTopTour2026!',
  whatsAppPhone: process.env.WHATSAPP_PHONE || '+221778848029',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    url: process.env.CLOUDINARY_URL || '',
    folder: process.env.CLOUDINARY_FOLDER || 'senegal_top_tour',
  },
};
