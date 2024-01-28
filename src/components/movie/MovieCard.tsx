import LazyImage from "@/utils/LazyImage";
import { Link } from "react-router-dom";
import AddToFavList from "./AddToFavListBtn";
import React from "react";
import { LuBookmarkPlus } from "react-icons/lu";

function MovieCard({
  movie,
  person = false,
  linkPath,
  className = "",
}: {
  className?: string;
  movie: Results;
  person?: boolean;
  linkPath?: string;
}) {
  // console.log("movie card");
  const title = movie.title || movie.name;
  const favData = {
    id: movie.id,
    media_type: (movie.title ? "movie" : "tv") as "movie" | "tv",
    title: movie.title || movie.name,
    poster_path: movie.backdrop_path,
  };
  return (
    <div className={`group rounded-md overflow-hidden ${className}`}>
      <div className="relative overflow-hidden">
        <div className="group-hover:scale-110 transition ease-in duration-200">
          <LazyImage
            imgPath={`https://image.tmdb.org/t/p/w342/${
              movie.poster_path || movie.profile_path
            }`}
            alt={movie.title || movie.name}
            className="aspect-[2/3] h-[300px]"
          />
        </div>
        <div className="bg-black/50 absolute inset-0 opacity-0 group-hover:opacity-100 flex justify-end transition ease-in duration-200">
          {!person && movie.media_type !== "person" && (
            <AddToFavList
              data={favData}
              className="text-3xl p-0 hover:bg-transparent"
              variant="ghost"
            >
              <LuBookmarkPlus />
            </AddToFavList>
          )}
        </div>
      </div>
      <div className="bg-accent h-full">
        <Link to={`${person ? `/person/${movie.id}` : linkPath}`}>
          <div className="p-2">
            <p className="text-lg truncate">{title}</p>
            {!person && (
              <small className="-mt-1 text-sm text-gray-400">
                {movie.release_date || movie.first_air_date}
              </small>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(MovieCard);
