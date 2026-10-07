import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

export const signToken = (payload: JwtPayload, expiresIn: string | number = '7d'): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
};
