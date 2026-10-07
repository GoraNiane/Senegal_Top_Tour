import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error internally for operational monitoring
  console.error(`[API Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  const status = typeof err.status === 'number' ? err.status : 500;
  const message =
    status === 500
      ? 'Une erreur interne est survenue sur le serveur. Veuillez réessayer plus tard.'
      : err.message || 'Une erreur est survenue lors du traitement de votre requête.';

  // Always return sanitized JSON without secrets or stack traces
  res.status(status).json({
    success: false,
    message,
  });
};
