import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetMediaQuery } from "@/redux/rtk_query/api";
import { setTrailerOpen } from "@/redux/slice/movieSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Trailer() {
  console.log("Trailer");
  const { media_type, id } = useParams();
  const { data, isFetching } = useGetMediaQuery(`${media_type}/${id}/videos`);

  const getTrailerVideo = () => {
    if (data) {
      const trailer = data.results.find((item) => item.type === "Trailer");

      console.log(trailer);
      return trailer;
    }
  };
  getTrailerVideo();
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

  const trailerLoaded = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    // e.currentTarget.style.opacity = "1";
    console.log("trailer loaded");
  };
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
                onLoad={(e) => trailerLoaded(e)}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trailer;
