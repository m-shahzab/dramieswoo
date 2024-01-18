import Hero from "@/components/home/hero/Hero";
import Main from "@/components/home/main/Main";
import { useAppDispatch } from "@/redux/hooks";
import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import { nextTwoMovies } from "@/redux/slice/movieSlice";
import { memo, useEffect } from "react";
import useFetchFavList from "@/hooks/fetchPosts";

function Home() {
  console.log("home page");
  const { data } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  const { fetchFavList } = useFetchFavList();
  fetchFavList({});
  const dispatch = useAppDispatch();
  // const randamNum = Math.floor(Math.random() * (17 - 0 + 1) + 0);
  const randamNum = 3;
  const copyData = [...(data?.results ?? [])];
  const next2Movie = copyData.splice(randamNum + 1, 2);
  const isMovieOrTv =
    data?.results[randamNum].media_type === "movie" ? "movie" : "tv"; //get media type is movie or tv
  const ID = data?.results[randamNum]?.id; // get id of random movie or tv
  const contentInfo = `${isMovieOrTv}/${ID}`; // get movieORtv info
  useEffect(() => {
    dispatch(nextTwoMovies({ nextMovies: next2Movie }));
  }, []);
  return (
    <>
      {data && (
        <>
          <div className="add_fix_height relative">
            <Hero contentInfo={contentInfo} />
          </div>
          <Main />
        </>
      )}
    </>
  );
}

export default memo(Home);
