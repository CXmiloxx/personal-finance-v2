'use client';
import { ChildrenType } from '@/types/children.types';
import { ThemeContextType, themeType } from '@/types/theme.types';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ChildrenType) {
  const [mounted, setMounted] = useState<Boolean | null>(false);
  const [theme, setTheme] = useState<themeType>('light');

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme') as themeType;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
  };

  if (!mounted) {
    return <div suppressHydrationWarning></div>;
  }

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
