"use client"
import React from "react"
import Link from "next/link"
import MoviePoster from './MoviePoster'
import type { Movie } from "@/types/movies"

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link
            href={`/movies/${movie.id}`}
            className="text-sm font-semibold hover:underline"
        >
            <article className="rounded-lg bg-slate-800 border border-slate-700 overflow-hidden">
                {movie.posterUrl && (
                    <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
                )}

                <div className="p-3">
                    <h2 className="text-sm font-semibold mb-1">
                        {movie.title}
                    </h2>
                    {movie.rating && (
                    <p className="text-xs text-slate-400">
                        Rating: {movie.rating}
                    </p>
                    )}
                </div>
            </article>
        </Link>
    )
}