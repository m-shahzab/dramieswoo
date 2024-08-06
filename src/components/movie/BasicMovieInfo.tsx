import { TypographyH2 } from "../ui/Typography/TypographyH2";
import { Link, useParams } from "react-router-dom";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";
import { Button } from "../ui/button";
import AllSeasonsSlider from "./AllSeasonsSlider";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { motion } from "framer-motion";

function BasicMovieInfo() {
  const { media_type, id } = useParams();
  const { data: movieInfo } = useFetchMoviesQuery({
    type: "info",
    query: `${media_type}/${id}`,
  }) as { data: Movie };
  const isMovie = media_type === "movie";
  const hours = Math.floor(Number(movieInfo?.runtime) / 60);
  const mint = Number(movieInfo?.runtime) % 60;
  const title = String(movieInfo?.title || movieInfo?.name);
  const mediaTypes = [
    { name: "Backdrop", pathSegment: "backdrops" },
    { name: "Logos", pathSegment: "logos" },
    { name: "Posters", pathSegment: "posters" },
    { name: "Videos", pathSegment: "videos" },
  ];
  const mediaLinks = mediaTypes.map((mediaType) => ({
    name: mediaType.name,
    path: `/${media_type}/${id}/media/${mediaType.pathSegment}`,
  }));
  const filteredSeasonsList =
    movieInfo?.seasons &&
    movieInfo.seasons.filter((s) => {
      return s.name !== "Specials";
    });
  return (
    <motion.div initial="initial" whileHover="whileHover">
      <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] flex items-center justify-between">
        <AnimateTitle
          text={`${isMovie ? "Movie" : "Series"} Details`}
        ></AnimateTitle>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Title :</span>
        <span className="text-gray-400 leading-[1] p-1 uppercase">{title}</span>
      </TypographyH2>
      {filteredSeasonsList && filteredSeasonsList && (
        <TypographyH2 className="m-0 text-lg border-none">
          <span className="mr-1">No. of seasons :</span>
          <span className="text-gray-400 leading-[1] p-1 rounded uppercase">
            {filteredSeasonsList.length}
          </span>
        </TypographyH2>
      )}
      {movieInfo?.number_of_episodes && movieInfo.number_of_episodes && (
        <TypographyH2 className="m-0 text-lg border-none">
          <span className="mr-1">No. of episodes :</span>
          <span className="text-gray-400 leading-[1] p-1 rounded uppercase">
            {movieInfo.number_of_episodes}
          </span>
        </TypographyH2>
      )}
      {isMovie && (
        <TypographyH2 className="m-0 text-lg border-none">
          <span className="mr-1">Duration :</span>
          <span className="text-gray-400 p-1 ">
            {hours}h {mint}m
          </span>
        </TypographyH2>
      )}
      <TypographyH2 className="m-0 text-lg border-none">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1">Genres :</span>
          {movieInfo?.genres.map((genre) => {
            const genreName = genre.name.toLocaleLowerCase().replace(/ /g, "-");
            return (
              <Button
                asChild
                key={genre.name}
                variant={"link"}
                className="text-gray-400 p-0 font-semibold text-lg h-fit"
                title={`Get movie by genre__${genre.name}`}
              >
                <Link to={`/genre/${genre.id}/${genreName}/${media_type}`}>
                  {genre.name}
                </Link>
              </Button>
            );
          })}
        </div>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1">Language :</span>
          {movieInfo?.spoken_languages.map((lang) => {
            const isOrgLang = lang.iso_639_1 === movieInfo?.original_language;
            return (
              <span
                className={`${
                  isOrgLang && "text-primary underline"
                } text-gray-400`}
                key={lang.iso_639_1}
                title={`${
                  isOrgLang ? `${"Original language " + lang.name}` : lang.name
                }`}
              >
                {lang.english_name}
              </span>
            );
          })}
        </div>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Storyline :</span>
        <span className="text-gray-400">{movieInfo?.overview}</span>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Cast & Crew :</span>
        <Button
          asChild
          variant={"link"}
          className="text-gray-400 p-0 font-semibold text-lg h-fit"
          title="see full cast and crew"
        >
          <Link to="cast-crew">See full cast and crew</Link>
        </Button>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1">Media :</span>
          {mediaLinks.map((media) => (
            <Button
              asChild
              key={media.name}
              variant={"link"}
              className="text-gray-400 p-0 font-semibold text-lg h-fit"
              title={`see all ${media.name}`}
            >
              <Link to={media.path}>{media.name}</Link>
            </Button>
          ))}
        </div>
      </TypographyH2>
      <hr />
      {!isMovie && (
        <AllSeasonsSlider
          titleLable={title}
          seasonsData={filteredSeasonsList as Season[]}
        />
      )}
    </motion.div>
  );
}

export default BasicMovieInfo;
