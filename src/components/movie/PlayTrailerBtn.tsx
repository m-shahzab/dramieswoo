import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { setTrailerOpen } from "@/redux/slice/movieSlice";
import { createPortal } from "react-dom";
import Trailer from "./Trailer";

{
  /* <Button
              className="rounded-2xl mr-4"
              onClick={() => dispatch(setTrailerOpen(true))}
            >
              <LuPlay />
              Watch Trailer
            </Button> */
}

function PlayTrailerBtn({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isTrailerOpen = useAppSelector(
    (state) => state.movieSlice.isTrailerOpen
  );
  return (
    <>
      <Button
        className={`${className}`}
        onClick={() => dispatch(setTrailerOpen(true))}
      >
        {children}
      </Button>
      {isTrailerOpen &&
        createPortal(
          <Trailer />,
          document.getElementById("popup__root") as HTMLElement
        )}
    </>
  );
}

export default PlayTrailerBtn;
