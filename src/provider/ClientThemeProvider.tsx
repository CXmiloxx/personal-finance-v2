'use client';
import { ChildrenType } from '@/types/children.types';
import { ThemeProvider } from '@/context/ThemeContext';
export function ClientThemeProvider({ children }: ChildrenType) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
