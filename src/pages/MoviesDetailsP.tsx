import Movies_Series_DetailsUi from "@/components/movie/Movies_Series_DetailsUi";
import Container from "@/components/container/Container";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetInfoQuery,
  useGetMediaQuery,
  useGetRecomendationsQuery,
} from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

function MoviesDetailsP() {
  const { media_type, id } = useParams();
  const { isFetching: movieFetching } = useGetInfoQuery(`${media_type}/${id}`);
  const { isFetching } = useGetMediaQuery(`${media_type}/${id}/images`);

  const { isFetching: recomFetching } = useGetRecomendationsQuery(
    `${media_type}/${id}`
  );

  return (
    <Container className="">
      {movieFetching || isFetching || recomFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <Movies_Series_DetailsUi />
      )}
    </Container>
  );
}

export default MoviesDetailsP;
