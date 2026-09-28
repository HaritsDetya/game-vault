export type GameStatus = 'PLAYING' | 'COMPLETED' | 'WISHLIST' | 'ON_HOLD' | 'DROPPED';

export type GamePriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface WikiChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface GameEntry {
  id: string;
  rawgId?: number;
  title: string;
  coverImage: string;
  backdropImage?: string;
  status: GameStatus;
  platform: string;
  rating: number; // 0 (unrated) or 1-10
  playtimeHours: number;
  startDate?: string;
  finishDate?: string;
  review?: string;
  priority?: GamePriority;
  genres: string[];
  releaseYear?: string;
  developer?: string;
  wikiNotes?: string;
  checklists: WikiChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface RawgGameResult {
  id: number;
  name: string;
  background_image?: string;
  released?: string;
  rating?: number;
  genres?: { id: number; name: string }[];
  platforms?: { platform: { id: number; name: string } }[];
  developers?: { name: string }[];
  description_raw?: string;
}
