'use client';
import { motion } from 'motion/react';
import Login from '@/components/login/Login';
export default function Home() {
  return (
    <div className='bg-primary dark:bg-primary-dark'>
      <Login />
    </div>
  );
}
