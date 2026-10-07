import { Request, Response, NextFunction } from 'express';
import * as contactService from '../services/contactService.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const createContactMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await contactService.createContactMessage(req.body);
    sendSuccess(
      res,
      message,
      'Votre message a été transmis avec succès. Notre équipe vous répondra très rapidement.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const messages = await contactService.getContactMessagesAdmin();
    sendSuccess(res, messages, 'Messages reçus récupérés');
  } catch (error) {
    next(error);
  }
};

export const markMessageAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await contactService.markMessageAsRead(id);
    sendSuccess(res, updated, 'Message marqué comme lu');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const deleteContactMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await contactService.deleteContactMessage(id);
    sendSuccess(res, result, 'Message supprimé');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};
