import { Request, Response, NextFunction } from 'express';
import * as newsletterService from '../services/newsletterService.js';
import { sendSuccess } from '../utils/response.js';

export const subscribeNewsletter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subscriber = await newsletterService.subscribeNewsletter(req.body);
    sendSuccess(
      res,
      subscriber,
      'Merci pour votre inscription à la lettre d’inspiration de SENEGAL TOP TOUR.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getNewsletterSubscribers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subscribers = await newsletterService.getNewsletterSubscribersAdmin();
    sendSuccess(res, subscribers, 'Liste des abonnés à la newsletter récupérée');
  } catch (error) {
    next(error);
  }
};
