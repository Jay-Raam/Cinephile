"use client";

import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const MovieSearchAndDetails = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("Harry Potter");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=in&title=${encodeURIComponent(
        query
      )}&series_granularity=show&show_type=movie&output_language=en`;

      const Api_key = "fbd7090a00msh52179520f334332p1ee1dfjsn452d59a7e987";

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": Api_key,
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result || []); // Ensure you're accessing the correct property
      } catch (error) {
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(query.trim());
  };

  const handleImageClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <ProtectedRoute>
        <h1>Movies List</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="submit">Search</button>
        </form>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        {selectedMovie ? (
          <MovieDetails
            movie={selectedMovie}
            handleCloseClick={handleCloseClick}
          />
        ) : (
          data.length > 0 && (
            <ul className="flex justify-center items-center max-w-[1200px] mx-auto my-0 flex-wrap">
              {data.map((movie) => (
                <li key={movie.id} className="flex justify-center items-center">
                  {movie.imageSet && movie.imageSet.verticalPoster && (
                    <img
                      src={movie.imageSet.verticalPoster.w360}
                      alt={movie.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(movie)}
                    />
                  )}
                </li>
              ))}
            </ul>
          )
        )}
      </ProtectedRoute>
    </>
  );
};

const MovieDetails = ({ movie, handleCloseClick }) => (
  <div className="movie-details">
    <h2>{movie.title}</h2>
    <button onClick={handleCloseClick}>Close</button>
    {/* Display more details about the movie here */}
  </div>
);

export default MovieSearchAndDetails;
