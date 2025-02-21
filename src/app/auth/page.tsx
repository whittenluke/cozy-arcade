'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithProvider(provider: 'github' | 'google') {
    try {
      setIsLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-gradient"></div>
      <div className="absolute inset-0 bg-noise"></div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="font-exo text-3xl font-bold text-star-bright">
                CozyArcade
              </span>
            </Link>
            <h2 className="text-2xl font-bold text-star-bright mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-star-dim">
              Sign in to track your progress and save high scores
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-space-light/30 backdrop-blur-sm rounded-lg p-8 shadow-cosmic border border-space-light/20">
            {error && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-star-dim mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-space-dark/50 border border-space-light/20 rounded-lg text-star-bright placeholder-star-dim/50 focus:outline-none focus:ring-2 focus:ring-nebula/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-star-dim mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-space-dark/50 border border-space-light/20 rounded-lg text-star-bright placeholder-star-dim/50 focus:outline-none focus:ring-2 focus:ring-nebula/50"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-nebula/90 hover:bg-nebula rounded-lg transition-all duration-300 font-medium disabled:opacity-50"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-space-light/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-space-light/30 text-star-dim">Or continue with</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => signInWithProvider('github')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#24292F] hover:bg-[#2F363D] rounded-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>

              <button
                onClick={() => signInWithProvider('google')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-gray-600 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.607,1.972-2.101,3.467-4.26,3.467c-2.624,0-4.747-2.124-4.747-4.747s2.124-4.747,4.747-4.747c1.123,0,2.178,0.391,3.004,1.096l2.05-2.05C17.341,5.933,15.241,5,12.545,5C8.229,5,4.545,8.229,4.545,12.545s3.229,7.545,7.545,7.545c7.545,0,9.091-7.091,8.364-10.909h-7.909V12.151z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center space-y-4">
              <button
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-nebula hover:text-nebula-light"
              >
                {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
              <p className="text-sm text-star-dim">
                By continuing, you agree to CozyArcade's{' '}
                <Link href="/terms" className="text-nebula hover:text-nebula-light">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 