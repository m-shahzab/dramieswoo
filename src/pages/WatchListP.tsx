import Container from "@/components/container/Container";
import WatchList from "@/components/movie/WatchList";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks";

function WatchListP() {
  console.log("watchList page");
  const favoriteList = useAppSelector((state) => state.movieSlice.favoriteList);
  return (
    <Container className="mt-16">
      {favoriteList.loading ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <WatchList />
      )}
    </Container>
  );
}

export default WatchListP;
