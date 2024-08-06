import LazyImage from "@/utils/LazyImage";
import { useParams } from "react-router-dom";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";
import { TypographyH2 } from "../ui/Typography/TypographyH2";
import AnimateTitle from "../ui/Typography/AnimateTitle";
import { motion } from "framer-motion";

function ProductionCompanies() {
  const { media_type, id } = useParams();
  const { data: movieInfo } = useFetchMoviesQuery({
    type: "info",
    query: `${media_type}/${id}`,
  });
  const movieInfoAsMovie = movieInfo as Movie;
  return (
    <motion.div initial="initial" whileHover="whileHover">
      <TypographyH2 className="mb-4 pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] flex items-center justify-between">
        <AnimateTitle text="Production Companies"></AnimateTitle>
      </TypographyH2>
      <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
        {movieInfoAsMovie.production_companies.map((company) => (
          <div
            key={company.id}
            className="flex gap-x-1 bg-accent rounded-md p-1"
          >
            <div className="flex items-center overflow-hidden relative w-20 h-20">
              <LazyImage
                imgPath={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                alt={company.name}
                className="w-full"
              />
            </div>
            <div>
              <p>{company.name}</p>
              <small className="text-left">
                Country: {company.origin_country}
              </small>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProductionCompanies;
