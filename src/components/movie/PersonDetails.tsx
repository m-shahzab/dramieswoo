import LazyImage from "@/utils/LazyImage";
import { TypographyP } from "@/components/ui/Typography/TypographyP";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import { TypographyH3 } from "../ui/Typography/TypographyH3";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function PersonDetails({ data }: { data: Person }) {
  const dateObj = new Date(data?.birthday);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <motion.div
      className="@2xl:flex-row flex-col flex mb-8 pt-4"
      whileHover="whileHover"
      initial="initial"
    >
      <div className="mx-auto w-fit border h-[25rem] rounded-md">
        <div className="h-[20rem] w-[13rem] relative bg-card overflow-hidden">
          <LazyImage
            imgPath={`https://image.tmdb.org/t/p/w300${data?.profile_path}`}
            alt={data?.name}
            className="h-full w-full rounded-tl-md rounded-tr-md"
          />
        </div>
        <div className="px-1">
          <TypographyP className="font-semibold text-lg">
            {data?.name}
          </TypographyP>
          <TypographyP className="text-gray-500 font-medium">{`Known For : ${
            data?.known_for_department || "N/A"
          }`}</TypographyP>
        </div>
      </div>
      <div className="flex-grow pl-2 space-y-4">
        <TypographyH2 className="mb-4  pb-3 relative text-2xl before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] space-x-3">
          <AnimateTitle text={`${data?.name}`}></AnimateTitle>
          <span>{`(${formattedDate})`}</span>
        </TypographyH2>
        <div className="flex gap-2 items-center cursor-default flex-wrap">
          <span className="text-gray-700 font-medium text-lg border p-2 uppercase rounded-md">
            {data.gender === 1 ? "Female" : "Male"}
          </span>
          <span className="font-bold">
            Also Known as :{data.also_known_as.length === 0 && " N/A"}
          </span>
          {data.also_known_as.length !== 0 &&
            data.also_known_as.map((name, index) => (
              <span
                key={index}
                className="transition-all ease-in bg-accent p-2 rounded-sm hover:bg-accent/50"
              >
                {name}
              </span>
            ))}
        </div>
        <div className="border p-2">
          <TypographyH3 className="border-b pb-4">Biography</TypographyH3>
          <ScrollArea>
            <TypographyP className="text-gray-500 font-medium text-justify w-[calc(100%_-_1rem)] max-h-56">
              {data?.biography || "N/A"}
            </TypographyP>
          </ScrollArea>
        </div>
      </div>
    </motion.div>
  );
}

export default PersonDetails;
