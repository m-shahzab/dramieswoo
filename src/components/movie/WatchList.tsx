import { motion } from "framer-motion";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import { TypographyP } from "../ui/Typography/TypographyP";
import WatchlistCard from "./WatchlistCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

function WatchList() {
  const { documents: movie, total } = useAppSelector(
    (state) => state.movieSlice.favoriteList
  );

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="h-full py-3"
    >
      <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] space-x-2 flex items-center">
        <AnimateTitle text="Watchlist" />
        <div className="uppercase border py-1 px-2 rounded-md text-sm font-normal space-x-2 mt-2">
          <span>Total :</span>
          <span>{total}</span>
        </div>
      </TypographyH2>
      <div className="grid gap-2 grid-cols-1 @xs:grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4">
        {total === 0 ? (
          <div className="col-span-full flex flex-col justify-center items-center text-center">
            <TypographyH2 className="text-3xl border-none">
              Your list is feeling lonely.
            </TypographyH2>
            <TypographyP>
              It looks like you haven’t added anything to your list yet!
              <br />
              <Link to={"/"} className="group group-hover:underline">
                Go back and add some favorites to your list.
              </Link>
            </TypographyP>
          </div>
        ) : (
          <WatchlistCard />
        )}
      </div>
    </motion.div>
  );
}

export default WatchList;
