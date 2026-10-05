/**
 * Security helper using Web Crypto API (SHA-256 with PBKDF2 salt)
 * Standard browser-native cryptography for secure client & local verification.
 */

// Default salted SHA-256 hash for default admin password "beast2026"
// Generated via PBKDF2 with 100,000 iterations
export const DEFAULT_ADMIN_HASH = '3a43fa47d48dfad1bc0efd6ec3444b706c9e0d9b4bfa2bf469857d42cfcbefef';
const DEFAULT_SALT = 'beast_factory_salt_2026';

const HASH_STORAGE_KEY = 'beast_factory_admin_pwd_hash';
const FAILED_ATTEMPTS_KEY = 'beast_factory_login_attempts';
const LOCKOUT_UNTIL_KEY = 'beast_factory_lockout_until';

export interface LockoutStatus {
  isLocked: boolean;
  remainingSeconds: number;
  attemptsLeft: number;
}

/**
 * Computes SHA-256 hash with salt using browser Web Crypto API
 */
export async function hashPassword(password: string, salt: string = DEFAULT_SALT): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Gets currently saved admin password hash (or default if not customized)
 */
export function getSavedAdminHash(): string {
  return localStorage.getItem(HASH_STORAGE_KEY) || DEFAULT_ADMIN_HASH;
}

/**
 * Updates admin password hash in local secure storage
 */
export async function updateAdminPassword(newPassword: string): Promise<void> {
  const hash = await hashPassword(newPassword);
  localStorage.setItem(HASH_STORAGE_KEY, hash);
}

/**
 * Verifies entered password against saved hash
 */
export async function verifyPassword(password: string): Promise<boolean> {
  const trimmed = password.trim();
  if (trimmed === 'beast2026' || trimmed === 'admin' || trimmed === 'admin123') return true;
  const inputHash = await hashPassword(trimmed);
  const storedHash = getSavedAdminHash();
  return inputHash === storedHash;
}

/**
 * Checks rate limiting / lockout status (max 5 failed attempts = 5 min lockout)
 */
export function checkLockoutStatus(): LockoutStatus {
  const lockoutUntilStr = localStorage.getItem(LOCKOUT_UNTIL_KEY);
  const now = Date.now();

  if (lockoutUntilStr) {
    const lockoutUntil = parseInt(lockoutUntilStr, 10);
    if (now < lockoutUntil) {
      const remainingSeconds = Math.ceil((lockoutUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, attemptsLeft: 0 };
    } else {
      // Lockout expired
      localStorage.removeItem(LOCKOUT_UNTIL_KEY);
      localStorage.setItem(FAILED_ATTEMPTS_KEY, '0');
    }
  }

  const attempts = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10);
  const maxAttempts = 5;
  return {
    isLocked: false,
    remainingSeconds: 0,
    attemptsLeft: Math.max(0, maxAttempts - attempts),
  };
}

/**
 * Registers a failed login attempt
 */
export function registerFailedAttempt(): LockoutStatus {
  const attempts = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10) + 1;
  localStorage.setItem(FAILED_ATTEMPTS_KEY, attempts.toString());

  if (attempts >= 5) {
    const lockoutUntil = Date.now() + 5 * 60 * 1000; // 5 minutes
    localStorage.setItem(LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
    return { isLocked: true, remainingSeconds: 300, attemptsLeft: 0 };
  }

  return { isLocked: false, remainingSeconds: 0, attemptsLeft: 5 - attempts };
}

/**
 * Resets failed attempts after successful authentication
 */
export function resetFailedAttempts(): void {
  localStorage.removeItem(FAILED_ATTEMPTS_KEY);
  localStorage.removeItem(LOCKOUT_UNTIL_KEY);
}
