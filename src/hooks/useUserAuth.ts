'use client';
import { useState, useEffect } from 'react';
import { UserTypeAuth } from '@/types/auth.types';

export const useUserAuth = () => {
  const [user, setUser] = useState<UserTypeAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/limbs/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: email, userPass: password }),
      });

      const userData = await res.json();

      if (!res.ok) {
        setError(userData.error || 'Algo salio mal en el login.');
        return;
      }

      if (userData) {
        console.log('Login exitoso:', userData);

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(message);
      console.error('Algo salio mal en el login:', message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user;

  return { user, loading, error, login, logout, isAuthenticated };
};
