import { apiGet } from "./client";
import type { MovieTitlesResponse } from "../../types/movies";

export interface MovieTitlesQueryParams {
  page?: number;
  limit?: number;
}

export function fetchMovieTitles(params: MovieTitlesQueryParams = {}) {
  return apiGet<MovieTitlesResponse>("/movies/titles", {
    page: params.page ?? 1,
    limit: params.limit ?? 25,
  });
}