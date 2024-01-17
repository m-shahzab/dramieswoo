import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import auth from "./appwrite/auth";
import { login, logout } from "@/redux/slice/authSlice";
import { Card, CardHeader } from "@/components/ui/card";
import { BounceLoader } from "react-spinners";
import { Outlet, useNavigate } from "react-router-dom";
import { useGeTtrendingMoviesQuery } from "./redux/rtk_query/api";
import NavBar from "./components/home/hero/NavBar";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchPosts from "./hooks/fetchPosts";

function App() {
  console.log("app");
  const { isLoading } = useGeTtrendingMoviesQuery(
    "trending/all/week?language=en-US"
  );
  const isLgn = JSON.parse(localStorage.getItem("isLogin") || "false");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fetchPosts } = useFetchPosts();

  const isLogin = async () => {
    try {
      const acc = await auth.getCurrentUser();
      console.log(acc);
      if (acc) {
        const userj = {
          id: acc.$id,
          name: acc.name,
          registration: acc.registration,
          email: acc.email,
          phone: acc.phone,
          profileUrl: acc.prefs.profileUrl,
        };
        dispatch(login(userj));
        fetchPosts({
          page: 0,
        });
      } else {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.log(error, "error from app");
    }
  };

  useEffect(() => {
    isLogin();
  }, [fetchPosts]);
  return (
    <>
      {isLgn && (
        <NavBar className="@container/navCon fixed z-10 top-0 left-0 right-0" />
      )}
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
            {/*==show footer here==*/}
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
export default App;
