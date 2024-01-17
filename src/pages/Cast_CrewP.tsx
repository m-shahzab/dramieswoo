import Container from "@/components/container/Container";
import CastCrew from "@/components/movie/CastCrew";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCastCrewQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

function Cast_CrewP() {
  const { media_type, id } = useParams();
  const { data, isFetching } = useGetCastCrewQuery(`${media_type}/${id}`);
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
