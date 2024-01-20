import { useAppDispatch } from "@/redux/hooks";
import { useGetMediaQuery } from "@/redux/rtk_query/api";
import { setTrailerOpen } from "@/redux/slice/movieSlice";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

type TrailerTypes = {
  media_type: "movie" | "tv";
  id: number;
};

function Trailer({ media_type, id }: TrailerTypes) {
  const { data, isFetching } = useGetMediaQuery(`${media_type}/${id}/videos`);

  const getTrailerVideo = () => {
    if (data) {
      return data.results.find((item) => item.type === "Trailer");
    }
  };
  const dispatch = useAppDispatch();

  const closeTrailer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (e.currentTarget.matches(".boxx,.fixed")) {
      dispatch(setTrailerOpen(false));
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div
      className="@container backdrop-blur-md bg-heroOverlay/30 fixed inset-0 z-10"
      onClick={(e) => closeTrailer(e)}
    >
      <div className="grid place-items-center h-screen">
        <div className="@xl:w-[80%] w-full bg-black/90 aspect-[16/8]">
          {isFetching ? (
            <div className="w-ful h-full grid place-items-center">
              <span>
                <BeatLoader color="#3B82F6" size={17} />
              </span>
            </div>
          ) : (
            <div className="w-full h-full overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getTrailerVideo()?.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trailer;
