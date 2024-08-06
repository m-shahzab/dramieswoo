import Container from "@/components/container/Container";
import MovieAndSeriesWithGenres from "@/components/movie/MovieAndSeriesWithGenres";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchDataWinthInfiniteScrollQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

export default function MovieWithGenre() {
  const { media_type, id } = useParams();
  const { isLoading } = useFetchDataWinthInfiniteScrollQuery({
    type: "movieAndSeriesWithGenres",
    page: 1,
    genreId: id!,
    media_type: media_type!,
  });
  return (
    <Container className="mt-16">
      {isLoading ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <MovieAndSeriesWithGenres />
      )}
    </Container>
  );
}
