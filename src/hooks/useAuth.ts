import { useState, useEffect } from 'react';

const AUTH_KEY = 'beast_factory_admin_session';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(localStorage.getItem(AUTH_KEY) === 'true');
    };
    window.addEventListener('beast_factory_auth_update', handleAuthChange);
    return () => window.removeEventListener('beast_factory_auth_update', handleAuthChange);
  }, []);

  const login = (password: string): boolean => {
    // Default admin password for local dev / demonstration
    if (password === 'beast2026' || password === 'admin') {
      localStorage.setItem(AUTH_KEY, 'true');
      window.dispatchEvent(new Event('beast_factory_auth_update'));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event('beast_factory_auth_update'));
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
