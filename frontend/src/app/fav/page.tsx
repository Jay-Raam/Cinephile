// app/page.tsx

import FavoriteCarousel from "@/components/FavoriteCarousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Movie {
  _id: string;
  image: string;
  userId: string;
}

interface FavoriteMoviesProps {
  favorites: Movie[];
  allFavorites: Movie[];
  error: string | null;
}

const FavoriteMovies = async (): Promise<JSX.Element> => {
  let favorites: Movie[] = [];
  let allFavorites: Movie[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(
      "https://cinephile-server-jay.vercel.app/movies/favorites",
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Movie[] = await response.json();
    favorites = data.slice(19, 27);
    allFavorites = data;
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <>
      <div className="fav-carousel">
        {error && <div>Error: {error}</div>}
        <FavoriteCarousel movies={favorites} />
      </div>
      <div className="all-movies mt-2 pb-3">
        {allFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1550px] mx-auto my-0">
            {allFavorites.map((movie) => (
              <Card
                key={movie._id}
                className="shadow-none rounded-none border-0 bg-transparent"
              >
                <CardContent className="flex items-center justify-center p-0">
                  <Image
                    src={movie.image}
                    alt="Favorite movie"
                    width={500}
                    height={300}
                    quality={100}
                    priority={true}
                    style={{ cursor: "pointer", objectFit: "cover" }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>No movies available.</div>
        )}
      </div>
    </>
  );
};

export default FavoriteMovies;
