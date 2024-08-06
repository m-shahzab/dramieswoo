import TopSection from "./TopSection";
import MidSection from "./MidSection";
import { useParams } from "react-router-dom";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";

function Movies_Series_DetailsUi() {
  document.documentElement.scrollTop = 0;
  const { media_type, id } = useParams();
  const { data: movieInfo } = useFetchMoviesQuery({
    type: "info",
    query: `${media_type}/${id}`,
  }) as { data: Movie };

  const imgUrl = `https://image.tmdb.org/t/p/w342${movieInfo?.poster_path}
  `;
  return (
    <div>
      <TopSection imgUrl={imgUrl} title={movieInfo?.title || movieInfo?.name} />
      <MidSection />
    </div>
  );
}
export default Movies_Series_DetailsUi;
