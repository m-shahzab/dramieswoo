import { Params, useParams } from "react-router-dom";
import TopSection from "./TopSection";
import { useGetInfoQuery } from "@/redux/rtk_query/api";
import { TypographyP } from "../ui/Typography/TypographyP";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { Button } from "../ui/button";

function Right_MS_Details({ className }: { className?: string }) {
  const { media_type, id } = useParams<Params>();
  const { data: movieData } = useGetInfoQuery(`${media_type}/${id}`);

  const year =
    movieData?.release_date?.split("-")[0] ||
    movieData?.first_air_date?.split("-")[0];
  const title = movieData?.title || movieData?.name;

  const shortTitle =
    (title as string).length > 10 ? title?.slice(0, 10) + "..." : title;

  return (
    <div id="rightDetails" className={`p-1 ${className}`}>
      <TypographyH2 className="border-none space-x-1 pb-[0_!important]">
        <AnimateTitle text={title} className="@xl:inline-block hidden" />
        <AnimateTitle text={shortTitle} className="@xl:hidden inline-block" />
        {year && <span className="text-[0.7em] text-gray-500">({year})</span>}
      </TypographyH2>
      <div>
        <TypographyP className="mb-3 text-lg leading-[1] italic text-gray-400">
          {movieData?.tagline}
        </TypographyP>
      </div>
      <Button variant={"destructive"} title="Add to watchlist">
        Watchlist
      </Button>
    </div>
  );
}

export default Right_MS_Details;
