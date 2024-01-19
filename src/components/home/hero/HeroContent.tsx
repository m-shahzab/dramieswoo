import { TypographyP } from "@/components/ui/Typography/TypographyP";
import HeroNextMovies from "./HeroNextMovies";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { v4 as uuidv4 } from "uuid";
import {
  LuStar,
  LuClock,
  LuCalendarDays,
  LuPlay,
  LuPlus,
} from "react-icons/lu";

import { motion } from "framer-motion";
import AnimateTitle from "@/components/ui/Typography/AnimateTitle";
import { memo } from "react";
import { useAddToFavoriteList } from "@/hooks/addToFavoriteList";

interface HeroContentProps {
  movieInfo: Movie;
}
function HeroContent({ movieInfo }: HeroContentProps) {
  const nextMovies = useAppSelector((state) => state.movieSlice.nextMovies);

  const year = new Date(
    movieInfo?.release_date || movieInfo.first_air_date
  ).getFullYear();
  const rating = (6.832).toFixed(1);
  const hours = Math.floor(movieInfo.runtime / 60);
  const mint = movieInfo.runtime % 60;
  const { addToFavoriteList } = useAddToFavoriteList();

  const favData = {
    id: movieInfo.id,
    media_type: (movieInfo.title ? "movie" : "tv") as "movie" | "tv",
    title: movieInfo.title || movieInfo.name,
    poster_path: movieInfo.backdrop_path,
  };

  return (
    <motion.div
      className="@4xl:flex-row relative z-20 flex flex-col mt-16 h-[calc(100%_-_4rem)] space-y-8"
      initial="initial"
      whileHover="whileHover"
    >
      <div className=" my-2 flex flex-col justify-center pr-4 w-full">
        <>
          <motion.h1
            className="font-nova scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
            initial={{
              opacity: 0,
              x: -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
                delay: 0.5,
              },
            }}
          >
            <AnimateTitle
              text={movieInfo?.title ?? movieInfo?.name}
              rotate={360}
            ></AnimateTitle>
          </motion.h1>
          <motion.div
            className="my-1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              delay: 0.8,
              stiffness: 200,
            }}
          >
            <TypographyP className="m-0">{movieInfo?.tagline}</TypographyP>
          </motion.div>
          <motion.ul
            className="@[700px]:w-max flex text-base flex-wrap gap-2 items-center uppercase"
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              delay: 0.8,
              stiffness: 200,
            }}
          >
            <li className="flex items-center">
              <LuStar />
              <span className="ml-1">
                IMDB <span className="font-medium">: {rating}</span>
              </span>
            </li>

            {movieInfo.title && (
              <li className="flex items-center">
                <LuClock />
                <span className="ml-1">
                  Duration
                  <span className="font-medium">
                    : {hours}h {mint}m
                  </span>
                </span>
              </li>
            )}
            <li className="flex items-center">
              <LuCalendarDays />
              <span className="ml-1">
                year <span className="font-medium">: {year}</span>
              </span>
            </li>
          </motion.ul>
          <TypographyP className="w-full font-semibold text-lg text-justify">
            {movieInfo?.overview
              // .slice(0, 200)
              .split(" ")
              .map((text, index) => {
                // const words = Array.from(
                //   movieInfo.overview.slice(0, 200).split(" ")
                // );
                // const isLastIteration = index === words.length - 1;
                return (
                  <motion.span
                    className=""
                    key={uuidv4()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 1 + index * 0.1,
                    }}
                  >
                    {text + " "}
                  </motion.span>
                );
              })}
          </TypographyP>
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              delay: 1.5,
              stiffness: 200,
            }}
          >
            <Button className="rounded-2xl mr-4">
              <LuPlay />
              Watch Trailer
            </Button>
            <Button
              className="rounded-2xl bg-card dark:text-inherit text-black"
              variant={"secondary"}
              onClick={() => addToFavoriteList(favData)}
            >
              <LuPlus />
              Add List
            </Button>
          </motion.div>
        </>
      </div>

      <div className="@4xl:items-end w-full flex flex-col">
        <div className="@4xl:!flex-col @[700px]:flex-row flex flex-col justify-center items-center gap-4">
          {nextMovies?.map((movie, index) => {
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
            return (
              <motion.div
                className="w-max"
                key={uuidv4()}
                variants={HeroNextMoviesAni}
                initial={"hidden"}
                animate={"visible"}
              >
                <HeroNextMovies movie={movie} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
export default memo(HeroContent);
