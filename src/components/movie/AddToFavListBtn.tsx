import { Button } from "../ui/button";
import { LuBookmarkPlus } from "react-icons/lu";
import { addToFavListHandler } from "@/lib/addToFavList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  FavoriteListType,
  addNewMovieToFavList,
} from "@/redux/slice/movieSlice";
import { toast } from "react-toastify";
function AddToFavList({
  data,
}: {
  data: {
    id: number;
    media_type: "movie" | "tv";
    title: string;
    poster_path: string;
  };
}) {
  // console.log("AddToFavList::::::::");
  const users = useAppSelector((state) => state.authSlice.users);
  const favData = {
    ...data,
    user: users as User,
  };
  const dispatch = useAppDispatch();
  const clickHandler = async () => {
    console.log("clicked");
    toast(`Adding to watchlist...`, {
      position: "bottom-right",
      autoClose: 5000,
      theme: "dark",
    });
    const res = await addToFavListHandler(favData);
    toast.dismiss();
    toast(`${res.message}`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: "dark",
    });
    if (res?.message !== "Movie Already Added") {
      const favoriteListData = res?.data as FavoriteListType;

      dispatch(
        addNewMovieToFavList({
          ...favoriteListData,
        })
      );
      console.log("need to be add to store");
    }
  };

  return (
    <Button
      title="Add to watchlist"
      variant={"ghost"}
      className="text-3xl p-0 hover:bg-transparent"
      onClick={() => clickHandler()}
    >
      <LuBookmarkPlus />
    </Button>
  );
}

// Export the memoized component
// export default memo(AddToFavList, (prevProps, nextProps) => {
//   console.log(prevProps, nextProps);
//   return prevProps.data.id === nextProps.data.id;
// });

export default AddToFavList;
