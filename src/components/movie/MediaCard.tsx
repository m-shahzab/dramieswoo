import LazyImage from "@/utils/LazyImage";
import { v4 as uuidv4 } from "uuid";

export default function MediaCard({
  data,
  aspectratio = "aspect-[16/9]",
  isVideo = false,
}: {
  data: TrailerResultsandBackdrops[] | undefined;
  aspectratio?: string;
  isVideo?: boolean;
}) {
  return (
    <div className="grid gap-2 grid-cols-1 @xs:grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 ">
      {data?.map((backdrop) => (
        <figure
          className={`relative rounded-lg bg-accent p-1 w-full h-fit`}
          key={uuidv4()}
        >
          <div
            className={`group relative rounded-md overflow-hidden w-full ${aspectratio}`}
          >
            {isVideo ? (
              <iframe
                className="w-full h-full "
                src={`https://www.youtube.com/embed/${backdrop.key}`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
              ></iframe>
            ) : (
              // https://image.tmdb.org/t/p/w780${backdrop.file_path}
              <LazyImage
                imgPath={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
                alt=""
                autoHeight
                className={`rounded-md h-full ${aspectratio}`}
              />
            )}
          </div>
          {!isVideo && (
            <figcaption className="absolute bottom-1 right-1.5 mt-2 rounded bg-card px-1 text-sm backdrop-blur-sm">
              {`${backdrop.width}x${backdrop.height}`}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
