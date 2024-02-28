import { useParams } from "react-router-dom";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import CustomInfiniteScroll from "@/components/custom-infinite-scroll";
import { memo, useState } from "react";
import { useInfiniteScrollQuery } from "@/redux/rtk_query/api";

function MovieAndSeriesWithGenres() {
  const { genreName, media_type, id } = useParams();
  const gn = genreName!
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useInfiniteScrollQuery({
    page: page,
    genreId: id!,
    media_type: media_type!,
  });
  const fetchMoreData = () => {
    if (
      !isLoading &&
      !isError &&
      data &&
      data.results.length > 0 &&
      page < data.total_pages
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <motion.div initial="initial" whileHover="whileHover">
      {data && (
        <>
          <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1]">
            <AnimateTitle
              text={`${gn === "Sci Fi & Fantasy" ? "Sci-Fi & Fantasy" : gn}`}
            />
            <div className="inline text-lg ml-2 text-gray-500">
              Total Results: {data.total_results}
            </div>
          </TypographyH2>
          <CustomInfiniteScroll
            dataLength={data.results.length}
            next={fetchMoreData}
            hasMore={data.total_results > data.results.length}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="text-center my-3">
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
              {data.results.map((movie, i) => (
                <MovieCard
                  movie={movie}
                  index={i % 20}
                  whileInView
                  key={movie.id}
                  linkPath={`/${media_type}/${movie.id}/overview`}
                />
              ))}
            </div>
          </CustomInfiniteScroll>
        </>
      )}
    </motion.div>
  );
}
export default memo(MovieAndSeriesWithGenres);
