import Container from "@/components/container/Container";
import SeasonAllEpiDetails from "@/components/movie/SeasonAllEpiDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSeasonsDetailsQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

function SeasonsDetails() {
  const { media_type, id, season_number } = useParams();
  const { isFetching } = useGetSeasonsDetailsQuery(
    `${media_type}/${id}/season/${season_number}`
  );
  return (
    <Container className="mt-16">
      {isFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <SeasonAllEpiDetails />
      )}
    </Container>
  );
}

export default SeasonsDetails;
