import { Response } from 'express';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Succès',
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string = 'Une erreur est survenue',
  statusCode: number = 400,
  errors?: any
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
