import { TypographyH3 } from "../ui/Typography/TypographyH3";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import { Link, useParams } from "react-router-dom";
import { useGetInfoQuery } from "@/redux/rtk_query/api";
import { Button } from "../ui/button";

function BasicMovieInfo() {
  const { media_type, id } = useParams();
  const { data: movieInfo } = useGetInfoQuery(`${media_type}/${id}`);
  const isMovie = media_type === "movie";
  const hours = Math.floor(Number(movieInfo?.runtime) / 60);
  const mint = Number(movieInfo?.runtime) % 60;
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
  return (
    <>
      <TypographyH3 className="text-center text-xl">Movie Details</TypographyH3>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Title :</span>
        <span className="text-gray-400 leading-[1] p-1 uppercase">
          {movieInfo?.title || movieInfo?.name}
        </span>
      </TypographyH2>
      {movieInfo?.seasons && movieInfo.seasons && (
        <TypographyH2 className="m-0 text-lg border-none">
          <span className="mr-1">No. of seasons :</span>
          <span className="text-gray-400 leading-[1] p-1 rounded uppercase">
            {movieInfo.seasons.length}
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
          {movieInfo?.genres.map((genre) => (
            <Button
              asChild
              key={genre.name}
              variant={"link"}
              className="text-gray-400 p-0 font-semibold text-lg h-fit"
              title={`Get movie by genre__${genre.name}`}
            >
              <Link to="#" onClick={() => alert(`${genre.name}, ${genre.id}`)}>
                {genre.name}
              </Link>
            </Button>
          ))}
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
    </>
  );
}

export default BasicMovieInfo;
