import Container from "@/components/container/Container";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";
import MainSlider from "@/components/MainSlider";
import { memo } from "react";

function Main() {
  const { data: allData } = useFetchMoviesQuery({
    type: "trending",
    query: "trending/all/week?language=en-US",
  }) as { data: Movies };
  const { data: movieData } = useFetchMoviesQuery({
    type: "trending",
    query: "trending/movie/day?language=en-US",
  }) as { data: Movies };
  const { data: seriesData } = useFetchMoviesQuery({
    type: "trending",
    query: "trending/tv/day?language=en-US",
  }) as { data: Movies };
  const { data: personData } = useFetchMoviesQuery({
    type: "trending",
    query: "person/popular",
  }) as { data: Movies };
  const { data: upcomingData } = useFetchMoviesQuery({
    type: "trending",
    query: "movie/upcoming?language=en-US&page=1&region=br",
  }) as { data: Movies };

  const allDataLists = [
    {
      title: "Upcoming",
      label: "movie",
      data: upcomingData,
    },
    {
      label: "all",
      data: allData,
    },
    {
      label: "movies",
      data: movieData,
    },
    {
      label: "series",
      data: seriesData,
    },
    {
      label: "People",
      data: personData,
      title: "Popular",
      person: true,
    },
  ];

  return (
    <Container>
      {upcomingData &&
        allDataLists.map((allDataList, i) => (
          <MainSlider
            label={allDataList.label}
            person={allDataList.person}
            title={allDataList.title}
            data={allDataList.data}
            key={i}
          />
        ))}
    </Container>
  );
}

const MemoizedMain = memo(Main);
export default MemoizedMain;
