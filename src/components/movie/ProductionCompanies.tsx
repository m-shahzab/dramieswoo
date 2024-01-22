import LazyImage from "@/utils/LazyImage";
import { TypographyH3 } from "../ui/Typography/TypographyH3";
import { useParams } from "react-router-dom";
import { useGetInfoQuery } from "@/redux/rtk_query/api";

function ProductionCompanies() {
  const { media_type, id } = useParams();
  const { data: movieInfo } = useGetInfoQuery(`${media_type}/${id}`);
  const movieInfoAsMovie = movieInfo as Movie;
  console.log(movieInfoAsMovie.production_companies);
  return (
    <div>
      <TypographyH3 className="text-center text-xl my-2">
        Production Companies
      </TypographyH3>
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
    </div>
  );
}

export default ProductionCompanies;
