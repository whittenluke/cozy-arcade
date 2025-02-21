'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Game {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    setLoading(true);
    const { data } = await supabase.from('games').select('*').order('created_at', { ascending: false });
    setGames(data || []);
    setLoading(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-gradient"></div>
      <div className="absolute inset-0 bg-noise"></div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      
      <Navigation />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="font-exo text-4xl font-bold text-star-bright mb-4">All Games</h1>
          <p className="text-star-dim text-lg">Browse our complete collection of browser games</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse text-nebula">Loading games...</div>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-star-dim text-lg">No games available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-space-light/50 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300 shadow-cosmic border border-space-light/20"
              >
                <h3 className="font-exo text-xl font-semibold text-star-bright mb-2">
                  {game.title}
                </h3>
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
        )}
      </div>
    </main>
  );
} 