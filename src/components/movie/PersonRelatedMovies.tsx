import { useGetMoviesByPersonQuery } from "@/redux/rtk_query/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./MovieCard";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";

function PersonRelatedMovies() {
  console.log("person related movies::");
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useGetMoviesByPersonQuery({
    id: Number(id),
    page: page,
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
    <motion.div whileHover="whileHover" initial="initial">
      <TypographyH2 className="mb-4 pb-3 relative text-2xl before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] space-x-3">
        <AnimateTitle text="Person Movies"></AnimateTitle>
        {data && (
          <span className="text-lg border p-2 rounded-md text-gray-500">
            Total : {data.total_results}
          </span>
        )}
      </TypographyH2>
      {isLoading && <ScaleLoader color="#db5cbb" className="text-center" />}
      {isError && <div>Error</div>}
      {data?.results.length === 0 && (
        <div className="text-center text-2xl">No Movies Found</div>
      )}
      {data?.results.length !== 0 && data && (
        <InfiniteScroll
          dataLength={data.results.length}
          next={fetchMoreData}
          hasMore={data.total_results !== data.results.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-center my-3">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
            {data.results.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                linkPath={`/${"movie" + "/" + movie.id}/overview`}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </motion.div>
  );
}

export default PersonRelatedMovies;
