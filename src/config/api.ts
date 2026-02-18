export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://roast-reader.arunvenkat67.workers.dev';

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'original' = 'w500'): string | null => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export const PLACEHOLDER_POSTER = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22750%22%3E%3Crect fill=%22%232a2a3e%22 width=%22500%22 height=%22750%22/%3E%3Ctext x=%22250%22 y=%22375%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2240%22%3ENo Poster%3C/text%3E%3C/svg%3E';
