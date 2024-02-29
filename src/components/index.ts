import { lazy } from "react";

const NavBar = lazy(() => import("./home/NavBar"));
const Footer = lazy(() => import("./home/Footer"));
const BackToTopBtn = lazy(() => import("./BackToTopBtn"));

export { NavBar, Footer, BackToTopBtn };
