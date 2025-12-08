import { apiGet } from "./client"
import type { Movie, MoviesResponse } from "@/types/movies"

export interface MoviesQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    genre?: string;
}

export async function fetchMovies(params: MoviesQueryParams = {}) {
  return apiGet<MoviesResponse>("/movies", {
    page: params.page ?? 1,
    limit: params.limit ?? 25,
    search: params.search,
    genre: params.genre,
  });
}

export async function fetchMovieById(id: string) {
  return apiGet<Movie>(`/movies/${id}`);
}