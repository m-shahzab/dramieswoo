import { motion } from "framer-motion";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import CastCard from "../Cast";
import { v4 as uuidv4 } from "uuid";
import { TypographyH3 } from "../ui/Typography/TypographyH3";

function CastCrew({ data }: { data: CastAndCrew | undefined }) {
  return (
    <motion.div whileHover="whileHover" initial="initial">
      <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1]">
        <AnimateTitle text="Cast"></AnimateTitle>
      </TypographyH2>
      {data && data?.cast.length > 0 ? (
        <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
          {data.cast.map((cast) => (
            <CastCard key={uuidv4()} data={cast} />
          ))}
        </div>
      ) : (
        <TypographyH3 className="text-center">No Cast</TypographyH3>
      )}
      <br />
      <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1]">
        <AnimateTitle text="Crew"></AnimateTitle>
      </TypographyH2>
      {data && data?.crew.length > 0 ? (
        <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
          {data.crew.map((cast) => (
            <CastCard key={uuidv4()} data={cast} />
          ))}
        </div>
      ) : (
        <TypographyH3 className="text-center">No Crew</TypographyH3>
      )}
    </motion.div>
  );
}

export default CastCrew;
