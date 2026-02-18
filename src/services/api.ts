import type { FeedResponse, FeedType, Movie } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

export const getImageUrl = (path: string | null | undefined, size: 'w154' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

interface FetchFeedParams {
  type: FeedType;
  limit?: number;
  cursor?: string;
}

export const fetchFeed = async ({ type, limit = 10, cursor }: FetchFeedParams): Promise<FeedResponse> => {
  const url = new URL(`${BASE_URL}/${type}`);
  url.searchParams.append('limit', limit.toString());
  if (cursor) url.searchParams.append('cursor', cursor);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} feed`);
  }
  return response.json();
};

export const fetchMovie = async (id: number): Promise<Movie> => {
  const url = new URL(`${BASE_URL}/movie/${id}`);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};
