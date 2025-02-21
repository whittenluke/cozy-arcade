'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="relative z-20 border-b border-space-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-exo text-2xl font-bold text-star-bright">
              CozyArcade
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex space-x-8">
              <Link 
                href="/" 
                className="text-star-dim hover:text-star-bright transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/games" 
                className="text-star-dim hover:text-star-bright transition-colors"
              >
                Games
              </Link>
              {user && (
                <Link 
                  href="/profile" 
                  className="text-star-dim hover:text-star-bright transition-colors"
                >
                  Profile
                </Link>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-star-dim">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="px-4 py-2 bg-nebula/90 hover:bg-nebula rounded-full text-sm transition-all duration-300 shadow-nebula"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 bg-cosmic/90 hover:bg-cosmic rounded-full text-sm transition-all duration-300 shadow-cosmic"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-star-dim hover:text-star-bright focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-space-dark/95 backdrop-blur-sm border-b border-space-light/20">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-star-dim hover:text-star-bright"
          >
            Home
          </Link>
          <Link
            href="/games"
            className="block px-3 py-2 rounded-md text-base font-medium text-star-dim hover:text-star-bright"
          >
            Games
          </Link>
          {user && (
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-star-dim hover:text-star-bright"
            >
              Profile
            </Link>
          )}
          {user ? (
            <div className="px-3 py-2">
              <span className="block text-sm text-star-dim mb-2">{user.email}</span>
              <button
                onClick={signOut}
                className="w-full px-4 py-2 bg-nebula/90 hover:bg-nebula rounded-full text-sm transition-all duration-300 shadow-nebula text-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium text-star-dim hover:text-star-bright"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 