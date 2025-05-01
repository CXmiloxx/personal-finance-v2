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

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Token no valido o expirado.');
      }

      const data = await res.json();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(message);
      console.error('Error al verificar el token:', message);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const userData = await res.json();

      if (!res.ok) {
        setError(userData.message || 'Algo salio mal en el login.');
        return;
      }

      if (userData) {
        console.log('Login exitoso:', userData);
        const informationUser = await verifyToken();
        if (!informationUser) {
          setError('Token no valido o expirado.');
          return;
        }
        console.log('informationUser:', informationUser);

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
