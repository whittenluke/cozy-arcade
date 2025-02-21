'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    checkUser();
    loadGames();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function loadGames() {
    const { data } = await supabase.from('games').select('*');
    setGames(data || []);
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-gradient"></div>
      <div className="absolute inset-0 bg-noise"></div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      
      {/* Navigation */}
      <nav className="relative z-20 border-b border-space-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-exo text-2xl font-bold text-star-bright">
                CozyArcade
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-star-dim hidden sm:inline">
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
                <button
                  onClick={signInWithGithub}
                  className="px-6 py-2 bg-cosmic/90 hover:bg-cosmic rounded-full transition-all duration-300 shadow-cosmic flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="font-exo text-6xl md:text-7xl font-bold text-star-bright mb-6 animate-float">
              Play Beautiful Browser Games
            </h1>
            <p className="text-xl md:text-2xl text-star-dim max-w-2xl mb-8">
              A curated collection of relaxing browser games
            </p>
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="pb-20">
          <h2 className="font-exo text-3xl font-bold text-star-bright mb-8">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={index}
                className="bg-space-light/50 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300 shadow-cosmic border border-space-light/20"
              >
                <h3 className="font-exo text-xl font-semibold text-star-bright mb-2">{game.title}</h3>
                <p className="text-star-dim">{game.description}</p>
                <p className="text-xs text-asteroid mt-4">{new Date(game.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
