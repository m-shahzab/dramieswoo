import { TypographyH3 } from "@/components/ui/Typography/TypographyH3";
import { TypographyP } from "@/components/ui/Typography/TypographyP";
import { Button } from "@/components/ui/button";
import LazyImage from "@/utils/LazyImage";
import { LuPlus } from "react-icons/lu";

function HeroNextMovies({ movie }: { movie: Results }) {
  const imgPoster = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
  const imgBackdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  return (
    <div className="flex justify-end items-end">
      <div className="w-[30%] h-[13.5rem] bg-accent/50 relative rounded-lg overflow-hidden rounded-br-none group">
        <div className="group-hover:scale-110 h-full transition duration-200">
          <LazyImage
            className=""
            imgPath={imgPoster}
            alt={movie.name || movie.title}
          />
        </div>
      </div>
      <div className="w-[60%] h-[11.5rem] relative">
        <div className=" w-full h-full relative overflow-hidden">
          <div className="h-full transition ease duration-200">
            <LazyImage
              className=""
              imgPath={imgBackdrop}
              alt={movie.name || movie.title}
            />
          </div>
          <div className="absolute inset-0 bg-heroOverlay/60"></div>
          <div className="absolute inset-0 p-2 ">
            <TypographyH3 className="truncate">
              {movie.title ?? movie.name}
            </TypographyH3>
            <TypographyP className="leading-6">
              {movie.overview.slice(0, 100) + "....."}
            </TypographyP>
            <div>
              <Button className="uppercase" variant={"ghost"}>
                <span className="text-primary text-lg mr-1">
                  <LuPlus />
                </span>
                add list
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroNextMovies;
