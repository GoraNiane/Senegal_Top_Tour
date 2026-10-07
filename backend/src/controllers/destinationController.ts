import { Request, Response, NextFunction } from 'express';
import * as destinationService from '../services/destinationService.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getDestinations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destinations = await destinationService.getPublicDestinations();
    sendSuccess(res, destinations, 'Destinations publiées récupérées');
  } catch (error) {
    next(error);
  }
};

export const getDestinationBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const destination = await destinationService.getPublicDestinationBySlug(slug);
    sendSuccess(res, destination, 'Destination récupérée');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const getAllDestinationsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destinations = await destinationService.getAllDestinationsAdmin();
    sendSuccess(res, destinations, 'Toutes les destinations récupérées');
  } catch (error) {
    next(error);
  }
};

export const createDestination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const created = await destinationService.createDestination(req.body);
    sendSuccess(res, created, 'Destination créée avec succès', 201);
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const updateDestination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await destinationService.updateDestination(id, req.body);
    sendSuccess(res, updated, 'Destination mise à jour avec succès');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const deleteDestination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await destinationService.deleteDestination(id);
    sendSuccess(res, result, 'Destination supprimée avec succès');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};
