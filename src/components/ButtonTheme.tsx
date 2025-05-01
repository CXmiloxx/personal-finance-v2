'use client';
import { useTheme } from '@/context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ButtonTheme() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-gray-700 text-white px-4 py-2 rounded-full shadow-md transition duration-300 hover:bg-blue-700 dark:hover:bg-gray-600"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
      <span className="hidden sm:inline">
        {isDark ? 'Modo Claro' : 'Modo Oscuro'}
      </span>
    </motion.button>
  );
}
