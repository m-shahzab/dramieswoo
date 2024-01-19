import { addToFavListHandler } from "@/lib/addToFavList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import {
  FavoriteListType,
  addNewMovieToFavList,
} from "@/redux/slice/movieSlice";

type AddToFavoriteListTypes = {
  id: number;
  media_type: "movie" | "tv";
  title: string;
  poster_path: string;
};

function useAddToFavoriteList() {
  const users = useAppSelector((state) => state.authSlice.users);
  const dispatch = useAppDispatch();

  const addToFavoriteList = async (data: AddToFavoriteListTypes) => {
    toast(`Adding to watchlist...`, {
      position: "bottom-right",
      autoClose: 5000,
      theme: "dark",
    });
    const favData = {
      ...data,
      user: users as User,
    };
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
    }
  };

  return { addToFavoriteList };
}

export { useAddToFavoriteList };
