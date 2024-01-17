import { useParams } from "react-router-dom";
import { useGetRecomendationsQuery } from "@/redux/rtk_query/api";
import MainSlider from "../MainSlider";
function Recommendations() {
  const { media_type, id } = useParams();
  const { data } = useGetRecomendationsQuery(`${media_type}/${id}`);
  return (
    <div>
      <MainSlider label={`${media_type}`} title="Recomendations" data={data} />
    </div>
  );
}

export default Recommendations;
