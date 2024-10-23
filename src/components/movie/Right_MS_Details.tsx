import { Params, useParams } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";
import { TypographyP } from "../ui/Typography/TypographyP";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import AddToFavList from "./AddToFavListBtn";

function Right_MS_Details({ className }: { className?: string }) {
  const { media_type, id } = useParams<Params>();
  const { data: movieData } = useFetchMoviesQuery({
    query: `${media_type}/${id}`,
    type: "info",
  }) as { data: Movie };
  const year =
    movieData?.release_date?.split("-")[0] ||
    movieData?.first_air_date?.split("-")[0];
  const title = movieData?.title || movieData?.name;
  const shortTitle =
    (title as string).length > 10 ? title?.slice(0, 10) + "..." : title;
  const mediaType = (movieData?.title ? "movie" : "tv") as "movie" | "tv";
  const favData = {
    id: Number(movieData?.id),
    media_type: mediaType,
    title: String(title),
    poster_path: String(movieData?.backdrop_path),
  };
  return (
    <div id="rightDetails" className={`self-end ${className}`}>
      <TypographyH2 className="border-none space-x-1 pb-[0_!important]">
        <AnimateTitle text={title} className="@xl:inline-block hidden" />
        <AnimateTitle text={shortTitle} className="@xl:hidden inline-block" />
        {year && <span className="text-[0.7em] text-gray-500">({year})</span>}
      </TypographyH2>
      {movieData?.tagline && (
        <TypographyP className="mb-3 text-lg leading-[1] italic text-gray-400">
          {movieData.tagline}
        </TypographyP>
      )}
      <TypographyP className="mb-3 text-lg leading-[1] italic">
        <span className="">{movieData?.vote_average.toFixed(1)}</span>
        <span className="text-2xl text-gray-400">/</span>
        <span className="text-gray-400">10</span>
      </TypographyP>
      <AddToFavList className="" variant="destructive" data={favData}>
        <LuPlus />
        Add List
      </AddToFavList>
    </div>
  );
}

export default Right_MS_Details;
