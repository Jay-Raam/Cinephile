"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const MovieSearch = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://cinephile-server-jay.vercel.app/movies?title=${encodeURIComponent(
          title
        )}&page=${page}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Ensure data structure is as expected
      const moviesData = Array.isArray(data.movies) ? data.movies : [];
      setMovies((prevMovies) =>
        page === 1 ? moviesData : [...prevMovies, ...moviesData]
      );
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title) {
      fetchMovies(1);
    }
  }, [title]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="flex justify-center items-center gap-4">
        <Input
          type="text"
          className="w-2/4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search for movies..."
          autoFocus={true}
        />
        <Button variant="ghost">Search</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {Array.isArray(movies) &&
          movies.length > 0 &&
          movies.map((movie) => (
            <li key={movie._id}>
              <h2>{movie.title}</h2>
              {movie.poster && (
                <img src={movie.poster} alt={movie.title} width="200" />
              )}
              {movie.thumbnail && (
                <img src={movie.thumbnail} alt={movie.title} width="200" />
              )}
              {movie.year && <p>Year {movie.year}</p>}
            </li>
          ))}
      </ul>
      {page < totalPages && !loading && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default MovieSearch;
