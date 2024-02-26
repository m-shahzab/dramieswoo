import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Movies_SeriesUi from "../components/movie/Movies_SeriesUi";
import { setFilter } from "@/redux/slice/movieSlice";
import { useEffect } from "react";

function SeriesP() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setFilter({
        genres: "",
        popularity: "popularity.desc",
        year: "",
        startDate: "",
        endDate: "",
        page: 1,
      })
    );
  }, []);

  const { page, genres, popularity, startDate, endDate } = useAppSelector(
    (state) => state.movieSlice.movieFilter
  );
  const { data: movieData, isFetching } = useGeTtrendingMoviesQuery(
    `discover/tv?include_adult=true&include_video=false&language=en-US&page=${page}&first_air_date.gte=${startDate}&first_air_date.lte=${endDate}&sort_by=${popularity}&with_genres=${genres}`
  );
  return (
    <div>
      <Movies_SeriesUi
        isFetching={isFetching}
        movieData={movieData}
        media_type="tv"
      />
    </div>
  );
}

export default SeriesP;
