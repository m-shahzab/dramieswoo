import Container from "@/components/container/Container";
import { TypographyH2 } from "@/components/ui/Typography/TypographyH2";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import MovieCard from "@/components/movie/MovieCard";
import AnimateTitle from "@/components/ui/Typography/AnimateTitle";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Filter from "@/components/Filter";
import { useAppSelector } from "@/redux/hooks";
import Pagination from "@/lib/Pagination";

export default function Movies_SeriesUi({
  isFetching,
  movieData,
  genresList,
  media_type,
}: {
  media_type: string;
  isFetching: boolean;
  movieData: Movies | undefined;
  genresList: GenreTpes[];
}) {
  const { page } = useAppSelector((state) => state.movieSlice.movieFilter);
  const copyMovie = [...(movieData?.results ?? [])];
  const spliceMovie = 8;
  return (
    <Container className="mt-16">
      <motion.div
        className="moviePage"
        initial="initial"
        whileHover="whileHover"
      >
        {isFetching ? (
          <div className="h-screen">
            <Skeleton className="h-full animate-pulse" />
          </div>
        ) : (
          <>
            <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1]">
              <AnimateTitle text="Movies"></AnimateTitle>
            </TypographyH2>
            <div className="grid grid-cols-3 grid-rows-1 gap-4">
              {/* child1 */}
              <div className="@4xl:col-span-2 col-span-3">
                <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
                  {copyMovie.splice(0, spliceMovie).map((movie) => {
                    return (
                      <MovieCard
                        className="h-max"
                        movie={movie}
                        key={uuidv4()}
                        linkPath={`/${media_type + "/" + movie.id}/overview`}
                      />
                    );
                  })}
                </div>
              </div>
              {/* child2 */}
              <div className="col-start-3 @4xl:block hidden two">
                <Filter genresList={genresList} />
              </div>
              {/* child3 */}
              <div className="col-span-3 row-start-2 h-max three">
                <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
                  {copyMovie.splice(0).map((movie) => {
                    return (
                      <MovieCard
                        className="h-max"
                        movie={movie}
                        key={uuidv4()}
                        linkPath={`/${media_type + "/" + movie.id}/overview`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="">
                <Pagination
                  currentPage={page}
                  totalPage={movieData?.total_pages}
                />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </Container>
  );
}
