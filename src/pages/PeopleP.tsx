import Container from "@/components/container/Container";
import PersonDetails from "@/components/movie/PersonDetails";
import PersonRelatedMovies from "@/components/movie/PersonRelatedMovies";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetPersonInfoQuery
} from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";

function PeopleP() {
  const { id } = useParams();

  const { data: personInfo, isFetching: personFetching } =
    useGetPersonInfoQuery(Number(id));
  return (
    <Container className="mt-16 ">
      {personFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <>
          <PersonDetails data={personInfo as Person} />
          <PersonRelatedMovies />
        </>
      )}
    </Container>
  );
}

export default PeopleP;
