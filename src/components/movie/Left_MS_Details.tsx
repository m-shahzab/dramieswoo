import LazyImage from "@/utils/LazyImage";
import PlayTrailer from "./PlayTrailer";

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
        <PlayTrailer />
      </div>
    </div>
  );
}

export default Left_MS_Details;
