export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  popularity: number;
  status: string;
  adult: boolean;
  budget: number;
  revenue: number;
  imdb_id: string | null;
  homepage: string | null;
  origin_country: string[];
  original_language: string;
}

export interface Roast {
  headline: string;
  content: string;
  internet_vibe: string[];
  your_opinion: string;
  recommendation: string[];
}

export interface RoastItem {
  movie: Movie;
  roast: Roast;
  generated_at: string;
  disclaimer: string;
  truth_source: string;
  truth_fetched_at: string;
}

export interface RoastResponse {
  items: RoastItem[];
  count: number;
  from: string;
  to: string;
}
