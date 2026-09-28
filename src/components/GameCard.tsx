'use client';

import React from 'react';
import { GameEntry } from '@/types/game';
import { Star, Clock, BookOpen, CheckSquare, Sparkles } from 'lucide-react';

interface GameCardProps {
  game: GameEntry;
  onClick: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const getStatusBadge = (status: GameEntry['status']) => {
    switch (status) {
      case 'COMPLETED':
        return { label: 'Tamat', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'PLAYING':
        return { label: 'Dimainkan', bg: 'bg-violet-500/20 text-violet-300 border-violet-500/30' };
      case 'WISHLIST':
        return { label: 'Wishlist', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'ON_HOLD':
        return { label: 'On Hold', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'DROPPED':
        return { label: 'Dropped', bg: 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30' };
      default:
        return { label: status, bg: 'bg-zinc-800 text-zinc-400 border-zinc-700' };
    }
  };

  const statusInfo = getStatusBadge(game.status);
  const completedChecklistCount = (game.checklists || []).filter(c => c.completed).length;
  const totalChecklistCount = (game.checklists || []).length;
  const hasWiki = Boolean(game.wikiNotes && game.wikiNotes.trim().length > 0);

  return (
    <div
      onClick={onClick}
      className="group relative bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-zinc-950">
        <img
          src={game.coverImage || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'}
          alt={game.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40" />

        {/* Status Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border backdrop-blur-md ${statusInfo.bg}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Rating Badge */}
        {game.rating > 0 && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{game.rating}</span>
          </div>
        )}

        {/* Wishlist Priority Badge if applicable */}
        {game.status === 'WISHLIST' && game.priority && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-900/90 text-amber-300 border border-amber-500/30">
              Prioritas {game.priority}
            </span>
          </div>
        )}
      </div>

      {/* Card Info Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Platform & Genre */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1.5 line-clamp-1">
            <span className="font-semibold text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-[10px]">
              {game.platform || 'PC'}
            </span>
            {game.releaseYear && <span>• {game.releaseYear}</span>}
            {game.genres && game.genres.length > 0 && (
              <span className="truncate">• {game.genres.slice(0, 2).join(', ')}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Review snippet if exists */}
          {game.review && (
            <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 italic font-light">
              "{game.review}"
            </p>
          )}
        </div>

        {/* Footer Meta (Playtime & Wiki Tag) */}
        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{game.playtimeHours > 0 ? `${game.playtimeHours} Jam` : '-'}</span>
          </div>

          <div className="flex items-center gap-2">
            {hasWiki && (
              <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-medium bg-indigo-500/10 px-1.5 py-0.5 rounded" title="Memiliki Catatan Wiki">
                <BookOpen className="w-3 h-3" />
                <span className="hidden sm:inline">Wiki</span>
              </div>
            )}
            {totalChecklistCount > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded" title="Progress Checklist Quest">
                <CheckSquare className="w-3 h-3" />
                <span>{completedChecklistCount}/{totalChecklistCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
