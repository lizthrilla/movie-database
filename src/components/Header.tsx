import DetailLabel from './DetailLabel'
import type { Movie } from '@/types/movies'

interface HeaderProps {
    movie: Movie
}


export default function Header({movie}: HeaderProps) {
    return (
         <header className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">{movie.title}</h1>

          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            {movie.rating && (<DetailLabel detail={movie.rating} label="Rating:" />)}
            {movie.duration && (<DetailLabel detail={movie.duration.replace("PT", "")} label="Duration:" />)}
            {movie.datePublished && (<DetailLabel detail={movie.datePublished} label="Released:" />)}
            {movie.ratingValue != null && typeof movie.ratingValue === "number" && (
              <DetailLabel detail={movie.ratingValue} label="Score:" />
            )}
          </div>
        </header>
    )
}