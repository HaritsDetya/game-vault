'use client';

import React from 'react';
import { GameStatus } from '@/types/game';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: GameStatus | 'ALL';
  onStatusChange: (status: GameStatus | 'ALL') => void;
  platformFilter: string;
  onPlatformChange: (platform: string) => void;
  sortBy: 'UPDATED' | 'RATING' | 'PLAYTIME' | 'TITLE';
  onSortChange: (sort: 'UPDATED' | 'RATING' | 'PLAYTIME' | 'TITLE') => void;
  platforms: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  platformFilter,
  onPlatformChange,
  sortBy,
  onSortChange,
  platforms
}) => {
  const statusTabs: { key: GameStatus | 'ALL'; label: string }[] = [
    { key: 'ALL', label: 'Semua' },
    { key: 'PLAYING', label: 'Sedang Main' },
    { key: 'COMPLETED', label: 'Tamat' },
    { key: 'WISHLIST', label: 'Wishlist' },
    { key: 'DROPPED', label: 'Dropped' }
  ];

  return (
    <div className="space-y-3.5 mb-6">
      {/* Search & Selectors Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari judul game, genre, developer..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Platform & Sort Selectors */}
        <div className="flex items-center gap-2">
          {/* Platform Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={platformFilter}
              onChange={(e) => onPlatformChange(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="ALL">Semua Platform</option>
              {platforms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="w-full sm:w-auto appearance-none bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="UPDATED">Terakhir Diupdate</option>
              <option value="RATING">Rating Tertinggi</option>
              <option value="PLAYTIME">Waktu Main Terbanyak</option>
              <option value="TITLE">Judul A-Z</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onStatusChange(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
