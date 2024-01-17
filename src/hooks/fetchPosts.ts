import appwriteservice from "@/appwrite/services";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addToFavoriteList } from "@/redux/slice/movieSlice";
import { useCallback, useEffect } from "react";
let count = 0;
function useFetchPosts() {
  const users = useAppSelector((state) => state.authSlice.users);
  const dispatch = useAppDispatch();
  const fetchPosts = useCallback(
    async ({
      lastId,
      page,
      preId,
      loading = false,
    }: {
      lastId?: string;
      preId?: string;
      loading?: boolean;
      page: number;
    }) => {
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
        loading: false,
        page: preId ? page - 1 : page + 1,
      };
      dispatch(addToFavoriteList(postFav));
    },
    [users?.id]
  );

  return { fetchPosts };
}

export default useFetchPosts;
