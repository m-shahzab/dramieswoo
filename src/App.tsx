import { memo, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { BounceLoader } from "react-spinners";
import { Outlet } from "react-router-dom";
import { useGeTtrendingMoviesQuery } from "./redux/rtk_query/api";
import NavBar from "./components/home/hero/NavBar";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/home/Footer";
import { useGetCurrentUser } from "./hooks/getUser";
import { useFetchFavList } from "./hooks/fetchFavorite";
import BackToTopBtn from "./components/BackToTopBtn";
import Loader from "./components/Loader";

function App() {
  document.documentElement.scrollTop = 0;
  const isLgn = JSON.parse(localStorage.getItem("isLogin") || "false");
  const { isLoading } = useGeTtrendingMoviesQuery(
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
    <>
      {isLgn && <NavBar />}
      <div className="@container App">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Outlet />
            <Footer />
            {createPortal(
              <ToastContainer theme="dark" />,
              document.getElementById("Toastify") as HTMLElement
            )}
            {isLgn &&
              createPortal(<BackToTopBtn />, document.body as HTMLElement)}
          </>
        )}
      </div>
    </>
  );
}
export default memo(App);
