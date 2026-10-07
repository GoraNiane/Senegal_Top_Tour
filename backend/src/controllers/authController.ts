import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.js';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.loginUser(req.body);
    sendSuccess(res, result, 'Authentification réussie');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'Utilisateur non authentifié', 401);
      return;
    }
    const user = await authService.getCurrentUser(req.user.id);
    sendSuccess(res, user, 'Profil récupéré');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};
