import { Button } from "../ui/button";
import { LuBookmarkPlus } from "react-icons/lu";
import { useAddToFavoriteList } from "@/hooks/addToFavoriteList";
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
  const { addToFavoriteList } = useAddToFavoriteList();

  return (
    <Button
      title="Add to watchlist"
      variant={"ghost"}
      className="text-3xl p-0 hover:bg-transparent"
      onClick={() => addToFavoriteList(data)}
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
