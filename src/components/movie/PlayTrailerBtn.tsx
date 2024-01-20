import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { setTrailerOpen } from "@/redux/slice/movieSlice";
import { createPortal } from "react-dom";
import Trailer from "./Trailer";

type PlayTrailerBtnTypes = {
  className: string;
  children: React.ReactNode;
  media_type: "movie" | "tv";
  id: number;
  variantType?: "default" | "destructive";
};

function PlayTrailerBtn({
  className,
  children,
  media_type,
  variantType = "default",
  id,
}: PlayTrailerBtnTypes) {
  const dispatch = useAppDispatch();
  const isTrailerOpen = useAppSelector(
    (state) => state.movieSlice.isTrailerOpen
  );
  return (
    <>
      <Button
        variant={variantType}
        className={`${className}`}
        onClick={() => dispatch(setTrailerOpen(true))}
      >
        {children}
      </Button>
      {isTrailerOpen &&
        createPortal(
          <Trailer media_type={media_type} id={id} />,
          document.getElementById("popup__root") as HTMLElement
        )}
    </>
  );
}

export default PlayTrailerBtn;
