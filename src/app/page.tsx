'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Game {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const { data } = await supabase.from('games').select('*').limit(4); // Limit featured games
    setGames(data || []);
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-gradient"></div>
      <div className="absolute inset-0 bg-noise"></div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      
      <Navigation />

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
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-exo text-3xl font-bold text-star-bright">Featured Games</h2>
            <Link 
              href="/games" 
              className="text-nebula hover:text-nebula-light transition-colors"
            >
              View All Games →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-space-light/50 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300 shadow-cosmic border border-space-light/20"
              >
                <h3 className="font-exo text-xl font-semibold text-star-bright mb-2">{game.title}</h3>
                <p className="text-star-dim mb-4">{game.description}</p>
                <div className="flex justify-between items-center">
                  <button 
                    className="px-4 py-2 bg-nebula/90 hover:bg-nebula rounded-full text-sm transition-all duration-300 shadow-nebula"
                  >
                    Play Now
                  </button>
                  <span className="text-xs text-asteroid">
                    {new Date(game.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
