import LazyImage from "@/utils/LazyImage";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { IoMdDownload } from "react-icons/io";
import { imageDownload } from "@/utils/image.download";

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
              <LazyImage
                imgPath={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
                alt=""
                autoHeight
                className={`rounded-md h-full ${aspectratio} object-contain`}
              />
            )}
          </div>
          {!isVideo && (
            <div className="absolute bottom-1 flex w-[calc(100%-0.50rem)] justify-between items-center">
              <figcaption className="rounded bg-card text-sm px-1">
                {`${backdrop.width}x${backdrop.height}`}
              </figcaption>
              <Button
                variant={"link"}
                className="m-0 p-0 h-auto text-3xl focus:ring-2 ring-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  imageDownload(backdrop.file_path);
                }}
                title="Download Image"
              >
                <IoMdDownload className="m-0 p-1 bg-card rounded-sm" />
              </Button>
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}
