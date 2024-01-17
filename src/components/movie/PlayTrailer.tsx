import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { setTrailerOpen } from "@/redux/slice/movieSlice";
import { createPortal } from "react-dom";
import Trailer from "./Trailer";

export default function PlayTrailer() {
  const dispatch = useAppDispatch();
  const isTrailerOpen = useAppSelector(
    (state) => state.movieSlice.isTrailerOpen
  );
  return (
    <>
      <Button
        variant={"destructive"}
        className="w-full rounded-none"
        onClick={() => dispatch(setTrailerOpen(true))}
      >
        Play Trailer
      </Button>
      {isTrailerOpen &&
        createPortal(
          <Trailer />,
          document.getElementById("popup__root") as HTMLElement
        )}
    </>
  );
}
