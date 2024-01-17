import { useGetSearchQuery } from "@/redux/rtk_query/api";
import { v4 as uuidv4 } from "uuid";
import { memo } from "react";
import MovieCard from "./movie/MovieCard";
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
  console.log("ShowSearchData: called", value);
  const { data, isFetching } = useGetSearchQuery(
    `search/${checkBoxId}?query=${value}`,
    {
      skip: value === "",
    }
  );
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

  return (
    <>
      {!isFetching && (
        <div>
          <p className="text-lg font-semibold mt-4 mb-2">
            Search results for "{value}"
          </p>
          <div className="grid gap-2 gap-y-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-6">
            {data?.results.map((movie) => {
              return (
                <MovieCard
                  className="group h-max"
                  movie={movie}
                  key={uuidv4()}
                  person={person}
                  linkPath={`/${
                    checkBoxId === "multi" ? movie.media_type : checkBoxId
                  }/${movie.id}/overview`}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
});
export default ShowSearchData;
