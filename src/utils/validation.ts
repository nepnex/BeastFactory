/**
 * Validation utilities for user input sanitization and verification
 */

/**
 * Sanitizes input to allow ONLY letters, spaces, hyphens, and apostrophes for full names.
 * Numbers and special characters are stripped out dynamically.
 */
export const sanitizeNameInput = (value: string): string => {
  return value.replace(/[^a-zA-Z\s'\-]/g, '');
};

/**
 * Sanitizes input to allow ONLY digits and '+' for phone numbers.
 * Enforces maximum 15 digits (international format standard).
 */
export const sanitizePhoneInput = (value: string): string => {
  const cleaned = value.replace(/[^0-9+]/g, '');
  // Ensure '+' can only be at the very start if present
  if (cleaned.startsWith('+')) {
    return '+' + cleaned.slice(1).replace(/\+/g, '').slice(0, 14);
  }
  return cleaned.replace(/\+/g, '').slice(0, 15);
};

/**
 * Validates whether a full name has at least 2 characters of valid alphabetic text.
 */
export const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && /^[a-zA-Z\s'\-]+$/.test(trimmed);
};

/**
 * Validates phone number length and format (min 7 digits, max 15 digits).
 * Standard Nepal numbers start with 98/97/96 or landlines, e.g. 9801234567.
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
};
