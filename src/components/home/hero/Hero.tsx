import Container from "@/components/container/Container";
import { useGetInfoQuery } from "@/redux/rtk_query/api";
import LazyImage from "@/utils/LazyImage";
import HeroContent from "./HeroContent";
function Hero({ contentInfo }: { contentInfo: string | undefined }) {
  console.log("hero");
  const { data } = useGetInfoQuery(`${contentInfo}`); // its make api call based on contentInfo props if media type is movie then it will call ==> movie/{id} else tv/{id}
  const imgPath = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;

  return (
    <>
      {data && (
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
            <HeroContent movieInfo={data} />
          </Container>
        </>
      )}
    </>
  );
}
export default Hero;
