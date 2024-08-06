import Container from "@/components/container/Container";
import CastCrew from "@/components/movie/CastCrew";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchDataQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

function Cast_CrewP() {
  const { media_type, id } = useParams();
  const { data, isFetching } = useFetchDataQuery({
    type: "castCrew",
    query: `${media_type}/${id}`,
  }) as { data: CastAndCrew; isFetching: boolean };
  return (
    <Container className="mt-16">
      {isFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <CastCrew data={data} />
      )}
    </Container>
  );
}

export default Cast_CrewP;
