'use client';

import React, { useState, useEffect } from 'react';
import { GameEntry, GameStatus, RawgGameResult } from '@/types/game';
import { searchGames } from '@/lib/rawg';
import { Search, Plus, Sparkles, X, Loader2, Gamepad2, PenTool } from 'lucide-react';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: GameEntry) => void;
}

export const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose, onAddGame }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'API' | 'MANUAL'>('API');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RawgGameResult[]>([]);
  const [selectedGame, setSelectedGame] = useState<RawgGameResult | null>(null);

  // Form parameters
  const [status, setStatus] = useState<GameStatus>('PLAYING');
  const [platform, setPlatform] = useState('PC');
  const [rating, setRating] = useState<number>(0);
  const [playtimeHours, setPlaytimeHours] = useState<number>(0);

  // Manual entry state
  const [manualTitle, setManualTitle] = useState('');
  const [manualCover, setManualCover] = useState('');
  const [manualGenre, setManualGenre] = useState('');
  const [manualYear, setManualYear] = useState('');
  const [manualDev, setManualDev] = useState('');

  // Debounced search
  useEffect(() => {
    if (mode !== 'API') return;
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const results = await searchGames(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, mode]);

  const handleSelectApiGame = (game: RawgGameResult) => {
    setSelectedGame(game);
  };

  const handleSubmitApi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame) return;

    const newGame: GameEntry = {
      id: `game-${Date.now()}`,
      rawgId: selectedGame.id,
      title: selectedGame.name,
      coverImage: selectedGame.background_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
      backdropImage: selectedGame.background_image,
      status,
      platform,
      rating,
      playtimeHours: Number(playtimeHours) || 0,
      genres: selectedGame.genres?.map(g => g.name) || ['Action'],
      releaseYear: selectedGame.released ? selectedGame.released.slice(0, 4) : undefined,
      developer: selectedGame.developers?.[0]?.name || undefined,
      wikiNotes: '',
      checklists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddGame(newGame);
    onClose();
  };

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const newGame: GameEntry = {
      id: `game-${Date.now()}`,
      title: manualTitle.trim(),
      coverImage: manualCover.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
      backdropImage: manualCover.trim() || undefined,
      status,
      platform,
      rating,
      playtimeHours: Number(playtimeHours) || 0,
      genres: manualGenre ? manualGenre.split(',').map(g => g.trim()) : ['General'],
      releaseYear: manualYear.trim() || undefined,
      developer: manualDev.trim() || undefined,
      wikiNotes: '',
      checklists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tambah Game ke Vault</h3>
              <p className="text-xs text-zinc-400">Pilih dari database metadata otomatis atau masukkan manual</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/40 px-6">
          <button
            onClick={() => { setMode('API'); setSelectedGame(null); }}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              mode === 'API'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Cari via Metadata API</span>
          </button>

          <button
            onClick={() => setMode('MANUAL')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              mode === 'MANUAL'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Input Game Manual</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {mode === 'API' ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik judul game (misal: Elden Ring, GTA V, Persona, Hades)..."
                  className="w-full pl-9 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
                {isSearching && (
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* Selected Game Preview or Search Results */}
              {selectedGame ? (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-indigo-500/40 relative flex gap-4 items-center">
                  <img
                    src={selectedGame.background_image || ''}
                    alt={selectedGame.name}
                    className="w-24 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Game Terpilih
                    </span>
                    <h4 className="font-bold text-white text-base truncate">{selectedGame.name}</h4>
                    <p className="text-xs text-zinc-400">
                      Rilis: {selectedGame.released || 'N/A'} • {selectedGame.genres?.map(g => g.name).slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedGame(null)}
                    className="text-xs text-zinc-400 hover:text-zinc-200 underline"
                  >
                    Ganti
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {searchResults.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleSelectApiGame(game)}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-indigo-500/60 hover:bg-zinc-800/50 cursor-pointer transition-all"
                    >
                      <img
                        src={game.background_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop'}
                        alt={game.name}
                        className="w-14 h-10 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-zinc-100 truncate">{game.name}</h4>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {game.released?.slice(0, 4) || 'TBA'} • {game.genres?.map(g => g.name).slice(0, 2).join(', ') || 'Game'}
                        </p>
                      </div>
                      <span className="text-xs text-indigo-400 font-semibold px-2 py-1 rounded bg-indigo-500/10">
                        Pilih
                      </span>
                    </div>
                  ))}
                  {searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
                    <p className="text-xs text-zinc-500 text-center py-4">
                      Game tidak ditemukan di database cepat. Anda bisa memasukkannya lewat tab <strong className="text-zinc-300">Input Manual</strong> atau pastikan RAWG API Key terpasang di Pengaturan.
                    </p>
                  )}
                </div>
              )}

              {/* Status & Initial Config if game is chosen */}
              {selectedGame && (
                <form onSubmit={handleSubmitApi} className="space-y-4 pt-3 border-t border-zinc-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status Progres</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as GameStatus)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="PLAYING">Sedang Dimainkan</option>
                        <option value="COMPLETED">Tamat (Completed)</option>
                        <option value="WISHLIST">Rencana Main (Wishlist)</option>
                        <option value="ON_HOLD">Ditunda (On Hold)</option>
                        <option value="DROPPED">Ditinggalkan (Dropped)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Platform</label>
                      <input
                        type="text"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        placeholder="Contoh: PC, PS5, Switch"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Rating (1-10)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Jam Bermain</label>
                      <input
                        type="number"
                        min="0"
                        value={playtimeHours}
                        onChange={(e) => setPlaytimeHours(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan ke Vault Saya</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Manual Form */
            <form onSubmit={handleSubmitManual} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Judul Game *</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Contoh: Chrono Trigger"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">URL Gambar Cover (Opsional)</label>
                <input
                  type="url"
                  value={manualCover}
                  onChange={(e) => setManualCover(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Platform</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Contoh: SNES / Emulator"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as GameStatus)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="PLAYING">Sedang Dimainkan</option>
                    <option value="COMPLETED">Tamat</option>
                    <option value="WISHLIST">Wishlist</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="DROPPED">Dropped</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Genre (Pisahkan Koma)</label>
                  <input
                    type="text"
                    value={manualGenre}
                    onChange={(e) => setManualGenre(e.target.value)}
                    placeholder="JRPG, Adventure"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Tahun Rilis</label>
                  <input
                    type="text"
                    value={manualYear}
                    onChange={(e) => setManualYear(e.target.value)}
                    placeholder="1995"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Developer</label>
                  <input
                    type="text"
                    value={manualDev}
                    onChange={(e) => setManualDev(e.target.value)}
                    placeholder="Square"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Game Manual</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
