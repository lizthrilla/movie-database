"use client";

import { FormEvent, useState } from 'react';
import { useGenres, useMoviesSearch } from '@/hooks';
import { Error, GenreDropDown, LimitSelection, Loading, MovieCard, Pagination, SearchBar } from '@/components'



export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12)

  const { movies, totalPages, loading, error } = useMoviesSearch({
    search: searchQuery,
    genre,
    page,
    limit,
  });

  const { genres, loading: genresLoading, error: genresError } = useGenres()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchInput);
  };

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => (p < totalPages ? p + 1 : p));
  };

  const handleGenreSelection = (value: string) => {
    setGenre(value);
    setPage(1);
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Movie search</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:flex-row md:items-end mb-8"
        >
          <SearchBar
            label="Serach by title" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} 
            placeholder="e.g. Alien"
          />
          <GenreDropDown value={genre} onChange={(e) => handleGenreSelection(e.target.value)} genres={genres} genreLoading={genresLoading} genresError={genresError} />
          <LimitSelection value={limit} onChange={handleLimitChange} />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:opacity-60"
          >
            Search
          </button>
        </form>

        {loading && <Loading />}
        {error && (<Error error={error} />)}

        {!loading && !error && movies.length === 0 && (
          <p className="text-sm text-slate-300">
            No movies found. Try a different search or genre.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        {movies.length > 0 && (
          <Pagination page={page} totalPages={totalPages} loading={loading} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
        )}
        
      </div>
    </main>
  );
}
