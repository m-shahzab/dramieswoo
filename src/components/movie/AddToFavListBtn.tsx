import { Button } from "../ui/button";
import { useAddToFavoriteList } from "@/hooks/addToFavoriteList";

type AddToFavListTypes = {
  data: {
    id: number;
    media_type: "movie" | "tv";
    title: string;
    poster_path: string;
  };
  children: React.ReactNode;
  className: string;
  variant?:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | undefined;
};

function AddToFavList({
  data,
  children,
  className,
  variant = "default",
}: AddToFavListTypes) {
  const { addToFavoriteList } = useAddToFavoriteList();

  return (
    <Button
      title="Add to watchlist"
      variant={variant}
      className={`${className}`}
      onClick={() => addToFavoriteList(data)}
    >
      {children}
    </Button>
  );
}

export default AddToFavList;
