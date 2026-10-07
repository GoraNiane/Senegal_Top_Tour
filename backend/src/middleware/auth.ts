import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt.js';
import { sendError } from '../utils/response.js';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    sendError(res, 'Accès non autorisé : Token d’authentification manquant', 401);
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    sendError(res, 'Session expirée ou token invalide', 403);
  }
};

// Alias for backward compatibility
export const authenticateToken = requireAuth;

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Utilisateur non authentifié', 401);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(res, 'Permissions insuffisantes pour effectuer cette action', 403);
      return;
    }

    next();
  };
};
