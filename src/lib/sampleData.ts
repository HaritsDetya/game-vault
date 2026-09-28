import { GameEntry } from '@/types/game';

export const INITIAL_GAMES: GameEntry[] = [
  {
    id: 'sample-1',
    rawgId: 3328,
    title: 'The Witcher 3: Wild Hunt',
    coverImage: 'https://media.rawg.io/media/games/618/618c204facf0e8da603a42f6ad94d0da.jpg',
    backdropImage: 'https://media.rawg.io/media/games/618/618c204facf0e8da603a42f6ad94d0da.jpg',
    status: 'COMPLETED',
    platform: 'PC',
    rating: 10,
    playtimeHours: 125,
    startDate: '2023-01-10',
    finishDate: '2023-03-15',
    review: 'Salah satu RPG terbaik sepanjang masa. Cerita ekspansi Blood and Wine luar biasa indah dan memuaskan.',
    genres: ['Action', 'RPG', 'Open World'],
    releaseYear: '2015',
    developer: 'CD PROJEKT RED',
    wikiNotes: `### Catatan Build Geralt (Euphoria Alchemy)
- **Armor:** Grandmaster Feline Set (DPS tinggi).
- **Mutagen:** Euphoria (+Damage berdasarkan Toxicity).
- **Decoction Favorit:** Ekimmara + Water Hag + Ekhidna.
- **Strategi Bos:** Gunakan Quen aktif, oleskan Hanged Man's Venom untuk humanoid.`,
    checklists: [
      { id: 'c1', text: 'Kumpulkan semua Grandmaster Witcher Gear', completed: true },
      { id: 'c2', text: 'Selesaikan turnamen Gwent di Novigrad (Passiflora)', completed: true },
      { id: 'c3', text: 'Kalahkan Dettlaff di tingkat kesulitan Death March', completed: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sample-2',
    rawgId: 3272,
    title: 'Elden Ring',
    coverImage: 'https://media.rawg.io/media/games/b29/b2960ad9f9d08003a278647cdf14e791.jpg',
    backdropImage: 'https://media.rawg.io/media/games/b29/b2960ad9f9d08003a278647cdf14e791.jpg',
    status: 'PLAYING',
    platform: 'PC',
    rating: 9,
    playtimeHours: 68,
    startDate: '2024-05-01',
    review: 'Eksplorasi yang sangat memuaskan, setiap sudut map selalu ada reward dan boss tersembunyi.',
    genres: ['Action', 'RPG', 'Souls-like'],
    releaseYear: '2022',
    developer: 'FromSoftware',
    wikiNotes: `### Build Status: Dex/Arcane Bleed
- **Senjata Utama:** Rivers of Blood +10 & Uchigatana (Seppuku).
- **Talisman:** Lord of Blood's Exultation, Rotten Winged Sword Insignia.
- **Lokasi Bell Bearing Smithing Stone:**
  - Miner's Bell Bearing [3]: Zamor Ruins (Mountaintops).
  - Miner's Bell Bearing [4]: Crumbling Farum Azula.`,
    checklists: [
      { id: 'er1', text: 'Kalahkan Malenia, Blade of Miquella di Haligtree', completed: false },
      { id: 'er2', text: 'Selesaikan quest Ranni the Witch (Age of the Stars)', completed: true },
      { id: 'er3', text: 'Eksplorasi Underground Mohgwyn Palace', completed: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sample-3',
    rawgId: 41494,
    title: 'Cyberpunk 2077',
    coverImage: 'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c424deaa.jpg',
    backdropImage: 'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c424deaa.jpg',
    status: 'COMPLETED',
    platform: 'PC',
    rating: 9,
    playtimeHours: 85,
    startDate: '2023-09-25',
    finishDate: '2023-11-12',
    review: 'Update 2.0 dan Phantom Liberty mengubah game ini menjadi mahakarya cyberpunk.',
    genres: ['Action', 'RPG', 'Sci-Fi'],
    releaseYear: '2020',
    developer: 'CD PROJEKT RED',
    wikiNotes: `### Panduan Ending Dogtown (Phantom Liberty)
- Simpan Songbird atau serahkan ke Reed mempengaruhi hadiah Cyberware khusus.
- **Cyberware:** Militech "Falcon" Sandevistan + Gorilla Arms.`,
    checklists: [
      { id: 'cp1', text: 'Selesaikan DLC Phantom Liberty', completed: true },
      { id: 'cp2', text: 'Dapatkan secret ending "Don\'t Fear The Reaper"', completed: true },
      { id: 'cp3', text: 'Koleksi semua mobil Rayfield (Aerondight & Caliburn)', completed: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sample-4',
    rawgId: 69550,
    title: 'Baldur\'s Gate 3',
    coverImage: 'https://media.rawg.io/media/games/699/699222d81a502178e93b07986ff81615.jpg',
    backdropImage: 'https://media.rawg.io/media/games/699/699222d81a502178e93b07986ff81615.jpg',
    status: 'WISHLIST',
    platform: 'PC',
    rating: 0,
    playtimeHours: 0,
    priority: 'HIGH',
    review: 'Rencana dimainkan saat liburan panjang akhir tahun. Ingin coba class Bard atau Paladin Oathbreaker.',
    genres: ['RPG', 'Turn-Based', 'Strategy'],
    releaseYear: '2023',
    developer: 'Larian Studios',
    wikiNotes: `### Rencana Playthrough:
- Ingin mencoba rute Dark Urge dengan karakter tipe Charisma.
- Rencana komposisi party: Shadowheart, Karlach, Astarion.`,
    checklists: [
      { id: 'bg1', text: 'Beli game saat diskon Steam', completed: false },
      { id: 'bg2', text: 'Setup mod kustomisasi wajah/rambut', completed: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
