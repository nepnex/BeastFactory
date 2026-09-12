export type Role = 'admin' | 'staff';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type LeadStatus = 'new' | 'contacted' | 'interested' | 'converted' | 'not_interested' | 'closed';
export type LeadType = 'membership' | 'free_trial' | 'trainer_session' | 'spa' | 'product' | 'contact_general' | 'boxing';

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName?: string;
  role: Role;
  lastLoginAt?: string;
}

export interface Founder extends BaseEntity {
  name: string;
  position: string;
  photoUrl: string;
  shortBio: string;
  roleDescription: string;
  expertise: string[];
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  displayOrder: number;
  isActive: boolean;
}

export interface Trainer extends BaseEntity {
  fullName: string;
  photoUrl: string;
  title: string;
  shortBio: string;
  fullBio: string;
  yearsExperience: number;
  specializations: string[];
  certifications: string[];
  education?: string[];
  achievements?: string[];
  trainingPhilosophy?: string;
  languages: string[];
  sessionPriceNpr?: number;
  socials?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    email?: string;
  };
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder: number;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServiceItem extends BaseEntity {
  name: string;
  category: 'strength' | 'cardio' | 'boxing' | 'group' | 'spa' | 'coaching';
  shortDescription: string;
  fullDescription: string;
  coverImageUrl: string;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BoxingPlan extends BaseEntity {
  programName: string;
  durationText: string;
  priceNpr: number;
  description: string;
  features: string[];
  displayOrder: number;
  isActive: boolean;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MembershipPlan extends BaseEntity {
  name: string;
  badgeText?: string;
  priceMonthlyNpr: number;
  priceYearlyNpr?: number;
  description: string;
  features: string[];
  isPopular: boolean;
  displayOrder: number;
  isActive: boolean;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SpaService extends BaseEntity {
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  priceNpr: number;
  coverImageUrl: string;
  benefits: string[];
  temperatureControl?: string;
  capacity?: string;
  displayOrder: number;
  isAvailable: boolean;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductItem extends BaseEntity {
  name: string;
  category: 'apparel' | 'supplements' | 'accessories' | 'gear';
  priceNpr: number;
  description: string;
  imageUrls: string[];
  inStock: boolean;
  isFeatured: boolean;
  displayOrder: number;
  isActive: boolean;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface TransformationStory extends BaseEntity {
  clientName: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  startingWeightKg?: number;
  finalWeightKg?: number;
  durationWeeks: number;
  programName: string;
  storyText: string;
  testimonialQuote?: string;
  hasClientConsent: boolean;
  displayOrder: number;
  isPublished: boolean;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface GalleryItem extends BaseEntity {
  title: string;
  category: 'facility' | 'boxing' | 'spa' | 'community' | 'transformations';
  imageUrl: string;
  caption?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface Testimonial extends BaseEntity {
  memberName: string;
  memberTitle?: string;
  avatarUrl?: string;
  comment: string;
  rating: number;
  isVerified: boolean;
  displayOrder: number;
  isPublished: boolean;
}

export interface FAQItem extends BaseEntity {
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Lead extends BaseEntity {
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: LeadType;
  message?: string;
  membershipPlanId?: string;
  boxingProgramId?: string;
  status: LeadStatus;
  adminNotes?: string;
  assignedStaff?: string;
  createdAt: string;
}

export interface Booking extends BaseEntity {
  bookingType: 'spa' | 'trainer' | 'free_trial';
  spaServiceId?: string;
  trainerId?: string;
  serviceOrPlanId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  status: BookingStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface BusinessSettings extends BaseEntity {
  gymName: string;
  tagline: string;
  phone: string;
  email: string;
  locationAddress: string;
  operatingHours: string;
  daysOpen: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  // Extended SEO Controls
  siteTitle?: string;
  defaultMetaDescription?: string;
  defaultOgImage?: string;
  siteUrl?: string;
  googleMapsUrl?: string;
}

export type NotificationPriority = 'HIGH' | 'NORMAL' | 'SYSTEM';

export type NotificationType =
  | 'new_membership_inquiry'
  | 'new_free_trial'
  | 'new_trainer_booking'
  | 'new_spa_booking'
  | 'new_contact_inquiry'
  | 'new_product_inquiry'
  | 'new_transformation'
  | 'new_testimonial'
  | 'content_published'
  | 'content_unpublished'
  | 'image_uploaded';

export interface AdminNotification extends BaseEntity {
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  relatedId?: string;
  relatedType?: 'inquiry' | 'booking' | 'product' | 'transformation' | 'testimonial' | 'service';
  actionUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
