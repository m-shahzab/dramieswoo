import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import "@splidejs/splide/dist/css/splide.min.css";
import { TypographyH2 } from "./ui/Typography/TypographyH2";
import { memo, useRef } from "react";
import { motion } from "framer-motion";
import AnimateTitle from "./ui/Typography/AnimateTitle";
import MovieCard from "./movie/MovieCard";
import { TypographyH3 } from "./ui/Typography/TypographyH3";
function MainSlider({
  data,
  label,
  title = "Trending",
  person = false,
}: {
  data: Movies | undefined;
  label: string;
  title?: string;
  person?: boolean;
}) {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      className="duration-500 mt-2"
      initial="initial"
      whileHover="whileHover"
    >
      <TypographyH2 className="pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] space-x-1">
        <AnimateTitle text={title}></AnimateTitle>
        <span className="uppercase border py-1 px-2 rounded-md text-sm font-normal">
          {label}
        </span>
      </TypographyH2>
      <Swiper
        className="pb-[20px_!important] mt-4 h-max whitespace-nowrap"
        spaceBetween={10}
        slidesPerView={6}
        scrollbar={{
          draggable: true,
          dragSize: 50,
        }}
        modules={[Scrollbar]}
        breakpoints={{
          // when window width is >= 320px
          200: {
            slidesPerView: 2,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
          },
          // when window width is >= 640px
          780: {
            slidesPerView: 4,
          },
          980: {
            slidesPerView: 5,
          },
          1080: {
            slidesPerView: 6,
          },
        }}
      >
        {data?.results.length === 0 ? (
          <TypographyH3 className="text-center text-xl">
            No results found
          </TypographyH3>
        ) : (
          <>
            {data?.results.map((movie_and_people) => {
              return (
                <SwiperSlide key={uuidv4()}>
                  <MovieCard
                    movie={movie_and_people}
                    person={person}
                    linkPath={`/${
                      `${movie_and_people.media_type || "movie"}/` +
                      movie_and_people.id
                    }/overview`}
                  />
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
    </motion.div>
  );
}
export default memo(MainSlider);
