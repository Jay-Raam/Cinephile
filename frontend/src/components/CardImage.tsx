"use client";
import React, { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails";
import Image from "next/image";
import "../app/styles.css";

// Define types for movie data
interface Movie {
  _id: string;
  title: string;
  poster?: string;
  thumbnail?: string;
  year?: number;
}

interface FetchMoviesResponse {
  movies: Movie[];
}

// Define props interface
interface MovieSearchProps {
  title: string;
}

const CardImage: React.FC<MovieSearchProps> = ({ title }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Fetch movies based on the title prop
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://cinephile-server-jay.vercel.app/movies?title=${encodeURIComponent(
          title
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data: FetchMoviesResponse = await response.json();

      // Limit to the first eight movies
      setMovies(data.movies.slice(0, 8) || []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title) fetchMovies();
  }, [title]);

  const handleImageClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="overflow-x-auto max-w-[1550px] mx-auto my-0">
      {loading && <div className="pulsar"></div>}
      {error && <p>Error: {error}</p>}
      <ul className="flex justify-center w-full items-center flex-col gap-4 flex-wrap md:flex-row lg:flex-nowrap">
        {movies.map((movie) => {
          const imageSrc = movie.poster || movie.thumbnail;
          if (!imageSrc) return null;
          return (
            <li
              key={movie._id}
              className="cursor-pointer flex justify-center items-center"
            >
              <Image
                src={imageSrc}
                alt={movie.title}
                width={300}
                height={300}
                onClick={() => handleImageClick(movie)}
              />
            </li>
          );
        })}
      </ul>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          handleCloseClick={handleCloseClick}
        />
      )}
    </div>
  );
};

export default CardImage;
