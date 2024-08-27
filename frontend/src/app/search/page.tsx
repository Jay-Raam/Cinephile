"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MovieDetails from "@/components/MovieDetails";
import ProtectedRoute from "@/components/ProtectedRoute";
import "../styles.css";

// Define types for movie and API response
interface Movie {
  _id: string;
  title: string;
  poster?: string;
  thumbnail?: string;
  year?: number;
}

interface FetchMoviesResponse {
  movies: Movie[];
  totalPages: number;
}

const MovieSearch: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = async (page: number = 1): Promise<void> => {
    setLoading(true);
    setError(null); // Clear previous error
    try {
      const response = await fetch(
        `http://localhost:3001/movies?title=${encodeURIComponent(
          title
        )}&page=${page}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: FetchMoviesResponse = await response.json();

      // Ensure data structure is as expected
      const moviesData = Array.isArray(data.movies) ? data.movies : [];
      if (moviesData.length === 0) {
        setError("No movies found");
      }
      setMovies((prevMovies) =>
        page === 1 ? moviesData : [...prevMovies, ...moviesData]
      );
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title) {
      fetchMovies(1);
    }
  }, [title]);

  const handleNext = (): void => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleImageClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <ProtectedRoute>
        <div className="movie-search mt-5 pb-3">
          <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
            <Input
              type="text"
              className="w-[300px] md:w-[500px]"
              value={title}
              onChange={handleInputChange}
              placeholder="Search for movies..."
              autoFocus={true}
            />
            <Button variant="ghost">Search</Button>
          </div>
          {loading && <div className="pulsar"></div>}
          {error && (
            <p className="text-red-500 flex justify-center items-center mt-7">
              Error: {error}
            </p>
          )}
          {!loading && movies.length === 0 && !error && (
            <p className="text-red-500 flex justify-center items-center mt-7">
              No movies found
            </p>
          )}
          <ul className="max-w-[1200px] mx-auto my-0 flex justify-center items-center flex-wrap mt-3 gap-3">
            {Array.isArray(movies) &&
              movies.length > 0 &&
              movies.map((movie) => (
                <li
                  key={movie._id}
                  className="flex justify-start items-center gap-3 flex-col w-[300px]"
                >
                  {movie.poster && (
                    <img
                      src={movie.poster || "https://placehold.co/200x270/png"}
                      alt={movie.title}
                      width="200"
                      onClick={() => handleImageClick(movie)}
                    />
                  )}
                  {movie.thumbnail && (
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      width="200"
                      onClick={() => handleImageClick(movie)}
                    />
                  )}
                  <h2>{movie.title}</h2>
                  {movie.year && <p>Year {movie.year}</p>}
                </li>
              ))}
          </ul>
          {page < totalPages && !loading && (
            <div className="next flex justify-center items-center mt-5">
              <Button variant={"outline"} onClick={handleNext}>
                Next
              </Button>
            </div>
          )}
        </div>

        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            handleCloseClick={handleCloseClick}
          />
        )}
      </ProtectedRoute>
    </>
  );
};

export default MovieSearch;
