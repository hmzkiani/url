import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#0D1310] text-stone-900 dark:text-stone-100 transition-colors duration-200 selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
