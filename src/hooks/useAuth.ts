import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { verifyPassword, checkLockoutStatus, registerFailedAttempt, resetFailedAttempts } from '../utils/security';

const DEMO_AUTH_KEY = 'beast_factory_admin_session';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (emailOrPassword: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured && supabase) {
      // 1. Fetch initial active session from Supabase Auth
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(Boolean(session?.user));
        setLoading(false);
      });

      // 2. Listen to real-time auth state changes (login, logout, token refresh, expiry)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(Boolean(session?.user));
        setLoading(false);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } else {
      // Local fallback session check
      const demoAuth = localStorage.getItem(DEMO_AUTH_KEY) === 'true';
      setIsAuthenticated(demoAuth);
      setLoading(false);

      const handleAuthChange = () => {
        setIsAuthenticated(localStorage.getItem(DEMO_AUTH_KEY) === 'true');
      };
      window.addEventListener('beast_factory_auth_update', handleAuthChange);

      return () => {
        mounted = false;
        window.removeEventListener('beast_factory_auth_update', handleAuthChange);
      };
    }
  }, []);

  const login = async (
    emailOrPassword: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Rate Limiting & Lockout Check
    const lockout = checkLockoutStatus();
    if (lockout.isLocked) {
      return {
        success: false,
        error: `Account temporarily locked due to failed login attempts. Please try again in ${lockout.remainingSeconds} seconds.`
      };
    }

    if (isSupabaseConfigured && supabase) {
      const email = password ? emailOrPassword : emailOrPassword;
      const pwd = password || emailOrPassword;

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.includes('@') ? email : `${email}@beastfactory.com`,
          password: pwd,
        });

        if (error) {
          const status = registerFailedAttempt();
          if (status.isLocked) {
            return { success: false, error: 'Too many failed attempts. Locked out for 5 minutes.' };
          }
          return {
            success: false,
            error: `${error.message} (${status.attemptsLeft} attempts left before lockout)`
          };
        }

        if (data.session) {
          resetFailedAttempts();
          setSession(data.session);
          setUser(data.user);
          setIsAuthenticated(true);
          return { success: true };
        }
        return { success: false, error: 'Authentication failed. Invalid session.' };
      } catch (err: any) {
        return { success: false, error: err.message || 'Authentication error occurred.' };
      }
    } else {
      // Local Hashed Auth verification via Web Crypto API (SHA-256)
      const pwd = password || emailOrPassword;
      const isValid = await verifyPassword(pwd);

      if (isValid) {
        resetFailedAttempts();
        localStorage.setItem(DEMO_AUTH_KEY, 'true');
        window.dispatchEvent(new Event('beast_factory_auth_update'));
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const status = registerFailedAttempt();
        if (status.isLocked) {
          return { success: false, error: 'Too many invalid attempts. Admin portal locked for 5 minutes.' };
        }
        return {
          success: false,
          error: `Invalid admin password. (${status.attemptsLeft} attempts remaining)`
        };
      }
    }
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(DEMO_AUTH_KEY);
      window.dispatchEvent(new Event('beast_factory_auth_update'));
    }
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
  };

  return { user, session, loading, isAuthenticated, login, logout };
};
