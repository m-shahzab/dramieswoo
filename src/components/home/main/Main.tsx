import Container from "@/components/container/Container";
import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import MainSlider from "@/components/MainSlider";

function Main() {
  console.log("main::::");
  const { data: allData } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  // const { data: movieData } = useGeTtrendingMoviesQuery(
  //   "trending/movie/day?language=en-US"
  // );
  // const { data: seriesData } = useGeTtrendingMoviesQuery(
  //   "trending/tv/day?language=en-US"
  // );
  // const { data: personData } = useGeTtrendingMoviesQuery("person/popular");
  // const { data: upcomingData } = useGeTtrendingMoviesQuery(
  //   "movie/upcoming?language=en-US&page=1&region=br"
  // );

  return (
    <Container className="">
      {/* <MainSlider
        data={upcomingData}
        label="movie"
        title="Upcoming"
      ></MainSlider> */}
      <MainSlider data={allData} label="all"></MainSlider>
      {/* <MainSlider data={movieData} label="movies"></MainSlider>
      <MainSlider data={seriesData} label="series"></MainSlider>
      <MainSlider
        person
        data={personData}
        title="Popular"
        label="People"
      ></MainSlider> */}
    </Container>
  );
}

export default Main;
