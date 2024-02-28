import { lazy } from "react";

const NavBar = lazy(() => import("./home/NavBar"));
const Footer = lazy(() => import("./home/Footer"));

export { NavBar, Footer };
