import BasicMovieInfo from "./BasicMovieInfo";
import ProductionCompanies from "./ProductionCompanies";
import Recommendations from "./Recommendations";

function MidSection() {
  return (
    <div className="mt-2">
      <div className="flex flex-col justify-center">
        <BasicMovieInfo />
      </div>
      <ProductionCompanies />
      <Recommendations />
    </div>
  );
}

export default MidSection;
