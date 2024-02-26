import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import { useAppSelector } from "@/redux/hooks";
import Movies_SeriesUi from "../components/movie/Movies_SeriesUi";
import { memo } from "react";

function MovieP() {
  const { page, genres, popularity, startDate, endDate } = useAppSelector(
    (state) => state.movieSlice.movieFilter
  );
  const { data: movieData, isFetching } = useGeTtrendingMoviesQuery(
    `discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=${popularity}&with_genres=${genres}`
  );
  return (
    <div>
      <Movies_SeriesUi
        isFetching={isFetching}
        movieData={movieData}
        media_type="movie"
      />
    </div>
  );
}

export default memo(MovieP);
