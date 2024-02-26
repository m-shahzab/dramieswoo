import Container from "@/components/container/Container";
import { TypographyH2 } from "@/components/ui/Typography/TypographyH2";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import MovieCard from "@/components/movie/MovieCard";
import AnimateTitle from "@/components/ui/Typography/AnimateTitle";
import { motion } from "framer-motion";
import Filter from "@/components/Filter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Pagination from "@/lib/Pagination";
import { Button } from "../ui/button";
import { memo } from "react";
import { MdFilterListOff, MdFilterList } from "react-icons/md";
import { setMoboFilter } from "@/redux/slice/movieSlice";
import MobileFilter from "./MobileFilter";

function Movies_SeriesUi({
  isFetching,
  movieData,
  media_type,
}: {
  media_type: string;
  isFetching: boolean;
  movieData: Movies | undefined;
}) {
  const { page } = useAppSelector((state) => state.movieSlice.movieFilter);
  const moboFilter = useAppSelector((state) => state.movieSlice.moboFilter);
  const dispatch = useAppDispatch();
  const copyMovie = [...(movieData?.results ?? [])];
  const spliceMovie = 8;

  return (
    <Container className="mt-16">
      <motion.div
        className="moviePage relative"
        initial="initial"
        whileHover="whileHover"
      >
        {isFetching ? (
          <div className="h-screen">
            <Skeleton className="h-full animate-pulse" />
          </div>
        ) : (
          <>
            <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] flex items-center justify-between">
              <AnimateTitle text="Movies"></AnimateTitle>
              <Button
                className="@4xl:hidden block p-1"
                onClick={() => dispatch(setMoboFilter(!moboFilter))}
                size={"icon"}
                variant={"outline"}
              >
                {moboFilter ? (
                  <MdFilterListOff className="w-full h-full" />
                ) : (
                  <MdFilterList className="w-full h-full" />
                )}
              </Button>
            </TypographyH2>
            <div className="grid grid-cols-3 grid-rows-1 gap-4">
              {/* child1 */}
              <div className="@4xl:col-span-2 col-span-3">
                <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
                  {copyMovie.splice(0, spliceMovie).map((movie, i) => {
                    return (
                      <MovieCard
                        className="h-max"
                        movie={movie}
                        key={i + movie.backdrop_path}
                        linkPath={`/${media_type + "/" + movie.id}/overview`}
                      />
                    );
                  })}
                </div>
              </div>
              {/* child2 */}
              <div className="col-start-3 @4xl:block hidden">
                <Filter />
              </div>
              {/* child3 */}
              <div className="col-span-3 row-start-2 h-max three">
                <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
                  {copyMovie.splice(0).map((movie, i) => {
                    return (
                      <MovieCard
                        className="h-max"
                        movie={movie}
                        key={i + movie.poster_path}
                        linkPath={`/${media_type + "/" + movie.id}/overview`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="sssssssss col-[1/-1]">
                <Pagination
                  currentPage={page}
                  totalPage={movieData?.total_pages}
                />
              </div>
            </div>
          </>
        )}
        {moboFilter && (
          <div className="bg-black/70 absolute top-16 inset-x-0 bottom-0 rounded-md">
            <MobileFilter />
          </div>
        )}
      </motion.div>
    </Container>
  );
}

export default memo(Movies_SeriesUi);
