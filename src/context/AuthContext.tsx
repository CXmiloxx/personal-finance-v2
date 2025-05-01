'use client';
import { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/authContext.types';
import { ChildrenType } from '@/types/children.types';
import { useUserAuth as useUserAuth } from '@/hooks/useUserAuth';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: ChildrenType) {
  const auth = useUserAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuthContext debe de estar dentro  de un AuthProvider');
  return context;
}
