import Hero from "@/components/home/hero/Hero";
import Main from "@/components/home/main/Main";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGeTtrendingMoviesQuery } from "@/redux/rtk_query/api";
import { addToFavoriteList, nextTwoMovies } from "@/redux/slice/movieSlice";
import { useEffect } from "react";
import appwriteservice from "@/appwrite/services";

export default function Home() {
  console.log("home page");
  const { data, isLoading } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.authSlice.users);
  // const fetchPosts = async () => {
  //   const favPosts = await appwriteservice.getFavList({
  //     user_id: String(users?.id),
  //   });
  //   const posts = favPosts as any;
  //   console.log(posts, "from home");
  //   if (posts.documents.length !== 0) {
  //     posts.documents.map((post: any) => {
  //       dispatch(addToFavoriteList(post));
  //     });
  //   }
  // };
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
    // fetchPosts();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen">
          <Skeleton className="animate-pulse w-full h-full" />
        </div>
      ) : (
        <>
          <div className="@md:h-[40rem] h-[20rem] relative">
            <Hero contentInfo={contentInfo} />
          </div>
          <Main />
        </>
      )}
    </>
  );
}
