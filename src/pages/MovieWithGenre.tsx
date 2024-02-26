import Container from "@/components/container/Container";
import MovieAndSeriesWithGenres from "@/components/movie/MovieAndSeriesWithGenres";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks";
import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

export default function MovieWithGenre() {
  const { id, media_type } = useParams();
  const { page } = useAppSelector((state) => state.movieSlice.movieFilter);
  const { data, isFetching } = useGeTtrendingMoviesQuery(
    `discover/${media_type}?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`
  );
  return (
    <Container className="mt-16">
      {isFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <MovieAndSeriesWithGenres movie={data as Movies} page={page} />
      )}
    </Container>
  );
}
