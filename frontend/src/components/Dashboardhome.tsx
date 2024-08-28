"use client";

import React, { useState, useEffect } from "react";
import CartImage from "@/components/CardImage";
import FavoriteCarousel from "@/components/FavoriteCarousel";

interface Movie {
  _id: string;
  image: string;
}

const LandingHome: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(
          "https://cinephile-server-jay.vercel.app/movies/favorites",
          { cache: "force-cache" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Movie[] = await response.json();
        setFavorites(data.slice(18, 25));
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadFavorites();
  }, []);

  return (
    <>
      {error && <p className="text-center mt-3">{error}</p>}
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
      <div className="text-center py-4 bg-[#cde41e] text-black">
        <h1>
          <a href="https://jayasriraam.vercel.app/">Jayasriraam</a>
        </h1>
        <p className="text-sm">&copy; 2024 All rights reserved.</p>
      </div>
    </>
  );
};

export default LandingHome;
