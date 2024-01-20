import LazyImage from "@/utils/LazyImage";
import PlayTrailerBtn from "./PlayTrailerBtn";
import { useParams } from "react-router-dom";

function Left_MS_Details({
  imgUrl,
  movieTitle,
  className,
}: {
  className?: string;
  imgUrl: string;
  movieTitle: string | undefined;
}) {
  console.log("left details");
  const { media_type, id } = useParams();

  const mediaType = media_type as "movie" | "tv";
  const ID = Number(id);

  return (
    <div
      id="leftDetails"
      className={`overflow-hidden space-y-1 rounded-lg ${className}`}
    >
      <div className="overflow-hidden group relative w-full">
        <div className="group-hover:scale-110 transition h-[10rem]">
          <LazyImage
            autoHeight
            imgPath={imgUrl}
            alt={movieTitle}
            className=""
          />
        </div>
      </div>
      <div>
        <PlayTrailerBtn
          className="w-full rounded-none"
          media_type={mediaType}
          variantType="destructive"
          id={ID}
        >
          Watch Trailer
        </PlayTrailerBtn>
      </div>
    </div>
  );
}

export default Left_MS_Details;
