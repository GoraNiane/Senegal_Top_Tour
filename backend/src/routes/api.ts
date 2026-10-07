import { Router } from 'express';
import { login, getMe } from '../controllers/authController.js';
import {
  getDestinations,
  getDestinationBySlug,
  getAllDestinationsAdmin,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import {
  getExcursions,
  getExcursionBySlug,
  getAllExcursionsAdmin,
  createExcursion,
  updateExcursion,
  deleteExcursion,
} from '../controllers/excursionController.js';
import {
  getExperiences,
  getExperienceBySlug,
} from '../controllers/experienceController.js';
import {
  createReservation,
  getReservations,
  updateReservationStatus,
  deleteReservation,
} from '../controllers/reservationController.js';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import {
  createContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import {
  subscribeNewsletter,
  getNewsletterSubscribers,
} from '../controllers/newsletterController.js';
import { getDashboardStats } from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema } from '../validators/authValidator.js';
import { createDestinationSchema, updateDestinationSchema } from '../validators/destinationValidator.js';
import { createExcursionSchema, updateExcursionSchema } from '../validators/excursionValidator.js';
import { createReservationSchema, updateReservationStatusSchema } from '../validators/reservationValidator.js';
import { createContactMessageSchema } from '../validators/contactValidator.js';
import { subscribeNewsletterSchema } from '../validators/newsletterValidator.js';

const router = Router();

// ==================================================
// 1. PUBLIC API ROUTES
// ==================================================

// Auth login
router.post('/auth/login', validateBody(loginSchema), login);
router.get('/auth/me', requireAuth, getMe);

// Excursions
router.get('/excursions', getExcursions);
router.get('/excursions/:slug', getExcursionBySlug);

// Destinations
router.get('/destinations', getDestinations);
router.get('/destinations/:slug', getDestinationBySlug);

// Themes & Experiences (support both /themes and /experiences)
router.get('/themes', getExperiences);
router.get('/experiences', getExperiences);
router.get('/experiences/:slug', getExperienceBySlug);

// Gallery & Testimonials
router.get('/gallery', getGalleryImages);
router.get('/testimonials', getTestimonials);

// Public Submissions (with Zod validation)
router.post('/reservations', validateBody(createReservationSchema), createReservation);
router.post('/contact', validateBody(createContactMessageSchema), createContactMessage);
router.post('/newsletter', validateBody(subscribeNewsletterSchema), subscribeNewsletter);


// ==================================================
// 2. PROTECTED ADMIN API ROUTES
// ==================================================

// Dashboard Stats
router.get('/admin/stats', requireAuth, requireRole(['ADMIN', 'EDITOR']), getDashboardStats);

// Excursions Management
router.get('/admin/excursions', requireAuth, requireRole(['ADMIN', 'EDITOR']), getAllExcursionsAdmin);
router.post('/admin/excursions', requireAuth, requireRole(['ADMIN', 'EDITOR']), validateBody(createExcursionSchema), createExcursion);
router.put('/admin/excursions/:id', requireAuth, requireRole(['ADMIN', 'EDITOR']), validateBody(updateExcursionSchema), updateExcursion);
router.delete('/admin/excursions/:id', requireAuth, requireRole(['ADMIN']), deleteExcursion);

// Destinations Management
router.get('/admin/destinations', requireAuth, requireRole(['ADMIN', 'EDITOR']), getAllDestinationsAdmin);
router.post('/admin/destinations', requireAuth, requireRole(['ADMIN', 'EDITOR']), validateBody(createDestinationSchema), createDestination);
router.put('/admin/destinations/:id', requireAuth, requireRole(['ADMIN', 'EDITOR']), validateBody(updateDestinationSchema), updateDestination);
router.delete('/admin/destinations/:id', requireAuth, requireRole(['ADMIN']), deleteDestination);

// Reservations Management
router.get('/admin/reservations', requireAuth, requireRole(['ADMIN', 'EDITOR']), getReservations);
router.put('/admin/reservations/:id', requireAuth, requireRole(['ADMIN', 'EDITOR']), validateBody(updateReservationStatusSchema), updateReservationStatus);
router.put('/admin/reservations/:id/status', requireAuth, requireRole(['ADMIN', 'EDITOR']), validateBody(updateReservationStatusSchema), updateReservationStatus);
router.delete('/admin/reservations/:id', requireAuth, requireRole(['ADMIN']), deleteReservation);

// Testimonials Management
router.post('/admin/testimonials', requireAuth, requireRole(['ADMIN', 'EDITOR']), createTestimonial);
router.put('/admin/testimonials/:id', requireAuth, requireRole(['ADMIN', 'EDITOR']), updateTestimonial);
router.delete('/admin/testimonials/:id', requireAuth, requireRole(['ADMIN']), deleteTestimonial);

// Gallery Management
router.post('/admin/gallery', requireAuth, requireRole(['ADMIN', 'EDITOR']), createGalleryImage);
router.delete('/admin/gallery/:id', requireAuth, requireRole(['ADMIN']), deleteGalleryImage);

// Contact Messages Management
router.get('/admin/messages', requireAuth, requireRole(['ADMIN', 'EDITOR']), getContactMessages);
router.put('/admin/messages/:id/read', requireAuth, requireRole(['ADMIN', 'EDITOR']), markMessageAsRead);
router.delete('/admin/messages/:id', requireAuth, requireRole(['ADMIN']), deleteContactMessage);

// Newsletter Subscribers
router.get('/admin/newsletter', requireAuth, requireRole(['ADMIN', 'EDITOR']), getNewsletterSubscribers);

export default router;
