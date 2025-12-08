"use client"

import { useEffect, useState } from "react";
import { fetchMovies, MoviesQueryParams } from "../lib/api/movies";
import type { Movie } from "../types/movies";

interface UseMoviesSearchArgs {
  search: string;
  genre?: string;
  page: number;
  limit?: number;
}

interface UseMoviesSearchResult {
  movies: Movie[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export function useMoviesSearch(
  { search, genre, page, limit = 12 }: UseMoviesSearchArgs
): UseMoviesSearchResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      const params: MoviesQueryParams = {
        page,
        limit,
      };

      if (search.trim()) params.search = search.trim();
      if (genre && genre.trim()) params.genre = genre.trim();

      try {
        const result = await fetchMovies(params);

        if (cancelled) return;

        setMovies(result.data);
        setTotalPages(result.totalPages ?? 1);
      } catch (err) {
        if (cancelled) return;
        console.error("useMoviesSearch error", err);
        setError((err as Error).message);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [search, genre, page, limit]);

  return { movies, totalPages, loading, error };
}
