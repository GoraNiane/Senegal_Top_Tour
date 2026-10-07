export type PublicationStatus = 'DRAFT' | 'UPCOMING' | 'PUBLISHED' | 'ARCHIVED';

export type ReservationStatus = 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
  createdAt?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  region: string;
  category?: string;
  status?: PublicationStatus;
  highlights: string[] | string;
  imageUrl: string;
  latitude?: number | null;
  longitude?: number | null;
  isFeatured: boolean;
  order: number;
  _count?: { excursions: number };
  createdAt?: string;
  updatedAt?: string;
}

export interface ItineraryStep {
  id?: string;
  time: string;
  title: string;
  description: string;
  order: number;
}

export interface ExcursionImage {
  id?: string;
  url: string;
  alt?: string;
  caption?: string;
  isCover: boolean;
  order: number;
}

export interface Excursion {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  shortDescription?: string;
  description: string;
  fullContent?: string;
  duration: string;
  durationCategory: 'half_day' | 'full_day' | 'multi_day';
  departTime?: string;
  schedule?: string;
  returnTime?: string;
  departureCity: string;
  departureLocation?: string;
  minGroupSize: number;
  maxGroupSize?: number | null;
  priceType: 'fixed' | 'on_demand' | 'variable_group';
  priceAmount?: number | null;
  price?: number | null;
  currency: string;
  pricePerPerson?: number | null;
  priceGroup?: number | null;
  priceNote?: string;
  inclusions: string[];
  included?: string[];
  exclusions: string[];
  excluded?: string[];
  practicalInfo: Record<string, string>;
  status?: PublicationStatus;
  isUpcoming?: boolean;
  statusLabel?: string;
  isFeatured: boolean;
  featured?: boolean;
  isPopular?: boolean;
  category: string;
  order?: number;
  displayOrder?: number;
  destinationId?: string | null;
  destination?: Destination;
  images: ExcursionImage[];
  itinerary: ItineraryStep[];
  related?: Excursion[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  highlights: string[] | string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  isFeatured: boolean;
  order?: number;
  status?: PublicationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reservation {
  id?: string;
  refNumber?: string;
  fullName: string;
  email: string;
  phone?: string;
  phoneWhatsApp: string;
  numberOfTravelers: number;
  travelerCount?: number;
  preferredDate: string;
  requestedDate?: string;
  destination?: string;
  excursion?: string;
  experienceType?: string;
  duration?: string;
  budget?: string;
  message?: string;
  status?: ReservationStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  fullName: string;
  country: string;
  avatarUrl?: string;
  rating: number;
  comment: string;
  tourName?: string;
  isPublished: boolean;
  createdAt?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  location?: string;
  order: number;
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  status?: 'NEW' | 'READ' | 'ARCHIVED';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  totalExcursions: number;
  publishedExcursions: number;
  upcomingExcursions: number;
  draftExcursions: number;
  totalDestinations: number;
  publishedDestinations: number;
  unreadMessages: number;
  newsletterCount: number;
}
