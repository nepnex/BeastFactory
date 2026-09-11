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
}

export interface ServiceItem extends BaseEntity {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  coverImageUrl: string;
  features: string[];
  startingPriceNpr?: number;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface BoxingPlan extends BaseEntity {
  programName: string;
  description: string;
  durationText: string;
  priceNpr: number;
  scheduleDetails: string;
  features: string[];
  isActive: boolean;
  displayOrder: number;
}

export interface MembershipPlan extends BaseEntity {
  name: string;
  description: string;
  priceMonthlyNpr: number;
  priceYearlyNpr?: number;
  features: string[];
  badgeText?: string;
  isPopular: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface SpaService extends BaseEntity {
  title: string;
  description: string;
  durationMinutes: number;
  priceNpr: number;
  imageUrl: string;
  isAvailable: boolean;
  displayOrder: number;
}

export interface ProductItem extends BaseEntity {
  name: string;
  description: string;
  category: string;
  priceNpr: number;
  imageUrls: string[];
  sku?: string;
  inStock: boolean;
  isFeatured: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface TransformationStory extends BaseEntity {
  clientName: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  startingWeightKg?: number;
  finalWeightKg?: number;
  durationWeeks?: number;
  programName?: string;
  serviceId?: string;
  storyText: string;
  testimonialQuote?: string;
  hasClientConsent: boolean;
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
}

export interface GalleryItem extends BaseEntity {
  title: string;
  category: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Testimonial extends BaseEntity {
  name: string;
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
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
