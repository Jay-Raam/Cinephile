import FavoriteCarousel from "@/components/FavoriteCarousel";
import DailyChart from "@/components/DailyChart";
import ContactForm from "@/components/ui/Contact";
import Image from "next/image";
import Image0001 from "../../public/m1.png";
import Image0002 from "../../public/m2.png";

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

// Server-side logic is now inside the component itself
export default async function Home() {
  let favorites: Movie[] = [];
  let error: string | null = null;
  let allFavorites: Movie[] = [];

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
    favorites = data.slice(0, 8);
    allFavorites = data.slice(12, 22);
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <>
      <header className="hero -z-50">
        <FavoriteCarousel movies={favorites} />
        {error && (
          <div className="text-red-500 text-center mt-6 md:h-[100vh]">
            Error: {error}
          </div>
        )}
      </header>

      <main>
        <div
          className="aboutUs flex justify-center items-center max-w-[1200px] mx-auto my-0 mt-10"
          id="about"
        >
          <div className="details flex justify-center items-center flex-col lg:flex-row gap-3 max-w-[1200px] mx-auto my-0">
            <div className="me flex justify-center items-start flex-col gap-3">
              <h1 className="text-3xl text-left underline-after">About Us</h1>
              <p className="text-[1rem] text-center lg:text-left">
                Hiii, I&apos;m Jayasriraam, based in Chennai. I&apos;m
                completing my studies at GTN Arts College in 2023. Known for his
                extraordinary passion for watching cinema, I spent my college
                days watching 3 or 4 movies per day, having viewed over 800
                movies, 20 anime, and 20 web series in my lifetime and still
                going. This extensive movie-watching habit not only fuels his
                enthusiasm but also influences my personal grooming.
              </p>
              <p className="text-[1rem] text-center lg:text-left">
                Movies provide a portal to explore our deepest emotions and
                wildest dreams. They remind us of the power of love and the
                boundless possibilities of imagination. Whether you’re looking
                to experience the highs and lows of romance or to escape to a
                world of magic and wonder, these genres promise an unforgettable
                journey.
              </p>
            </div>
            <div className="chart">
              <DailyChart />
            </div>
          </div>
        </div>

        <div className="some-movies mt-20 flex justify-center items-center gap-8 flex-col">
          <h1 className="text-2xl">Watched Movies</h1>
          <div className="movies">
            {error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : allFavorites.length === 0 ? (
              <p className="text-gray-500">No movies available.</p>
            ) : (
              <ul className="flex justify-center items-center gap-8 max-w-[1200px] flex-wrap mx-auto my-0">
                {allFavorites.map((movie) => (
                  <li
                    key={movie._id}
                    className="flex justify-start items-center gap-3 flex-col w-[280px] md:flex-row"
                  >
                    <Image
                      src={movie.image}
                      alt="movie poster"
                      width={200}
                      quality={100}
                      height={200}
                      className="w-[280px] md:w-[500px] h-auto hover:scale-105"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <section className="contact flex justify-center items-center gap-6 flex-col max-w-[1200px] mx-auto my-0 mt-20 mb-3">
          <h2 className="text-center text-3xl">Contact Us</h2>
          <p className="text-center">
            If you have any questions, suggestions, or feedback, we&apos;d love
            to hear from you. Reach out to us using the contact form below.
          </p>
          <div className="flex justify-center items-center flex-col-reverse lg:flex-row max-w-[1200px] mx-auto my-0">
            <ContactForm />
            <Image
              src={Image0001}
              alt="the men"
              quality={100}
              className="w-[300px] md:w-[500px] lg:w-1/2"
            />
          </div>
        </section>
      </main>

      <footer className="w-full flex justify-center items-center bg-[#cde41e] flex-col flex-wrap lg:flex-nowrap lg:flex-row pb-4 text-black">
        <div className="w-full mt-5 lg:mt-0 md:w-1/3 flex justify-center items-center flex-col">
          <h1 className="text-4xl">Cinephile</h1>
          <p className="text-[16px]">Find your favorite movies</p>
        </div>
        <div className="w-full md:w-1/3">
          <Image src={Image0002} alt="the men" quality={100} />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-8 justify-center items-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className=""
            href="https://jayasriraam.vercel.app/"
          >
            <h1>Jayasriraam</h1>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className=""
            href="https://www.instagram.com/_ivanjay_/"
          >
            <h1>_Ivanjay_</h1>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className=""
            href="https://github.com/Jay-Raam/"
          >
            <h1>Jay-Raam</h1>
          </a>
        </div>
      </footer>

      <div className="text-center py-4 bg-black text-white">
        <h1>
          <a href="https://jayasriraam.vercel.app/">Jayasriraam</a>
        </h1>
        <p className="text-sm">&copy; 2024 All rights reserved.</p>
      </div>
    </>
  );
}
