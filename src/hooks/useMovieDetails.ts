"use client";

import { useEffect, useState } from 'react';
import { fetchMovieById } from '@/lib/api/movies';
import type { Movie } from '@/types/movies';

interface UseMovieDetailsResult {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

export function useMovieDetails(id?: string): UseMovieDetailsResult {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setMovie(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchMovieById(id!);
        if (!cancelled) {
          setMovie(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
          setMovie(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { movie, loading, error };
}
