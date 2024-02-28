import { lazy } from "react";
// import HomeP from "./Home";
// import MoviesDetailsP from "./MoviesDetailsP";
// import ProfileP from "./ProfileP";
// import LoginP from "./LoginP";
// import SignupP from "./SignupP";
// import PeopleP from "./PeopleP";
// import MovieP from "./MovieP";
// import SeriesP from "./SeriesP";
// import SearchP from "./SearchP";
// import Cast_CrewP from "./Cast_CrewP";
// import MovieMediaP from "./MovieMediaP";
// import WatchListP from "./WatchListP";
// import SeasonsDetailsP from "./SeasonsDetailsP";
// import MovieWithGenre from "./MovieWithGenre";
const HomeP = lazy(() => import("./Home"));
const MoviesDetailsP = lazy(() => import("./MoviesDetailsP"));
const ProfileP = lazy(() => import("./ProfileP"));
const LoginP = lazy(() => import("./LoginP"));
const SignupP = lazy(() => import("./SignupP"));
const PeopleP = lazy(() => import("./PeopleP"));
const MovieP = lazy(() => import("./MovieP"));
const SeriesP = lazy(() => import("./SeriesP"));
const SearchP = lazy(() => import("./SearchP"));
const Cast_CrewP = lazy(() => import("./Cast_CrewP"));
const MovieMediaP = lazy(() => import("./MovieMediaP"));
const WatchListP = lazy(() => import("./WatchListP"));
const SeasonsDetailsP = lazy(() => import("./SeasonsDetailsP"));
const MovieWithGenre = lazy(() => import("./MovieWithGenre"));
export {
  HomeP,
  MoviesDetailsP,
  MovieWithGenre,
  SeasonsDetailsP,
  ProfileP,
  LoginP,
  SignupP,
  WatchListP,
  SearchP,
  MovieMediaP,
  Cast_CrewP,
  PeopleP,
  MovieP,
  SeriesP,
};
