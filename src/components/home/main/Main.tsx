import Container from "@/components/container/Container";
import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import MainSlider from "@/components/MainSlider";
import { memo } from "react";

function Main() {
  const { data: allData } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  const { data: movieData } = useGeTtrendingMoviesQuery(
    "trending/movie/day?language=en-US"
  );
  const { data: seriesData } = useGeTtrendingMoviesQuery(
    "trending/tv/day?language=en-US"
  );
  const { data: personData } = useGeTtrendingMoviesQuery("person/popular");
  const { data: upcomingData } = useGeTtrendingMoviesQuery(
    "movie/upcoming?language=en-US&page=1&region=br"
  );

  const allDataLists = [
    // {
    //   title: "Upcoming",
    //   label: "movie",
    //   data: upcomingData,
    // },
    {
      label: "all",
      data: allData,
    },
    // {
    //   label: "movies",
    //   data: movieData,
    // },
    // {
    //   label: "series",
    //   data: seriesData,
    // },
    // {
    //   label: "People",
    //   data: personData,
    //   title: "Popular",
    //   person: true,
    // },
  ];

  return (
    <Container className="">
      {upcomingData &&
        allDataLists.map((allDataList, i) => (
          <MainSlider
            label={allDataList.label}
            // person={allDataList.person}
            // title={allDataList.title}
            data={allDataList.data}
            key={i}
          />
        ))}
    </Container>
  );
}

export default memo(Main);
