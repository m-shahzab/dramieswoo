import AddToFavList from "@/components/movie/AddToFavListBtn";
import { TypographyH3 } from "@/components/ui/Typography/TypographyH3";
import { TypographyP } from "@/components/ui/Typography/TypographyP";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import LazyImage from "@/utils/LazyImage";
import { motion } from "framer-motion";
import { LuInfo, LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function RenderMovies() {
  const nextMovies = useAppSelector((state) => state.movieSlice.nextMovies);
  return (
    <>
      {nextMovies &&
        nextMovies?.map((movie, index) => {
          const HeroNextMoviesAni = {
            hidden: {
              opacity: 0,
              x: 100,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
                delay: 0.5 + index * 0.2,
              },
            },
          };
          const favData = {
            id: movie.id,
            media_type: (movie.title ? "movie" : "tv") as "movie" | "tv",
            title: movie.title || movie.name,
            poster_path: movie.backdrop_path,
          };
          return (
            <motion.div
              className="w-max"
              key={uuidv4()}
              variants={HeroNextMoviesAni}
              initial={"hidden"}
              animate={"visible"}
            >
              <div className="@4xl:flex-row @4xl:items-end flex flex-col items-center">
                <div className="@4xl:w-[10rem] @4xl:h-60 w-60 bg-accent relative rounded-lg overflow-hidden rounded-br-none group aspect-[9/15]">
                  <div className="group-hover:scale-110 h-full transition duration-200">
                    <LazyImage
                      imgPath={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                      alt={movie.name || movie.title}
                    />
                  </div>
                </div>
                <div className="w-[18rem] @4xl:translate-y-0 -translate-y-8 shadow-[0_-18px_15px_5px_rgba(0,0,0,0.5)] @4xl:shadow-none">
                  <div className="relative overflow-hidden">
                    <div className="absolute  inset-0 transition ease duration-200 z-[-1]">
                      <LazyImage
                        className=""
                        imgPath={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.name || movie.title}
                      />
                    </div>
                    <div className="z-[-1] absolute inset-0 bg-heroOverlay/60" />
                    <div className=" p-2 flex flex-col justify-between">
                      <TypographyH3 className="truncate">
                        {movie.title ?? movie.name}
                      </TypographyH3>
                      <TypographyP className="leading-6 line-clamp-3 text-base">
                        {movie.overview}
                      </TypographyP>
                      <div>
                        <AddToFavList
                          className="uppercase"
                          variant="ghost"
                          data={favData}
                        >
                          <LuPlus className="text-primary text-lg mr-1" />
                          add list
                        </AddToFavList>
                        <Button
                          className="dark:text-inherit  text-white rounded-2xl"
                          asChild
                          variant={"link"}
                        >
                          <Link
                            to={`${favData.media_type}/${favData.id}/overview`}
                            className=""
                          >
                            <LuInfo className="mr-1" />
                            View Info...
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
    </>
  );
}

function HeroNextMovies() {
  return (
    <div className="@4xl:items-end w-full flex flex-col">
      <div className="@4xl:!flex-col @4xl:pb-4 @[700px]:flex-row flex flex-col justify-center items-center gap-4">
        <RenderMovies />
      </div>
    </div>
  );
}
export default HeroNextMovies;
