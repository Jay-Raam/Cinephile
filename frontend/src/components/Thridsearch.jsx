"use client";

import React, { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails";
import "../app/styles.css";

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

      // const Api_key = "fbd7090a00msh52179520f334332p1ee1dfjsn452d59a7e987";
      const Api_key = "3ab74181ffmshc94fb6b588a8f4fp1e9595jsnb411756c268d";

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
        setData(result || []);
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

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setData([]);
    setError(null);
  };

  const handleImageClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <h1>Movies List</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div className="pulsar"></div>}
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
                    style={{ width: "100%", height: "auto", cursor: "pointer" }}
                    onClick={() => handleImageClick(movie)}
                  />
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default MovieSearchAndDetails;
