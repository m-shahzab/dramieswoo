import { Suspense, lazy, memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGeTtrendingMoviesQuery } from "./redux/rtk_query/api";
import "react-toastify/dist/ReactToastify.css";
import { useGetCurrentUser } from "./hooks/getUser";
import { useFetchFavList } from "./hooks/fetchFavorite";
import Loader from "./components/Loader";
import { Footer, NavBar, BackToTopBtn } from "@/components";
import { createPortal } from "react-dom";
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);
function App() {
  document.documentElement.scrollTop = 0;
  const isLgn = JSON.parse(localStorage.getItem("isLogin") || "false");
  const { isFetching } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US",
    {
      skip: !isLgn,
    }
  );
  const { getCurrentUser } = useGetCurrentUser();
  const { fetchFavList } = useFetchFavList();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isLgn) fetchFavList({});
  }, [fetchFavList]);
  return (
    <Suspense fallback={<Loader />}>
      {isLgn && <NavBar />}
      <div className="@container App">
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <Outlet />
          </>
        )}
      </div>
      {isLgn && <Footer />}
      {isLgn &&
        createPortal(
          <ToastContainer theme="dark" />,
          document.getElementById("Toastify") as HTMLElement
        )}
      {isLgn && createPortal(<BackToTopBtn />, document.body as HTMLElement)}
    </Suspense>
  );
}
export default memo(App);
