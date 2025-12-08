import { fetchMovieById } from '@/lib/api/movies';
import { BackToSearch, PeopleSection, Header, MoviePoster, NotFound } from '@/components'
import type { Movie } from '@/types/movies';

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;

  const movie = (await fetchMovieById(id)) as Movie | null;

    if (!movie) {
    return (
      <NotFound />
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BackToSearch />
        <Header movie={movie} />
        <section className="grid gap-8 md:grid-cols-[minmax(0,260px)_1fr]">
            <div>
                {movie.posterUrl && (
                    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                        <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
                    </div>
                )}
                {movie.genres && movie.genres.length > 0 && (
                <div className="mt-4 flex flex-row">
                    <h2 className="text-sm font-semibold text-slate-200 mb-2">
                        Genres
                    </h2>
                    <div>
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="inline-flex items-center rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs text-slate-200"
                            >
                                {genre.title}
                            </span>
                        ))}
                    </div>
                </div>
                )}
            </div>
            
            <div className="space-y-6">
                {movie.summary && (
                <section>
                    <h2 className="text-lg font-semibold mb-2">Summary</h2>
                    <p className="text-sm leading-relaxed text-slate-200">
                    {movie.summary}
                    </p>
                </section>
                )}
                {movie.directors && movie.directors.length > 0 && (
                    <PeopleSection title="Director(s)" detail={movie.directors.join(", ")} />
                )}
                {movie.mainActors && movie.mainActors.length > 0 && (
                    <PeopleSection title="Main Cast" detail={movie.mainActors.join(", ")} />
                )}
                {movie.writers && movie.writers.length > 0 && (
                    <PeopleSection title="Writer(s)" detail={movie.writers.join(", ")} />
                )}
            </div>
        </section>
      </div>
    </main>
  );
}
