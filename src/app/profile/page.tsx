'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface GameProgress {
  id: string;
  game_id: string;
  high_score: number;
  last_played_at: string;
  game: {
    title: string;
    description: string;
  };
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [gameProgress, setGameProgress] = useState<GameProgress[]>([]);

  useEffect(() => {
    checkUser();
    loadGameProgress();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  }

  async function loadGameProgress() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('user_game_progress')
      .select(`
        *,
        game:games (
          title,
          description
        )
      `)
      .eq('user_id', user.id)
      .order('last_played_at', { ascending: false });

    setGameProgress(data || []);
  }

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient"></div>
        <div className="absolute inset-0 bg-noise"></div>
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
        
        <Navigation />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-nebula">Loading profile...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient"></div>
        <div className="absolute inset-0 bg-noise"></div>
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
        
        <Navigation />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <p className="text-star-dim mb-4">Please sign in to view your profile</p>
          <Link
            href="/auth"
            className="px-4 py-2 bg-cosmic/90 hover:bg-cosmic rounded-full text-sm transition-all duration-300 shadow-cosmic"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-gradient"></div>
      <div className="absolute inset-0 bg-noise"></div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {user.user_metadata.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-nebula/50"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-space-light border-2 border-nebula/50 flex items-center justify-center">
                <span className="text-2xl text-nebula">
                  {user.email?.[0].toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="font-exo text-3xl font-bold text-star-bright">
                {user.user_metadata.full_name || user.email}
              </h1>
              <p className="text-star-dim">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Game Progress */}
        <div className="mb-12">
          <h2 className="font-exo text-2xl font-bold text-star-bright mb-6">
            Your Games
          </h2>
          
          {gameProgress.length === 0 ? (
            <div className="bg-space-light/30 backdrop-blur-sm rounded-lg p-8 text-center">
              <p className="text-star-dim mb-4">You haven't played any games yet</p>
              <Link
                href="/games"
                className="text-nebula hover:text-nebula-light transition-colors"
              >
                Browse Games →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameProgress.map((progress) => (
                <div
                  key={progress.id}
                  className="bg-space-light/30 backdrop-blur-sm rounded-lg p-6 border border-space-light/20"
                >
                  <h3 className="font-exo text-xl font-semibold text-star-bright mb-2">
                    {progress.game.title}
                  </h3>
                  <p className="text-star-dim text-sm mb-4">
                    {progress.game.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-nebula">
                      High Score: {progress.high_score}
                    </span>
                    <span className="text-asteroid">
                      Last played: {new Date(progress.last_played_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="font-exo text-2xl font-bold text-star-bright mb-6">
            Account Settings
          </h2>
          <div className="bg-space-light/30 backdrop-blur-sm rounded-lg p-6 border border-space-light/20">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-star-bright font-medium mb-1">Email Address</h3>
                <p className="text-star-dim">{user.email}</p>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-4 py-2 bg-nebula/90 hover:bg-nebula rounded-full text-sm transition-all duration-300 shadow-nebula"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 