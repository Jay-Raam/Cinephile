import CartImage from "@/components/CardImage";
import FavoriteCarousel from "@/components/FavoriteCarousel";

interface Movie {
  _id: string;
  image: string;
}
interface FavoriteMoviesState {
  favorites: Movie[];
  error: string | null;
}

const LandingHome = async (): Promise<JSX.Element> => {
  let favorites: Movie[] = [];
  let error: string | null = null;

  try {
    const response = await fetch("http://localhost:3001/movies/favorites", {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Movie[] = await response.json();
    favorites = data.slice(18, 25);
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <>
      {error && <p>{error}</p>}
      <FavoriteCarousel movies={favorites} />

      <div className="movie-list mt-5 flex justify-center items-center gap-4 flex-col pb-4">
        <h1 className="text-3xl">Harry Potter</h1>
        <CartImage title="Harry Potter" />
        <h1 className="text-3xl">love</h1>
        <CartImage title="love" />
        <h1 className="text-3xl">Pirates of the Caribbean</h1>
        <CartImage title="Pirates of the Caribbean" />
        <h1 className="text-3xl">Jurassic Park</h1>
        <CartImage title="Jurassic Park" />
        <h1 className="text-3xl">Transformers</h1>
        <CartImage title="Transformers" />
        <h1 className="text-3xl">Spider - Man</h1>
        <CartImage title="spider" />
        <h1 className="text-3xl">The Hunger Games</h1>
        <CartImage title="The Hunger Games" />
        <h1 className="text-3xl">Indiana Jones</h1>
        <CartImage title="Indiana Jones" />
        <h1 className="text-3xl">A - Z</h1>
        <CartImage title="a" />
        <h1 className="text-3xl">Romance</h1>
        <CartImage title="romance" />
      </div>
      <div className="text-center py-4 bg-black text-white">
        <h1>
          <a href="https://jayasriraam.vercel.app/">Jayasriraam</a>
        </h1>
        <p className="text-sm">&copy; 2024 All rights reserved.</p>
      </div>
    </>
  );
};

export default LandingHome;
