'use client';

import { GameEntry } from '@/types/game';
import { INITIAL_GAMES } from './sampleData';

const STORAGE_KEY = 'game_vault_entries_v1';

export function getStoredGames(): GameEntry[] {
  if (typeof window === 'undefined') return INITIAL_GAMES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GAMES));
      return INITIAL_GAMES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load games from localStorage', e);
    return INITIAL_GAMES;
  }
}

export function saveStoredGames(games: GameEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    // Trigger custom event so reactive components can update
    window.dispatchEvent(new Event('game_vault_updated'));
  } catch (e) {
    console.error('Failed to save games to localStorage', e);
  }
}

export function exportBackup(games: GameEntry[]) {
  const jsonStr = JSON.stringify(games, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `game-vault-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importBackup(file: File, onSuccess: (imported: GameEntry[]) => void, onError: (err: string) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      if (Array.isArray(data)) {
        saveStoredGames(data);
        onSuccess(data);
      } else {
        onError('Format file JSON tidak valid (harus berupa array game).');
      }
    } catch {
      onError('Gagal membaca file JSON. Pastikan file tidak rusak.');
    }
  };
  reader.readAsText(file);
}
