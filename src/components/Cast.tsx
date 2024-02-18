import LazyImage from "@/utils/LazyImage";
import { Link } from "react-router-dom";

export default function CastCard({ data }: { data: CastandCrewMember }) {
  return (
    <div className="flex gap-2 rounded bg-gray-dark p-2 bg-accent">
      <div className="aspect-square h-12 w-12 relative overflow-hidden">
        <LazyImage
          alt="Tom Blyth"
          imgPath={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
          className="h-full w-full rounded object-cover text-xs"
        />
      </div>
      <div
        className="overflow-x-hidden w-[calc(100%_-_64px)]"
        title={data.name}
      >
        <Link
          className="block truncate font-work-sans text-sm font-medium hover:underline"
          to={`/person/${data.id}`}
        >
          {data.name}
        </Link>
        <small className="block truncate text-gray-400">{data.character}</small>
      </div>
    </div>
  );
}
