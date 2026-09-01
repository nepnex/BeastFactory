export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type LeadStatus = 'new' | 'contacted' | 'interested' | 'converted' | 'not_interested' | 'closed';
export type LeadType = 'membership' | 'free_trial' | 'trainer_session' | 'spa' | 'product' | 'contact_general';

export interface Founder {
  id: string;
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

export interface Trainer {
  id: string;
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
  };
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder: number;
}

export interface ServiceItem {
  id: string;
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

export interface BoxingPlan {
  id: string;
  programName: string;
  description: string;
  durationText: string;
  priceNpr: number;
  scheduleDetails: string;
  features: string[];
  isActive: boolean;
  displayOrder: number;
}

export interface MembershipPlan {
  id: string;
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

export interface SpaService {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceNpr: number;
  imageUrl: string;
  isAvailable: boolean;
  displayOrder: number;
}

export interface ProductItem {
  id: string;
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

export interface TransformationStory {
  id: string;
  clientName: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  startingWeightKg?: number;
  finalWeightKg?: number;
  durationWeeks?: number;
  programName?: string;
  storyText: string;
  testimonialQuote?: string;
  hasClientConsent: boolean;
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: LeadType;
  message?: string;
  status: LeadStatus;
  adminNotes?: string;
  assignedStaff?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingType: 'spa' | 'trainer' | 'free_trial';
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

export interface BusinessSettings {
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
