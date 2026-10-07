import { Request, Response, NextFunction } from 'express';
import * as reservationService from '../services/reservationService.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const createReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reservation = await reservationService.createReservation(req.body);
    sendSuccess(
      res,
      reservation,
      'Votre demande de réservation a été enregistrée avec succès. Notre équipe vous contactera rapidement.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reservations = await reservationService.getAllReservationsAdmin();
    sendSuccess(res, reservations, 'Liste des réservations récupérée');
  } catch (error) {
    next(error);
  }
};

export const updateReservationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await reservationService.updateReservationStatus(id, req.body);
    sendSuccess(res, updated, 'Statut de réservation mis à jour');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await reservationService.deleteReservation(id);
    sendSuccess(res, result, 'Réservation supprimée');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};
