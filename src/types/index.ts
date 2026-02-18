export interface Roast {
  headline: string;
  chips: string[];
  body?: string; // API field
  roast?: string; // Design mapped field
  reception?: {
    label: string;
    bars: number;
  };
  overview?: string; // The Logic
  similar_movies?: string[];
  shareable_caption?: string;
}

export interface StreamingProvider {
  id: number;
  name: string;
  logo: string;
  type: string;
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number; // Use this if bars is missing
  popularity: number;
  roast: Roast;
  streaming_providers: StreamingProvider[];
  generated_at?: string;
}

export interface FeedResponse {
  section: string;
  limit: number;
  next_cursor: string | null;
  hasMore: boolean;
  movies: Movie[];
}

export type FeedType = 'latest' | 'popular';
