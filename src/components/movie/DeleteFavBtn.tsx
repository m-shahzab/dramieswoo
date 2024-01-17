import { BsBookmarkX } from "react-icons/bs";
import appwriteservice from "@/appwrite/services";
import { useAppDispatch } from "@/redux/hooks";
import { deleteFromFavoriteList } from "@/redux/slice/movieSlice";

function DeleteFavBtn({ movieId }: { movieId: string }) {
  const dispatch = useAppDispatch();
  const deleteFavorite = async () => {
    await appwriteservice.deleteFavList(movieId);
    dispatch(deleteFromFavoriteList(movieId));
  };

  return (
    <div className="flex justify-end pr-1 pt-1">
      <BsBookmarkX
        title="Remove from watchlist"
        className="text-2xl text-white cursor-pointer"
        onClick={() => deleteFavorite()}
      />
    </div>
  );
}

export default DeleteFavBtn;
