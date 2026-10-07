import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import apiRouter from './routes/api.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: '*', // Allow development origins and frontends
  credentials: true,
}));

// Rate limiting for public endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de requêtes, veuillez réessayer plus tard.' },
});
app.use('/api/', limiter);

// Stricter rate limit for booking/contact submissions
const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Trop de soumissions, veuillez réessayer plus tard.' },
});
app.use('/api/reservations', submitLimiter);
app.use('/api/contact', submitLimiter);
app.use('/api/newsletter', submitLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Senegal Top Tour API',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api', apiRouter);

// Error handler
app.use(errorHandler);

const PORT = config.port;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`🌍 Senegal Top Tour API running on port ${PORT}`);
    console.log(`✨ Environment: ${config.nodeEnv}`);
    console.log(`🚀 API Base URL: http://localhost:${PORT}/api`);
    console.log(`=============================================`);
  });
}

export default app;

