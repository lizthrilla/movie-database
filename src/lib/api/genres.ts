import { apiGet } from "./client";

export interface MoviesByGenreItem {
  id: string;
  title: string;
  movieIds: string[];
}

export interface MoviesByGenreResponse {
  data: MoviesByGenreItem[];
  totalPages: number;
}

export interface GenreMoviesQueryParams {
  page?: number;
  limit?: number;
}

export function fetchGenresWithMovies(params: GenreMoviesQueryParams = {}) {
  return apiGet<MoviesByGenreResponse>("/genres/movies", {
    page: params.page ?? 1,
    limit: params.limit ?? 25,
  });
}

export async function fetchGenreNames(): Promise<string[]> {
  const { data } = await fetchGenresWithMovies({ page: 1, limit: 1000 });
  const genres = data.map((item) => item.title);
  return Array.from(new Set(genres)).sort();
}

export interface GenreStats {
  id?: string;
  title?: string;
  totalMovies?: number;
}

export function fetchGenreStats(id: string) {
  return apiGet<GenreStats>(`/movies/genres/${id}`);
}