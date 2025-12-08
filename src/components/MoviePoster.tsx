"use client"
import Image from "next/image"

interface PosterProps {
    posterUrl: string;
    title: string; 
}
export default function MoviePoster({posterUrl, title}: PosterProps) {
    return (
        <Image
            src={posterUrl}
            alt={title}
            className="w-full h-64 object-cover"
            width="100"
            height="100"
        />
    )
}