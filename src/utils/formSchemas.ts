import { z } from 'zod';

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,10}$/;
const nameRegex = /^[a-zA-Z\s.'-]+$/;

// Common field validators
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name cannot exceed 100 characters')
  .regex(nameRegex, 'Name contains invalid characters');

export const phoneSchema = z
  .string()
  .min(7, 'Phone number must be at least 7 digits')
  .max(20, 'Phone number cannot exceed 20 characters')
  .regex(phoneRegex, 'Please enter a valid phone number format');

export const optionalEmailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(120, 'Email cannot exceed 120 characters')
  .optional()
  .or(z.literal(''));

export const optionalMessageSchema = z
  .string()
  .max(2000, 'Message cannot exceed 2000 characters')
  .optional();

// 1. Contact Form Schema
export const contactFormSchema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  email: optionalEmailSchema,
  message: optionalMessageSchema,
});

// 2. Membership / Free Trial Application Schema
export const applicationFormSchema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  email: optionalEmailSchema,
  membershipPlanId: z.string().optional(),
  boxingProgramId: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTimeSlot: z.string().optional(),
});

// 3. Trainer Booking Schema
export const trainerBookingSchema = z.object({
  customerName: nameSchema,
  customerPhone: phoneSchema,
  customerEmail: optionalEmailSchema,
  trainerId: z.string().min(1, 'Please select a trainer'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTimeSlot: z.string().min(1, 'Please select a time slot'),
});

// 4. Spa Booking Schema
export const spaBookingSchema = z.object({
  customerName: nameSchema,
  customerPhone: phoneSchema,
  customerEmail: optionalEmailSchema,
  spaServiceId: z.string().min(1, 'Please select a spa service'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTimeSlot: z.string().min(1, 'Please select a time slot'),
});

// 5. Product Order Inquiry Schema
export const productInquirySchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  quantity: z.number().int().min(1).max(20),
});
