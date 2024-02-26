import { useParams } from "react-router-dom";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import Pagination from "@/lib/Pagination";
import { memo } from "react";

function MovieAndSeriesWithGenres({
  movie,
  page,
}: {
  movie: Movies;
  page: number;
}) {
  const { genreName, media_type } = useParams();
  const gn = genreName!
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return (
    <motion.div initial="initial" whileHover="whileHover">
      {movie && (
        <>
          <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1]">
            <AnimateTitle
              text={`${gn === "Sci Fi & Fantasy" ? "Sci-Fi & Fantasy" : gn}`}
            />
            <div className="inline text-lg ml-2 text-gray-500">
              Total Results: {movie.total_results}
            </div>
          </TypographyH2>
          <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
            {movie.results.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                linkPath={`/${media_type}/${movie.id}/overview`}
              />
            ))}
          </div>
          <Pagination totalPage={movie.total_pages} currentPage={page} />
        </>
      )}
    </motion.div>
  );
}

export default memo(MovieAndSeriesWithGenres);
