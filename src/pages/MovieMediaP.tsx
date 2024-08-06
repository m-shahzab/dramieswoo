import Container from "@/components/container/Container";
import MediaCard from "@/components/movie/MediaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchDataQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

function MovieMediaP() {
  const { media_type, id, pathSegment } = useParams();
  const { data, isFetching } = useFetchDataQuery({
    type: "media",
    query: `${media_type}/${id}/${
      pathSegment !== "videos" ? "images" : "videos"
    }`,
  }) as { data: Media; isFetching: boolean };
  return (
    <Container className="@container mt-16">
      {isFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse " />
        </div>
      ) : (
        <>
          {pathSegment === "backdrops" && <MediaCard data={data?.backdrops} />}
          {pathSegment === "posters" && (
            <MediaCard data={data?.posters} aspectratio="aspect-[9/16]" />
          )}
          {pathSegment === "logos" && <MediaCard data={data?.logos} />}
          {pathSegment === "videos" && (
            <MediaCard data={data?.results} isVideo />
          )}
        </>
      )}
    </Container>
  );
}

export default MovieMediaP;
