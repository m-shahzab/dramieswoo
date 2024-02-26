import { BounceLoader } from "react-spinners";
import { Card, CardHeader } from "./ui/card";

export default function Loader() {
  return (
    <Card className="h-screen grid place-items-center">
      <CardHeader>
        <BounceLoader size={60} color="#db5cbb" />
      </CardHeader>
    </Card>
  );
}
