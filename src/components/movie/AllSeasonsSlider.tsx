import LazyImage from "@/utils/LazyImage";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { months } from "@/components/movie/PersonDetails";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { TypographyP } from "../ui/Typography/TypographyP";

function AllSeasonsSlider({
  seasonsData,
  titleLable,
}: {
  seasonsData: Season[];
  titleLable: string;
}) {
  const { media_type, id } = useParams();
  console.log(seasonsData);
  return (
    <motion.div initial="initial" whileHover="whileHover" className="my-4">
      <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] flex items-center justify-between">
        <AnimateTitle text="All Seasons"></AnimateTitle>
      </TypographyH2>
      {seasonsData.map((data) => {
        const dateObj = new Date(data.air_date);
        const month = months[dateObj.getMonth()];
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return (
          <div key={data.id} className="mb-4 pb-1 border-b">
            <div className="flex items-end">
              <div className="h-fit min-w-[7rem] w-[7rem] aspect-[9/14] bg-card/50 relative rounded-md rounded-br-none overflow-hidden">
                <LazyImage
                  imgPath={`https://media.themoviedb.org/t/p/w185/${data.poster_path}`}
                  className=""
                  alt={data.name}
                />
              </div>
              <div className=" w-full px-2">
                <TypographyH2 className="border-none">
                  <Link
                    to={`/${media_type}/${id}/season/${data.season_number}`}
                    className="transition-all hover:underline hover:opacity-50"
                  >
                    {data.name}
                  </Link>
                </TypographyH2>
                <div className="flex gap-x-2">
                  <div className="flex items-center justify-center bg-primary px-2 rounded-full text-sm">
                    <MdOutlineStarPurple500 />
                    {data.vote_average}
                  </div>
                  <div className="flex items-center">
                    <span>{year}</span>
                    <LuDot />
                    <span>{data.episode_count} Episode</span>
                  </div>
                </div>

                {data.air_date && (
                  <TypographyP className="truncate">
                    Season {data.season_number} of {titleLable} premiered on{" "}
                    {month} {day},{year}.
                  </TypographyP>
                )}
              </div>
            </div>

            <TypographyP className="!my-0">
              {data.overview ? data.overview : "No overview found."}
            </TypographyP>
          </div>
        );
      })}
    </motion.div>
  );
}

export default AllSeasonsSlider;
