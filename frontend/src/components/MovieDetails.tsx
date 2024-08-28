import React from "react";
import { Button } from "./ui/button";
import { UndoDot } from "lucide-react";

// Define types for movie and props
interface Movie {
  title: string;
  thumbnail?: string;
  poster?: string;
  writers?: string[];
  directors?: string[];
  year?: number;
  runtime?: number;
  plot?: string;
  genres?: string[];
  cast?: string[];
}

interface MovieDetailsProps {
  movie: Movie;
  handleCloseClick: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  handleCloseClick,
}) => {
  return (
    <div className="w-[100%] h-[100vh] bg-white mx-auto my-0 fixed top-0 left-0 right-0 overflow-y-auto pb-4 max-w-[1550px]">
      <div
        className="hero flex justify-evenly pt-14 pb-14 items-center flex-col md:flex-row gap-2"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="background-blur"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${movie.thumbnail || movie.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(25px)",
            zIndex: -1,
          }}
        ></div>

        <div className="btn-close flex justify-center items-center absolute top-3 md:top-6 left-2 z-50 lg:left-28">
          <span
            onClick={handleCloseClick}
            className="w-10 h-10 bg-[#cde41e] text-white rounded-full flex justify-center items-center cursor-pointer"
          >
            <UndoDot className="text-[12px]" />
          </span>
        </div>

        <div className="content relative z-10 flex justify-center flex-col items-center text-black md:flex-row gap-4 md:gap-7">
          <div className="image">
            {movie.thumbnail || movie.poster ? (
              <img
                src={movie.thumbnail || movie.poster}
                alt={movie.title}
                style={{ width: "300px", height: "auto" }}
              />
            ) : null}
          </div>
          <div className="text flex flex-col items-center">
            <h1 className="text-3xl text-center">{movie.title}</h1>
            {movie.directors && (
              <h3 className="text-2xl text-center">{movie.directors[0]}</h3>
            )}
            {movie.year && <p className="text-xl text-center">{movie.year}</p>}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Display Title and Year */}
        <h1 className="text-2xl font-bold mb-2 text-black">{movie.title}</h1>
        <p className="text-gray-600 mb-4">{`Year: ${movie.year}`}</p>

        {/* Display Extract */}
        {movie.plot && <p className="text-gray-800 mb-4">{movie.plot}</p>}
        {movie.writers && movie.writers.length > 0 && (
          <p className="text-gray-600">
            <strong>Writers:</strong> {movie.writers.join(", ")}
          </p>
        )}
        {/* Display Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <p className="text-gray-600 mb-4">
            <strong>Genres:</strong> {movie.genres.join(", ")}
          </p>
        )}

        {/* Display Cast */}
        {movie.cast && movie.cast.length > 0 && (
          <p className="text-gray-600">
            <strong>Cast:</strong> {movie.cast.join(", ")}
          </p>
        )}
      </div>

      <div className="btn flex justify-center items-center">
        <Button onClick={handleCloseClick} className="w-[200px] rounded-full">
          Close
        </Button>
      </div>
    </div>
  );
};

export default MovieDetails;
