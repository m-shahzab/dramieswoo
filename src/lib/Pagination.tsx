import { Button } from "@/components/ui/button";
import { useFetchFavList } from "@/hooks/fetchFavorite";
import { useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slice/movieSlice";

function Pagination({
  currentPage,
  totalPage,
  forAppwrite = false,
  lastId, // for appwrite
  preId, // for appwrite
}: {
  forAppwrite?: boolean;
  currentPage: number;
  lastId?: string;
  preId?: string;
  totalPage: number | undefined;
}) {
  const dispatch = useAppDispatch();
  const { fetchFavList } = useFetchFavList();
  const nextPate = () => {
    if (!forAppwrite) {
      dispatch(nextPage(currentPage + 1));
    } else {
      console.log("next page for appwrite");
      fetchFavList({
        page: currentPage,
        lastId,
        loading: true,
      });
    }
    window.scrollTo(0, 0);
  };
  const prevPageH = () => {
    if (!forAppwrite) {
      dispatch(prevPage(currentPage - 1));
    } else {
      console.log("next page for appwrite");
      fetchFavList({
        page: currentPage,
        preId,
        loading: true,
      });
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex gap-x-2 items-center">
      <Button disabled={currentPage <= 1} onClick={prevPageH}>
        Prev
      </Button>
      <span>
        {currentPage === 0 ? currentPage + 1 : currentPage} / {totalPage}
      </span>
      <Button disabled={currentPage === totalPage} onClick={nextPate}>
        Next
      </Button>
    </div>
  );
}

export default Pagination;
