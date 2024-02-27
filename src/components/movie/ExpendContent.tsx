import { Link } from "react-router-dom";
import { TypographyH3 } from "../ui/Typography/TypographyH3";
import { TypographyP } from "../ui/Typography/TypographyP";
import { Button } from "../ui/button";
import CastCard from "../Cast";

export function ExpendContent({ data }: { data: Episodes }) {
  const jobFilter = (str: string) => {
    return data.crew.filter((job) => job.job === str);
  };
  return (
    <div className="my-2">
      <TypographyH3 className="text-center">Overview</TypographyH3>
      <TypographyH3>Crew</TypographyH3>
      <TypographyP className="space-x-2">
        Directed by:
        {jobFilter("Director").map((job) => (
          <Button asChild variant={"link"} className="pl-2" key={job.id}>
            <Link to={`/person/${job.id}`} className="">
              {job.name}
            </Link>
          </Button>
        ))}
      </TypographyP>
      <TypographyP className="space-x-2">
        Written by:
        {jobFilter("Writer").map((job) => (
          <Button asChild variant={"link"} className="p-0" key={job.id}>
            <Link to={`/person/${job.id}`} className="">
              {job.name}
            </Link>
          </Button>
        ))}
      </TypographyP>
      <TypographyH3>Storyline</TypographyH3>
      <TypographyP>{data.overview}</TypographyP>
      <TypographyH3 className="my-2">
        Guest Stars:
        <span className="text-lg text-gray-400">
          &ensp; {data.guest_stars.length}
        </span>
      </TypographyH3>
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] pb-2">
        {data.guest_stars.map((star) => (
          <CastCard key={star.id} data={star} />
        ))}
      </div>
    </div>
  );
}
