import LazyImage from "@/utils/LazyImage";
import { Link } from "react-router-dom";
import { BsBookmarkX } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "@/redux/hooks";
import Pagination from "@/lib/Pagination";
import DeleteFavBtn from "./DeleteFavBtn";

function WatchlistCard() {
  console.log("watchlist card::::::");
  const { documents: movie, total } = useAppSelector(
    (state) => state.movieSlice.favoriteList
  );
  const page = useAppSelector((state) => state.movieSlice.favoriteList.page);
  const totalPage = Math.ceil(total / 20);
  const lastId = movie[movie.length - 1]?.$id;
  const preId = movie[0]?.$id;

  return (
    <>
      {movie.map((movie) => (
        <div className="group rounded-md overflow-hidden" key={uuidv4()}>
          <div className="relative overflow-hidden">
            <div className="group-hover:scale-110 transition ease-in duration-200">
              <LazyImage
                imgPath={`https://image.tmdb.org/t/p/w300/${movie.movie_poster_path}`}
                alt={movie.movie_title}
                className="aspect-video"
              />
            </div>
            <div className="absolute inset-0 bg-black/70 z-10">
              <DeleteFavBtn movieId={movie.$id} />
              <div className="absolute right-0 left-1 bottom-1">
                <p className="text-lg truncate font-semibold group-hover:underline">
                  <Link to={`/${movie.movie_id}/overview`}>
                    {movie.movie_title}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {total >= 20 && (
        <div className="col-span-full">
          <Pagination
            currentPage={page}
            totalPage={totalPage}
            forAppwrite
            preId={preId}
            lastId={lastId}
          />
        </div>
      )}
    </>
  );
}

export default WatchlistCard;
