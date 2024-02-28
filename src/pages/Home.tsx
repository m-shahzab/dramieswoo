import BackToTopBtn from "@/components/BackToTopBtn";
import Hero from "@/components/home/hero/Hero";
import Main from "@/components/home/main/Main";
import { useAppDispatch } from "@/redux/hooks";
import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import { nextTwoMovies } from "@/redux/slice/movieSlice";
import { memo, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

function Home() {
  const { data } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  const dispatch = useAppDispatch();
  const randamNum = useMemo(
    // () => Math.floor(Math.random() * (17 - 0 + 1) + 0),
    () => 7,
    []
  );

  const copyData = [...(data?.results ?? [])];
  const next2Movie = copyData.splice(randamNum + 1, 2);
  const isMovieOrTv =
    data?.results[randamNum].media_type === "movie" ? "movie" : "tv"; //get media type is movie or tv
  const ID = data?.results[randamNum]?.id; // get id of random movie or tv
  const contentInfo = `${isMovieOrTv}/${ID}`; // get movieORtv info
  useEffect(() => {
    if (next2Movie) {
      dispatch(nextTwoMovies({ nextMovies: next2Movie }));
    }
  }, []);
  return (
    <>
      {next2Movie && (
        <>
          <div className="add_fix_height relative">
            <Hero contentInfo={contentInfo} />
          </div>
          <Main />
        </>
      )}
      {createPortal(
        <ToastContainer theme="dark" />,
        document.getElementById("Toastify") as HTMLElement
      )}
      {createPortal(<BackToTopBtn />, document.body as HTMLElement)}
    </>
  );
}

export default memo(Home);
