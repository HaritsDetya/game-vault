'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GameEntry, GameStatus } from '@/types/game';
import { getStoredGames, saveStoredGames } from '@/lib/storage';
import { Header } from '@/components/Header';
import { StatsOverview } from '@/components/StatsOverview';
import { FilterBar } from '@/components/FilterBar';
import { GameCard } from '@/components/GameCard';
import { GameDetailModal } from '@/components/GameDetailModal';
import { AddGameModal } from '@/components/AddGameModal';
import { SettingsModal } from '@/components/SettingsModal';
import { Gamepad2, Plus, Ghost } from 'lucide-react';

export default function Home() {
  const [games, setGames] = useState<GameEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<GameStatus | 'ALL'>('ALL');
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'UPDATED' | 'RATING' | 'PLAYTIME' | 'TITLE'>('UPDATED');

  // Modals state
  const [activeGame, setActiveGame] = useState<GameEntry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const data = getStoredGames();
    setGames(data);
    setIsLoaded(true);

    const handleUpdate = () => {
      setGames(getStoredGames());
    };
    window.addEventListener('game_vault_updated', handleUpdate);
    return () => window.removeEventListener('game_vault_updated', handleUpdate);
  }, []);

  // Distinct platforms list for filter
  const platforms = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => {
      if (g.platform) set.add(g.platform);
    });
    return Array.from(set);
  }, [games]);

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter((g) => g.status === statusFilter);
    }

    // Platform filter
    if (platformFilter !== 'ALL') {
      result = result.filter((g) => g.platform === platformFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.developer?.toLowerCase().includes(q) ||
          g.genres?.some((genre) => genre.toLowerCase().includes(q)) ||
          g.review?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'RATING') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'PLAYTIME') {
        return (b.playtimeHours || 0) - (a.playtimeHours || 0);
      }
      if (sortBy === 'TITLE') {
        return a.title.localeCompare(b.title);
      }
      // UPDATED default
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [games, statusFilter, platformFilter, searchQuery, sortBy]);

  // Actions
  const handleAddGame = (newGame: GameEntry) => {
    const updated = [newGame, ...games];
    setGames(updated);
    saveStoredGames(updated);
  };

  const handleSaveGame = (updatedGame: GameEntry) => {
    const updated = games.map((g) => (g.id === updatedGame.id ? updatedGame : g));
    setGames(updated);
    saveStoredGames(updated);
  };

  const handleDeleteGame = (id: string) => {
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    saveStoredGames(updated);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 animate-pulse text-indigo-400" />
          <span>Memuat Vault Anda...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        totalGames={games.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Statistics Banner */}
        <StatsOverview games={games} />

        {/* Search, Status Tabs & Filters */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          platformFilter={platformFilter}
          onPlatformChange={setPlatformFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          platforms={platforms}
        />

        {/* Game Grid or Empty State */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => setActiveGame(game)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
              <Ghost className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-200">Tidak ada game ditemukan</h3>
            <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-5">
              Coba ganti filter status/platform atau cari dengan kata kunci lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setPlatformFilter('ALL');
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
        <p>GameVault &bull; Cloud Personal Game Tracking & Wiki Platform</p>
      </footer>

      {/* Modals */}
      <GameDetailModal
        game={activeGame}
        isOpen={Boolean(activeGame)}
        onClose={() => setActiveGame(null)}
        onSave={handleSaveGame}
        onDelete={handleDeleteGame}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        games={games}
        onRefreshData={(newGames) => setGames(newGames)}
      />
    </div>
  );
}
