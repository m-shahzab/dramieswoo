import Container from "@/components/container/Container";
import { useGetInfoQuery } from "@/redux/rtk_query/api";
import LazyImage from "@/utils/LazyImage";
import HeroContent from "./HeroContent";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function Hero({ contentInfo }: { contentInfo: string | undefined }) {
  const { data, isFetching } = useGetInfoQuery(`${contentInfo}`); // its make api call based on contentInfo props if media type is movie then it will call ==> movie/{id} else tv/{id}
  const imgPath = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;

  return (
    <>
      {isFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        data && (
          <>
            <div className="absolute inset-0">
              <LazyImage
                className=""
                imgPath={imgPath}
                alt={data.name || data.title}
              />
              <div className="absolute inset-0 bg-heroOverlay/50"></div>
            </div>
            <Container className="w-full h-full relative overflow-hidden">
              <HeroContent movieInfo={data as Movie} />
            </Container>
          </>
        )
      )}
    </>
  );
}
export default memo(Hero);
