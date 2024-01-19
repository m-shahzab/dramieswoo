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

function App() {
  console.log("app");
  const { isLoading } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  const isLgn = JSON.parse(localStorage.getItem("isLogin") || "false");
  const { getCurrentUser } = useGetCurrentUser();

  const isLogin = async () => {
    try {
      getCurrentUser();
    } catch (error) {
      console.log(error, "error from app");
    }
  };

  useEffect(() => {
    isLogin();
  }, []);
  return (
    <>
      {isLgn && <NavBar />}
      <div className="@container App">
        {isLoading ? (
          <Card className="h-screen grid place-items-center">
            <CardHeader>
              <BounceLoader size={60} color="#db5cbb" />
            </CardHeader>
          </Card>
        ) : (
          <>
            <Outlet />
            <Footer />
            {createPortal(
              <ToastContainer theme="dark" />,
              document.getElementById("Toastify") as HTMLElement
            )}
          </>
        )}
      </div>
    </>
  );
}
export default memo(App);
