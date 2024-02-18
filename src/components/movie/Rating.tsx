import { MdOutlineStarPurple500 } from "react-icons/md";

export function Rating({
  rating,
  className = " ",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center w-fit bg-primary px-2 rounded-full text-sm ${className}`}
    >
      <MdOutlineStarPurple500 />
      {rating.toFixed(1)}
    </div>
  );
}
