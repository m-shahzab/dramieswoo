import { createBrowserRouter } from "react-router-dom";
import {
  LoginP,
  SignupP,
  HomeP,
  ProfileP,
  WatchListP,
  MoviesDetailsP,
  MovieP,
  SearchP,
  Cast_CrewP,
  MovieMediaP,
  PeopleP,
  SeriesP,
} from "../pages";
import PrivateRoute from "@/Routes/PrivateRoute";
import PublicRoute from "@/Routes/PublicRoute";
import App from "../App.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <HomeP />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginP />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignupP />
          </PublicRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileP />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies",
        element: (
          <PrivateRoute>
            <MovieP />
          </PrivateRoute>
        ),
      },
      {
        path: "/series",
        element: (
          <PrivateRoute>
            <SeriesP />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileP />
          </PrivateRoute>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <PrivateRoute>
            <WatchListP />
          </PrivateRoute>
        ),
      },
      {
        path: "/:media_type/:id/overview",
        element: (
          <PrivateRoute>
            <MoviesDetailsP />
          </PrivateRoute>
        ),
      },
      {
        path: "/:media_type/:id/overview/cast-crew",
        element: (
          <PrivateRoute>
            <Cast_CrewP />
          </PrivateRoute>
        ),
      },
      {
        path: "/:media_type/:id/media/:pathSegment",
        element: (
          <PrivateRoute>
            <MovieMediaP />
          </PrivateRoute>
        ),
      },
      {
        path: "/person/:id/",
        element: (
          <PrivateRoute>
            <PeopleP />
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: (
          <PrivateRoute>
            <SearchP />
          </PrivateRoute>
        ),
      },
    ],
  },
]);