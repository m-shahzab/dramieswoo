export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function ReleaseDate({
  data,
  getFullYear = false,
}: {
  data: string;
  getFullYear?: boolean;
}) {
  const dateObj = new Date(data);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return (
    <>
      {getFullYear ? (
        <span>{year}</span>
      ) : (
        <span>
          {month} {day}, {year}
        </span>
      )}
    </>
  );
}
