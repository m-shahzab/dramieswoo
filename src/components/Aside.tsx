import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  Sheet,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  LuHome,
  LuAlignLeft,
  LuTv2,
  LuVideo,
  LuListVideo,
} from "react-icons/lu";
import AsideLinks from "./AsideLinks";

function Aside() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="">
          <LuAlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] px-2 py-2" side={"left"}>
        <SheetHeader>
          <div className="w-1/2">
            <img src="/imgs/logo.png" alt="Logo" />
          </div>
        </SheetHeader>
        <AsideLinks
          label="Home"
          subLink
          subLinkDetails={[
            {
              name: "Home",
              path: "/",
              icon: <LuHome />,
            },
          ]}
        />
        <AsideLinks
          label="Watch List"
          subLink
          subLinkDetails={[
            {
              name: "List",
              path: "/watchlist",
              icon: <LuListVideo />,
            },
          ]}
        />
        <AsideLinks
          label="Discover"
          subLink
          subLinkDetails={[
            {
              name: "Movies",
              path: "/movies",
              icon: <LuVideo />,
            },
            {
              name: "Series",
              path: "/series",
              icon: <LuTv2 />,
            },
          ]}
        />
      </SheetContent>
    </Sheet>
  );
}
export default Aside;
