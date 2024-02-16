import Container from "@/components/container/Container";
import { useParams } from "react-router-dom";
// path: "/:media_type/:id/season/:season_number",

function SeasonsDetails() {
  const { media_type, id, season_number } = useParams();
  console.log(
    media_type + " mediaType",
    id + " id",
    season_number + " season_number"
  );
  return (
    <Container className="myContainer mt-16">
      <div>SeasonsDetails</div>
    </Container>
  );
}

export default SeasonsDetails;
