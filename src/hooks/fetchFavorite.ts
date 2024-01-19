import appwriteservice from "@/appwrite/services";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addToFavoriteList } from "@/redux/slice/movieSlice";
import { useCallback } from "react";
let count = 0;

type fetchType = {
  lastId?: string;
  preId?: string;
  loading?: boolean;
  page?: number;
};
function useFetchFavList() {
  const users = useAppSelector((state) => state.authSlice.users);
  const dispatch = useAppDispatch();
  const fetchFavList = useCallback(
    async ({ lastId, page = 0, preId, loading = false }: fetchType) => {
      console.log("fetching posts", count++);
      const favPosts = await appwriteservice.getFavList({
        user_id: String(users?.id),
        lastId,
        preId,
      });
      const posts = favPosts as any;
      const postFav = {
        total: posts.total,
        documents: posts.documents,
        loading: loading,
        page: preId ? page - 1 : page + 1,
      };
      dispatch(addToFavoriteList(postFav));
    },
    [users?.id]
  );
  return { fetchFavList };
}

export { useFetchFavList };
