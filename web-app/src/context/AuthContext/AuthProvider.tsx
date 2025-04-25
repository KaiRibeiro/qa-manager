import React, { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import AuthService from '../../services/AuthService';
import { User } from '../../types/User';
import { useLocation } from 'react-router-dom';

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const authService = new AuthService();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skipRoutes = ['/login', '/register'];
    if (skipRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser().catch(console.error);
  }, [location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.data);
    } catch (error) {
      // @ts-ignore
      throw new Error(`Login failed: ${error.message || 'An unknown error occurred'}`);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
