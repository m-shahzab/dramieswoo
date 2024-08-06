import Hero from "@/components/home/hero/Hero";
import Main from "@/components/home/main/Main";
import { useAppDispatch } from "@/redux/hooks";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";
import { nextTwoMovies } from "@/redux/slice/movieSlice";
import { useEffect, useMemo } from "react";

function Home() {
  const { data: trendingMovies } = useFetchMoviesQuery({
    type: "trending",
    query: "trending/all/week?language=en-US",
  }) as { data: Movies };
  const dispatch = useAppDispatch();
  const randamNum = useMemo(
    () => Math.floor(Math.random() * (17 - 0 + 1) + 0),
    // () => 17,
    []
  );
  const copyData = [...(trendingMovies?.results ?? [])];
  const next2Movie = copyData.splice(randamNum + 1, 2);
  const isMovieOrTv =
    trendingMovies?.results[randamNum]?.media_type === "movie" ? "movie" : "tv"; //get media type is movie or tv
  const ID = trendingMovies?.results[randamNum]?.id; // get id of random movie or tv
  const contentInfo = `${isMovieOrTv}/${ID}`; // get movieORtv info

  useEffect(() => {
    if (next2Movie) {
      dispatch(nextTwoMovies({ nextMovies: next2Movie }));
    }
  }, [next2Movie, dispatch]);

  const heroBackdropImage = trendingMovies?.results[randamNum].backdrop_path;
  return (
    <>
      {heroBackdropImage && next2Movie && (
        <>
          <div className="add_fix_height relative">
            <Hero
              contentInfo={contentInfo}
              backdropImagePath={heroBackdropImage}
            />
          </div>
          <Main />
        </>
      )}
    </>
  );
}

export default Home;
