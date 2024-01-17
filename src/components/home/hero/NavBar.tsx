import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, NavLink } from "react-router-dom";
import Container from "@/components/container/Container";
import Logo from "@/components/Logo";
import { LuSearch } from "react-icons/lu";
import { motion } from "framer-motion";
import Aside from "@/components/Aside";
import { useAppSelector } from "@/redux/hooks";
import appwriteservice from "@/appwrite/services";
import { memo } from "react";

function NavBar() {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.authSlice.users);

  const isDp = users?.profileUrl
    ? appwriteservice.getProfileUrl(users?.profileUrl as string)
    : "/imgs/defaultProfilePic.png";

  const navRoutes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Series",
      path: "/series",
    },
  ];
  return (
    <motion.nav
      className={`@container/navCon fixed z-10 top-0 left-0 right-0 bg-card/80`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Container className="flex justify-between h-16 relative">
        <div id="left" className="h-full flex items-center">
          <aside className="">
            <Aside />
          </aside>
          <Logo className="w-40" />
          <div className="@[550px]/navCon:block hidden">
            {navRoutes.map((route) => (
              <Button
                key={uuidv4()}
                variant="ghost"
                className="hover:bg-transparent"
              >
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? `text-primary before:absolute before:left-2/4 before:w-2 before:animate-pulse before:h-2 before:bg-primary before:rounded-[50%] before:bottom-[-0.7rem] before:-translate-x-2/4`
                        : ""
                    } relative`
                  }
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              </Button>
            ))}
          </div>
        </div>
        <div id="right" className="h-full flex items-center gap-x-1">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "border border-primary rounded-md" : ""
            }
          >
            <Button variant={"outline"}>
              <LuSearch />
            </Button>
          </NavLink>

          <Avatar
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <AvatarImage src={isDp as string} />
            <AvatarFallback>{"SG"}</AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </motion.nav>
  );
}

export default memo(NavBar);
