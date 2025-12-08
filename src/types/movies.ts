// src/types/movies.ts

export interface Genre {
  id: string;
  title: string; // from the single-movie response
}

export interface Movie {
  id: string;
  title: string;
  posterUrl?: string | null;
  rating?: string | null;
  summary?: string | null;
  duration?: string | null;
  directors?: string[] | null;
  mainActors?: string[] | null;
  datePublished?: string | null;
  ratingValue?: number | null;
  bestRating?: number | null;
  worstRating?: number | null;
  writers?: string[] | null;
  genres?: Genre[] | null;
}

export interface MoviesResponse {
  data: Movie[];
  totalPages: number;
}

export interface MovieTitle {
  id: string;
  title: string;
}

export interface MovieTitlesResponse {
  data: MovieTitle[];
  totalPages: number;
}
