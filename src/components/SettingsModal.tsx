'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GameEntry } from '@/types/game';
import { exportBackup, importBackup, saveStoredGames } from '@/lib/storage';
import { INITIAL_GAMES } from '@/lib/sampleData';
import { X, Key, Download, Upload, RefreshCw, Check, AlertCircle, ExternalLink, Cloud } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: GameEntry[];
  onRefreshData: (newGames: GameEntry[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  games,
  onRefreshData
}) => {
  if (!isOpen) return null;

  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const existing = localStorage.getItem('rawg_api_key') || '';
    setApiKey(existing);
  }, []);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('rawg_api_key', apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExport = () => {
    exportBackup(games);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importBackup(
        file,
        (imported) => {
          onRefreshData(imported);
          alert(`Berhasil mengimpor ${imported.length} data game!`);
          onClose();
        },
        (err) => {
          alert(`Error: ${err}`);
        }
      );
    }
  };

  const handleResetSample = () => {
    if (window.confirm('Kembalikan ke data contoh bawaan? Seluruh perubahan saat ini akan diganti dengan sample data.')) {
      saveStoredGames(INITIAL_GAMES);
      onRefreshData(INITIAL_GAMES);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-6">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Pengaturan Vault & Cloud Sync</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 text-sm text-zinc-300 overflow-y-auto max-h-[80vh]">
          {/* RAWG API Key section */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Key className="w-4 h-4 text-indigo-400" />
              <h4>RAWG Game Metadata API Key</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kunci API gratis dari RAWG digunakan untuk mencari jutaan judul game, mengambil cover poster, developer, dan tanggal rilis otomatis.
            </p>
            <form onSubmit={handleSaveApiKey} className="flex gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Masukkan RAWG API Key Anda..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : 'Simpan'}
              </button>
            </form>
            <a
              href="https://rawg.io/apidocs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline pt-1"
            >
              <span>Belum punya key? Dapatkan gratis di rawg.io/apidocs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Backup & Restore */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Download className="w-4 h-4 text-emerald-400" />
              <h4>Backup & Restore Data Pribadi</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unduh salinan seluruh riwayat game, ulasan, dan catatan wiki Anda sebagai file JSON untuk disimpan secara aman atau dipindahkan ke perangkat lain.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleExport}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Backup (.JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Import / Restore (.JSON)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Cloud Info & Reset */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Cloud className="w-4 h-4 text-blue-400" />
              <h4>Koneksi Cloud & Hosting Vercel</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Platform ini siap di-deploy langsung ke Vercel atau Supabase PostgreSQL. Anda dapat membuka repository GitHub proyek ini dan menghubungkannya dengan sekali klik di vercel.com.
            </p>

            <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Reset Data Demo:</span>
              <button
                type="button"
                onClick={handleResetSample}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset ke Sample Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
