import appwriteService from "@/appwrite/services";
import { FavListResult } from "@/appwrite/services";

export const addToFavListHandler = async ({
  id,
  media_type,
  title,
  poster_path,
  user,
}: {
  id: number;
  user: User;
  media_type: string;
  title: string;
  poster_path: string;
}): Promise<FavListResult> => {
  const movieId = `${media_type}/${id}`;
  const docId = movieId.replace("/", "-");
  try {
    const FavListResult: FavListResult | undefined =
      await appwriteService.createFavList({
        movie_id: movieId,
        movie_title: title,
        movie_poster_path: poster_path,
        user: user,
        docId: docId,
      });
    if (!FavListResult) {
      throw new Error("FavListResult is undefined");
    }
    return FavListResult;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
