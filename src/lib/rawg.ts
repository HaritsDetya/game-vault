import { RawgGameResult } from '@/types/game';

// Backup database populer untuk pencarian instan tanpa API key atau ketika limit habis
export const FALLBACK_POPULAR_GAMES: RawgGameResult[] = [
  {
    id: 3498,
    name: 'Grand Theft Auto V',
    background_image: 'https://media.rawg.io/media/games/20a/20aa03a10e7208d859e45ee17cb5884a.jpg',
    released: '2013-09-17',
    rating: 4.47,
    genres: [{ id: 4, name: 'Action' }, { id: 3, name: 'Adventure' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 187, name: 'PlayStation 5' } }],
    developers: [{ name: 'Rockstar North' }]
  },
  {
    id: 3328,
    name: 'The Witcher 3: Wild Hunt',
    background_image: 'https://media.rawg.io/media/games/618/618c204facf0e8da603a42f6ad94d0da.jpg',
    released: '2015-05-18',
    rating: 4.65,
    genres: [{ id: 4, name: 'Action' }, { id: 5, name: 'RPG' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 187, name: 'PlayStation 5' } }, { platform: { id: 7, name: 'Nintendo Switch' } }],
    developers: [{ name: 'CD PROJEKT RED' }]
  },
  {
    id: 3272,
    name: 'Elden Ring',
    background_image: 'https://media.rawg.io/media/games/b29/b2960ad9f9d08003a278647cdf14e791.jpg',
    released: '2022-02-25',
    rating: 4.41,
    genres: [{ id: 4, name: 'Action' }, { id: 5, name: 'RPG' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 187, name: 'PlayStation 5' } }],
    developers: [{ name: 'FromSoftware' }]
  },
  {
    id: 5286,
    name: 'Tomb Raider (2013)',
    background_image: 'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925edd63240bc.jpg',
    released: '2013-03-05',
    rating: 4.05,
    genres: [{ id: 4, name: 'Action' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }],
    developers: [{ name: 'Crystal Dynamics' }]
  },
  {
    id: 28,
    name: 'Red Dead Redemption 2',
    background_image: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg',
    released: '2018-10-26',
    rating: 4.58,
    genres: [{ id: 4, name: 'Action' }, { id: 3, name: 'Adventure' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 18, name: 'PlayStation 4' } }],
    developers: [{ name: 'Rockstar Games' }]
  },
  {
    id: 4200,
    name: 'Portal 2',
    background_image: 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d85e0c0683.jpg',
    released: '2011-04-18',
    rating: 4.61,
    genres: [{ id: 7, name: 'Puzzle' }, { id: 2, name: 'Shooter' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }],
    developers: [{ name: 'Valve' }]
  },
  {
    id: 58175,
    name: 'God of War (2018)',
    background_image: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',
    released: '2018-04-20',
    rating: 4.58,
    genres: [{ id: 4, name: 'Action' }, { id: 3, name: 'Adventure' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 18, name: 'PlayStation 4' } }, { platform: { id: 187, name: 'PlayStation 5' } }],
    developers: [{ name: 'Santa Monica Studio' }]
  },
  {
    id: 22509,
    name: 'Minecraft',
    background_image: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg',
    released: '2009-05-10',
    rating: 4.43,
    genres: [{ id: 4, name: 'Action' }, { id: 83, name: 'Platformer' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 7, name: 'Nintendo Switch' } }],
    developers: [{ name: 'Mojang Studios' }]
  },
  {
    id: 12020,
    name: 'Left 4 Dead 2',
    background_image: 'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',
    released: '2009-11-17',
    rating: 4.09,
    genres: [{ id: 4, name: 'Action' }, { id: 2, name: 'Shooter' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }],
    developers: [{ name: 'Valve' }]
  },
  {
    id: 41494,
    name: 'Cyberpunk 2077',
    background_image: 'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c424deaa.jpg',
    released: '2020-12-10',
    rating: 4.15,
    genres: [{ id: 4, name: 'Action' }, { id: 5, name: 'RPG' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 187, name: 'PlayStation 5' } }],
    developers: [{ name: 'CD PROJEKT RED' }]
  },
  {
    id: 290856,
    name: 'Hades',
    background_image: 'https://media.rawg.io/media/games/1f4/1f4dd01d2d0d88b488f557b953b37948.jpg',
    released: '2020-09-17',
    rating: 4.54,
    genres: [{ id: 4, name: 'Action' }, { id: 51, name: 'Indie' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 7, name: 'Nintendo Switch' } }],
    developers: [{ name: 'Supergiant Games' }]
  },
  {
    id: 9767,
    name: 'Hollow Knight',
    background_image: 'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg',
    released: '2017-02-24',
    rating: 4.41,
    genres: [{ id: 4, name: 'Action' }, { id: 51, name: 'Indie' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 7, name: 'Nintendo Switch' } }],
    developers: [{ name: 'Team Cherry' }]
  },
  {
    id: 69550,
    name: 'Baldur\'s Gate 3',
    background_image: 'https://media.rawg.io/media/games/699/699222d81a502178e93b07986ff81615.jpg',
    released: '2023-08-03',
    rating: 4.67,
    genres: [{ id: 5, name: 'RPG' }, { id: 10, name: 'Strategy' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 187, name: 'PlayStation 5' } }],
    developers: [{ name: 'Larian Studios' }]
  },
  {
    id: 3070,
    name: 'Fallout 4',
    background_image: 'https://media.rawg.io/media/games/d82/d82363905c7d079d1d0f6261833bc616.jpg',
    released: '2015-11-10',
    rating: 3.81,
    genres: [{ id: 4, name: 'Action' }, { id: 5, name: 'RPG' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }, { platform: { id: 18, name: 'PlayStation 4' } }],
    developers: [{ name: 'Bethesda Game Studios' }]
  },
  {
    id: 864,
    name: 'Dishonored',
    background_image: 'https://media.rawg.io/media/games/4e0/4e0e7b14d2a1b183636f93d6e50e0477.jpg',
    released: '2012-10-09',
    rating: 4.37,
    genres: [{ id: 4, name: 'Action' }],
    platforms: [{ platform: { id: 4, name: 'PC' } }],
    developers: [{ name: 'Arkane Studios' }]
  }
];

export async function searchGames(query: string, apiKey?: string): Promise<RawgGameResult[]> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  // Jika API key disediakan (dari localStorage atau env), panggil RAWG API
  const activeKey = apiKey || (typeof window !== 'undefined' ? localStorage.getItem('rawg_api_key') : '') || process.env.NEXT_PUBLIC_RAWG_API_KEY;

  if (activeKey) {
    try {
      const res = await fetch(`https://api.rawg.io/api/games?key=${activeKey}&search=${encodeURIComponent(query)}&page_size=10`);
      if (res.ok) {
        const data = await res.json();
        return data.results || [];
      }
    } catch (err) {
      console.warn('RAWG API call failed, falling back to local database:', err);
    }
  }

  // Jika tidak ada API key atau error, filter fallback database
  return FALLBACK_POPULAR_GAMES.filter(g => 
    g.name.toLowerCase().includes(cleanQuery) ||
    g.genres?.some(genre => genre.name.toLowerCase().includes(cleanQuery)) ||
    g.developers?.some(dev => dev.name.toLowerCase().includes(cleanQuery))
  );
}
