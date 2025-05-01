'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ButtonTheme from '../ButtonTheme';
import Image from 'next/image';
import { LoginTypeAuth } from '@/types/auth.types';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login, loading, error } = useAuth();

  const [userData, setUserData] = useState<LoginTypeAuth>({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const { email, password } = userData;

    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      console.error('Login failed:', err);
      setFormError(err?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.4 }}
        className="self-end mb-4"
      >
        <ButtonTheme />
      </motion.div>

      <motion.a
        href="#"
        animate={{ opacity: [0, 1], y: [-10, 0] }}
        transition={{ duration: 0.5 }}
        className="flex items-center text-3xl font-bold text-gray-900 dark:text-white mb-6"
      >
        <Image
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        MyApp
      </motion.a>

      <motion.div
        animate={{ scale: [0.95, 1], opacity: [0, 1] }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Sign in to your account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
            >
              Email
            </label>
            <div className="absolute left-3 top-10 text-gray-400">
              <FaEnvelope />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="pl-10 pr-4 py-2.5 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
            >
              Password
            </label>
            <div className="absolute left-3 top-10 text-gray-400">
              <FaLock />
            </div>
            <input
              id="password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="pl-10 pr-4 py-2.5 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <motion.button
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 0.3 }}
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium py-2.5 rounded-lg transition duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account?{' '}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
