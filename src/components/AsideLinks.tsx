import { NavLink } from "react-router-dom";
import { SheetClose, SheetDescription, SheetTitle } from "./ui/sheet";
import { v4 as uuidv4 } from "uuid";

function AsideLinks<T extends Record<string, unknown>>({
  label,
  subLink = false,
  subLinkDetails,
}: {
  label: string;
  subLink: boolean;
  subLinkDetails: SubLinkDetailsTypes<T>[];
}) {
  return (
    <div className="py-5 border-b">
      <SheetDescription className="mb-2">{label}</SheetDescription>
      <ul className="space-y-2">
        {subLink &&
          subLinkDetails.map((item) => {
            return (
              <li className="group" key={uuidv4()}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center ml-4 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "group-hover:text-gray-100 text-gray-400"
                    }`
                  }
                >
                  <SheetClose className="w-full flex items-center gap-x-2">
                    {item.icon}
                    <SheetTitle className="font-normal text-inherit">
                      {item.name}
                    </SheetTitle>
                  </SheetClose>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
export default AsideLinks;
