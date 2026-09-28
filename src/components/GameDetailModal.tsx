'use client';

import React, { useState } from 'react';
import { GameEntry, GameStatus, GamePriority } from '@/types/game';
import { 
  X, Star, Trash2, Save, Calendar, Clock, 
  Gamepad2, BookOpen, CheckSquare, Plus, ExternalLink, Flame, Trophy, BookmarkCheck, FileText
} from 'lucide-react';

interface GameDetailModalProps {
  game: GameEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedGame: GameEntry) => void;
  onDelete: (id: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  if (!isOpen || !game) return null;

  const [activeTab, setActiveTab] = useState<'TRACKER' | 'WIKI'>('TRACKER');
  
  // Local state for editing
  const [status, setStatus] = useState<GameStatus>(game.status);
  const [platform, setPlatform] = useState<string>(game.platform || 'PC');
  const [rating, setRating] = useState<number>(game.rating || 0);
  const [playtimeHours, setPlaytimeHours] = useState<number>(game.playtimeHours || 0);
  const [startDate, setStartDate] = useState<string>(game.startDate || '');
  const [finishDate, setFinishDate] = useState<string>(game.finishDate || '');
  const [review, setReview] = useState<string>(game.review || '');
  const [priority, setPriority] = useState<GamePriority>(game.priority || 'MEDIUM');
  
  // Wiki state
  const [wikiNotes, setWikiNotes] = useState<string>(game.wikiNotes || '');
  const [checklists, setChecklists] = useState(game.checklists || []);
  const [newChecklistText, setNewChecklistText] = useState('');

  const handleSave = () => {
    const updated: GameEntry = {
      ...game,
      status,
      platform,
      rating,
      playtimeHours: Number(playtimeHours) || 0,
      startDate: startDate || undefined,
      finishDate: finishDate || undefined,
      review: review.trim() || undefined,
      priority: status === 'WISHLIST' ? priority : undefined,
      wikiNotes,
      checklists,
      updatedAt: new Date().toISOString()
    };
    onSave(updated);
    onClose();
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    setChecklists([
      ...checklists,
      {
        id: `check-${Date.now()}`,
        text: newChecklistText.trim(),
        completed: false
      }
    ]);
    setNewChecklistText('');
  };

  const toggleChecklist = (id: string) => {
    setChecklists(
      checklists.map(c => c.id === id ? { ...c, completed: !c.completed } : c)
    );
  };

  const removeChecklist = (id: string) => {
    setChecklists(checklists.filter(c => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Header Backdrop Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-950 shrink-0">
          <img
            src={game.backdropImage || game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover object-center filter brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/70 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Base Meta */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {game.developer && (
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                    {game.developer}
                  </span>
                )}
                {game.releaseYear && (
                  <span className="text-xs text-zinc-400">Rilis {game.releaseYear}</span>
                )}
                {game.genres && game.genres.length > 0 && (
                  <span className="text-xs text-zinc-400">• {game.genres.join(', ')}</span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight line-clamp-1">
                {game.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/40 px-6 shrink-0">
          <button
            onClick={() => setActiveTab('TRACKER')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'TRACKER'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Progress & Review</span>
          </button>

          <button
            onClick={() => setActiveTab('WIKI')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'WIKI'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Personal Wiki & Quest ({checklists.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-200">
          {activeTab === 'TRACKER' ? (
            <div className="space-y-5">
              {/* Status and Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Status Progres
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as GameStatus)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 font-medium focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="PLAYING">Sedang Dimainkan (Playing)</option>
                    <option value="COMPLETED">Tamat (Completed)</option>
                    <option value="WISHLIST">Rencana Main (Wishlist)</option>
                    <option value="ON_HOLD">Ditunda (On Hold)</option>
                    <option value="DROPPED">Ditinggalkan (Dropped)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Platform Bermain
                  </label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Contoh: PC (Steam), PS5, Nintendo Switch"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Rating & Playtime */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Rating Pribadi: {rating > 0 ? `${rating} / 10` : 'Belum dinilai'}
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setRating(starNum === rating ? 0 : starNum)}
                        className={`w-7 h-8 rounded-lg text-xs font-bold transition-all ${
                          rating >= starNum
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-zinc-950 text-zinc-500 border border-zinc-800 hover:bg-zinc-800'
                        }`}
                      >
                        {starNum}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Estimasi Jam Bermain
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="0"
                      value={playtimeHours}
                      onChange={(e) => setPlaytimeHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-zinc-100 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Wishlist Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Tanggal Mulai Bermain
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-200 focus:border-indigo-500 focus:outline-none text-xs"
                  />
                </div>

                {status === 'COMPLETED' ? (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Tanggal Tamat
                    </label>
                    <input
                      type="date"
                      value={finishDate}
                      onChange={(e) => setFinishDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-200 focus:border-indigo-500 focus:outline-none text-xs"
                    />
                  </div>
                ) : status === 'WISHLIST' ? (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Prioritas Wishlist
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as GamePriority)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-200 focus:border-indigo-500 focus:outline-none text-xs"
                    >
                      <option value="HIGH">Tinggi (Segera beli/mainkan)</option>
                      <option value="MEDIUM">Sedang (Menunggu diskon)</option>
                      <option value="LOW">Rendah (Arsip)</option>
                    </select>
                  </div>
                ) : null}
              </div>

              {/* Review / Personal Notes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Ulasan & Kesan Pribadi
                </label>
                <textarea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tulis ulasan Anda, kesan bermain cerita, gameplay, grafik, atau kekurangan game ini..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-zinc-100 focus:border-indigo-500 focus:outline-none text-xs sm:text-sm leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quest / Target Checklist */}
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">Target Misi & Checklist Trophy</h4>
                  </div>
                  <span className="text-xs text-zinc-400">
                    {checklists.filter(c => c.completed).length} dari {checklists.length} tercapai
                  </span>
                </div>

                {/* Add Checklist Form */}
                <form onSubmit={handleAddChecklist} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    placeholder="Tambah target quest baru (misal: Selesaikan secret dungeon)..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah</span>
                  </button>
                </form>

                {/* Checklist List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {checklists.length === 0 ? (
                    <p className="text-xs text-zinc-500 italic py-2 text-center">
                      Belum ada target misi. Tambahkan checklist untuk men-track target pribadi Anda!
                    </p>
                  ) : (
                    checklists.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                      >
                        <label className="flex items-center gap-3 cursor-pointer flex-1 text-xs sm:text-sm">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleChecklist(item.id)}
                            className="w-4 h-4 rounded border-zinc-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-zinc-950 cursor-pointer"
                          />
                          <span className={item.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}>
                            {item.text}
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => removeChecklist(item.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          title="Hapus checklist"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Wiki Notes Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Dokumentasi Wiki & Panduan Game (Markdown)</span>
                  </label>
                  <span className="text-[11px] text-zinc-500">Mendukung format Markdown</span>
                </div>
                <textarea
                  rows={9}
                  value={wikiNotes}
                  onChange={(e) => setWikiNotes(e.target.value)}
                  placeholder={`### Panduan Build & Strategi\n- Tulis catatan senjata/armor terbaik\n- Tips melawan bos sulit\n- Catatan rahasia/lokasi item penting\n- Lore atau rangkuman cerita penting`}
                  className="w-full font-mono bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-zinc-200 focus:border-indigo-500 focus:outline-none text-xs sm:text-sm leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Hapus game "${game.title}" dari vault Anda?`)) {
                onDelete(game.id);
                onClose();
              }
            }}
            className="px-3.5 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Hapus Game</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
