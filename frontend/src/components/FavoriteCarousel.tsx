"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Movie {
  _id: string;
  image: string;
}

interface FavoriteCarouselProps {
  movies: Movie[];
}

const FavoriteCarousel: React.FC<FavoriteCarouselProps> = ({ movies }) => {
  // Initialize the autoplay plugin
  const [plugin] = React.useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="fav-carousel max-w-[1550px] mx-auto my-0">
      {movies.length > 0 && (
        <Carousel plugins={[plugin]} className="w-full">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie._id}>
                <Card className="shadow-none rounded-none border-0 bg-transparent">
                  <CardContent className="flex items-center justify-center p-0 w-full relative">
                    <Image
                      src={movie.image}
                      alt="Favorite movie"
                      width={1440}
                      height={400}
                      quality={100}
                      priority={true}
                      style={{ objectFit: "cover" }}
                      className="w-full h-[200px] sm:h-[500px] md:h-[680px] cursor-pointer"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default FavoriteCarousel;
