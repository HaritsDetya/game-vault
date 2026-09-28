'use client';

import React from 'react';
import { GameEntry } from '@/types/game';
import { Trophy, Flame, BookmarkCheck, Clock, Star, Layers } from 'lucide-react';

interface StatsOverviewProps {
  games: GameEntry[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ games }) => {
  const total = games.length;
  const playing = games.filter(g => g.status === 'PLAYING').length;
  const completed = games.filter(g => g.status === 'COMPLETED').length;
  const wishlist = games.filter(g => g.status === 'WISHLIST').length;
  const totalHours = games.reduce((acc, g) => acc + (g.playtimeHours || 0), 0);
  
  const ratedGames = games.filter(g => (g.rating || 0) > 0);
  const avgRating = ratedGames.length > 0 
    ? (ratedGames.reduce((acc, g) => acc + g.rating, 0) / ratedGames.length).toFixed(1)
    : '0';

  const stats = [
    {
      label: 'Total Koleksi',
      value: total,
      icon: Layers,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      label: 'Sedang Dimainkan',
      value: playing,
      icon: Flame,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20'
    },
    {
      label: 'Tamat (Completed)',
      value: completed,
      icon: Trophy,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'Wishlist',
      value: wishlist,
      icon: BookmarkCheck,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      label: 'Total Waktu Main',
      value: `${totalHours} Jam`,
      icon: Clock,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      label: 'Rata-rata Rating',
      value: `★ ${avgRating}`,
      icon: Star,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${item.bg} backdrop-blur-sm transition-all hover:translate-y-[-2px]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-zinc-400 line-clamp-1">{item.label}</span>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <p className="text-xl font-bold tracking-tight text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};
