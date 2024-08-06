import { useParams } from "react-router-dom";
import { useFetchMoviesQuery } from "@/redux/rtk_query/api";
import MainSlider from "../MainSlider";
function Recommendations() {
  const { media_type, id } = useParams();
  const { data } = useFetchMoviesQuery({
    type: "recommendations",
    query: `${media_type}/${id}`,
  }) as { data: Movies };
  return (
    <div>
      <MainSlider label={`${media_type}`} title="Recomendations" data={data} />
    </div>
  );
}

export default Recommendations;
