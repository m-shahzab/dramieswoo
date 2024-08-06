import { useFetchDataWinthInfiniteScrollQuery } from "@/redux/rtk_query/api";
import { memo, useState } from "react";
import MovieCard from "./movie/MovieCard";
import CustomInfiniteScroll from "./custom-infinite-scroll";

const ShowSearchData = memo(function ShowSearchData({
  value,
  loadingRef,
  person = false,
  checkBoxId,
}: {
  checkBoxId: string;
  value: string;
  person: boolean;
  loadingRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [page, setPage] = useState(1);
  const { data, isFetching, isError, isLoading } =
    useFetchDataWinthInfiniteScrollQuery({
      type: "searchQuery",
      value: value,
      page: page,
      checkBoxId: checkBoxId,
    });

  if (!isFetching && loadingRef.current) {
    loadingRef.current.style.display = "none";
  }
  if (data?.results.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-lg font-semibold">No results found</p>
      </div>
    );
  }
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
    <>
      {!isLoading && (
        <div>
          <p className="text-lg font-semibold mt-4 mb-2">
            Search results for "{value}"
          </p>
          <p className="text-lg font-semibold mt-4 mb-2">
            Total results "{data?.total_results}"
          </p>
          {data && (
            <CustomInfiniteScroll
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
              <div className="sssssssssss grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
                {data?.results.map((movie, i) => {
                  return (
                    <MovieCard
                      className="group h-max"
                      movie={movie}
                      key={movie.id}
                      index={i % 20}
                      person={person}
                      linkPath={`/${
                        checkBoxId === "multi" ? movie.media_type : checkBoxId
                      }/${movie.id}${
                        movie.media_type === "person" ? "" : "/overview"
                      }`}
                    />
                  );
                })}
              </div>
            </CustomInfiniteScroll>
          )}
        </div>
      )}
    </>
  );
});
export default ShowSearchData;
