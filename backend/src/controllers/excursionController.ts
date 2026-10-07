import { Request, Response, NextFunction } from 'express';
import * as excursionService from '../services/excursionService.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getExcursions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, durationCategory, destination } = req.query;
    const excursions = await excursionService.getPublicExcursions({
      category: category as string,
      durationCategory: durationCategory as string,
      destinationSlug: destination as string,
    });
    sendSuccess(res, excursions, 'Excursions publiées récupérées');
  } catch (error) {
    next(error);
  }
};

export const getExcursionBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const excursion = await excursionService.getPublicExcursionBySlug(slug);
    sendSuccess(res, excursion, 'Excursion récupérée');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const getAllExcursionsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const excursions = await excursionService.getAllExcursionsAdmin();
    sendSuccess(res, excursions, 'Toutes les excursions récupérées (vue admin)');
  } catch (error) {
    next(error);
  }
};

export const createExcursion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const created = await excursionService.createExcursion(req.body);
    sendSuccess(res, created, 'Excursion créée avec succès', 201);
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const updateExcursion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await excursionService.updateExcursion(id, req.body);
    sendSuccess(res, updated, 'Excursion mise à jour avec succès');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};

export const deleteExcursion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await excursionService.deleteExcursion(id);
    sendSuccess(res, result, 'Excursion supprimée avec succès');
  } catch (error: any) {
    if (error.status) {
      sendError(res, error.message, error.status);
      return;
    }
    next(error);
  }
};
