'use client';
import { ChildrenType } from '@/types/childrenType';
import { ThemeContextType, themeType } from '@/types/theme';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ChildrenType) {
  const [theme, setTheme] = useState<themeType>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as themeType;
      return savedTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe de estar dentro de un ThemeProvider');
  }
  return context;
}
