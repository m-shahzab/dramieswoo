import { TypographyH3 } from "../ui/Typography/TypographyH3";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import { Link, useParams } from "react-router-dom";
import { useGetInfoQuery } from "@/redux/rtk_query/api";
import { v4 as uuidv4 } from "uuid";

function BasicMovieInfo() {
  const { media_type, id } = useParams();
  const { data: movieInfo } = useGetInfoQuery(`${media_type}/${id}`);
  const isMovie = media_type === "movie";
  const hours = Math.floor(movieInfo?.runtime ?? 0 / 60);
  const mint = (movieInfo?.runtime ?? 0) % 60;
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
        <span className="text-gray-400 leading-[1] p-1 rounded uppercase">
          {movieInfo?.title || movieInfo?.name}
        </span>
      </TypographyH2>
      {isMovie && (
        <TypographyH2 className="m-0 text-lg border-none">
          <span className="mr-1">Duration :</span>
          <span className="text-gray-400 p-1 ">
            {hours}h {mint}m
          </span>
        </TypographyH2>
      )}
      <TypographyH2 className="m-0 text-lg border-none">
        <div className="flex flex-wrap items-center">
          <span className="mr-1">Genres :</span>
          {movieInfo?.genres.map((genre) => (
            <a
              className="text-gray-400 p-1 cursor-pointer"
              key={uuidv4()}
              onClick={() => alert(`${genre.name}, ${genre.id}`)}
            >
              {genre.name}
            </a>
          ))}
        </div>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Language :</span>
        <span className="text-gray-400 leading-[1] p-1 rounded uppercase">
          {movieInfo?.original_language}
        </span>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Storyline :</span>
        <span className="text-gray-400">{movieInfo?.overview}</span>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <span className="mr-1">Cast & Crew :</span>
        <Link to={`cast-crew`} className="text-gray-400">
          see full cast and crew
        </Link>
      </TypographyH2>
      <TypographyH2 className="m-0 text-lg border-none">
        <div className="flex flex-wrap items-center">
          <span className="mr-1">Media :</span>
          {mediaLinks.map((media) => (
            <Link to={media.path} className="text-gray-400 p-1" key={uuidv4()}>
              {media.name}
            </Link>
          ))}
        </div>
      </TypographyH2>
    </>
  );
}

export default BasicMovieInfo;
