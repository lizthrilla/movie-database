"use client";

import { useEffect, useState } from "react";
import { fetchGenreNames } from "../lib/api/genres";

export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const names = await fetchGenreNames();
        if (!cancelled) setGenres(names);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { genres, loading, error };
}
