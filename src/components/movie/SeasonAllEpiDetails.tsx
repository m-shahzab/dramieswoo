import { useFetchDataQuery, useFetchMoviesQuery } from "@/redux/rtk_query/api";
import { useParams } from "react-router-dom";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { Skeleton } from "../ui/skeleton";
import LazyImage from "@/utils/LazyImage";
import { Rating } from "./Rating";
import { ReleaseDate } from "./ReleaseDate";
import { LuDot } from "react-icons/lu";
import { TypographyP } from "../ui/Typography/TypographyP";
import { ExpendEpisode } from "./ExpendEpisode";

function SeasonAllEpiDetails() {
  const { media_type, id, season_number } = useParams();
  const { isFetching: movieFetching, data: movieData } = useFetchMoviesQuery({
    type: "info",
    query: `${media_type}/${id}`,
  }) as { isFetching: boolean; data: Movie };
  const { isFetching: episodesFetching, data: episodesData } =
    useFetchDataQuery({
      type: "seasonsDetails",
      query: `${media_type}/${id}/season/${season_number}`,
    }) as { isFetching: boolean; data: Season };
  const year = new Date(episodesData?.air_date ?? "").getFullYear();
  return (
    <>
      {movieFetching || episodesFetching ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        <>
          <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1]">
            <AnimateTitle text={`${movieData?.name}`}></AnimateTitle>
            <span className="ml-2">S.{episodesData?.season_number}</span>
            <span className="text-lg ml-2">({year})</span>
          </TypographyH2>
          <div className="flex flex-col gap-y-5">
            {episodesData?.episodes.map((episode) => (
              <div key={episode.id} className="pb-2 border-b">
                <div className=" flex">
                  <div className="w-40 min-w-[10rem] h-24 relative overflow-hidden rounded-sm bg-card">
                    <LazyImage
                      imgPath={`https://image.tmdb.org/t/p/w227_and_h127_bestv2${episode.still_path}`}
                      alt="episode photo"
                      className=""
                    />
                  </div>
                  <div className="pl-2">
                    <TypographyH2 className="mt-2 text-lg border-none truncate">
                      <span>{episode.episode_number}</span> {episode.name}
                    </TypographyH2>
                    <div className="flex items-center flex-wrap">
                      <Rating rating={episode.vote_average} className="mr-2" />
                      <ReleaseDate data={episode.air_date} />
                      <LuDot />
                      <span>{episode.runtime}m</span>
                    </div>
                    <TypographyP>
                      {episode.overview.slice(0, 50) + "..."}
                    </TypographyP>
                  </div>
                </div>
                <ExpendEpisode data={episode} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SeasonAllEpiDetails;
