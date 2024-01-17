import { TypographyP } from "@/components/ui/Typography/TypographyP";
import { Button } from "@/components/ui/button";
import YearsPopOver from "@/components/YearsPopOver";
import { useState } from "react";
import { useFilterApplyBtn } from "../lib/filterApplyBtn";
import { v4 as uuidv4 } from "uuid";

function Filter({
  genresList,
}: {
  genresList: {
    id: number;
    name: string;
  }[];
}) {
  console.log("filter component:::");
  const [selectFilter, setSelectFilter] = useState({
    genres: "",
    popularity: "popularity.desc",
    year: "",
    page: 1,
  });

  const filterDispatch = useFilterApplyBtn(selectFilter);
  const popularityBtn = [
    {
      label: "Popularity Asc",
      value: "popularity.asc",
    },
    {
      label: "Popularity Desc",
      value: "popularity.desc",
    },
    {
      label: "Release Date Asc",
      value: "primary_release_date.asc",
    },
    {
      label: "Release Date Desc",
      value: "primary_release_date.desc",
    },
    {
      label: "Rating Asc",
      value: "vote_average.asc",
    },
    {
      label: "Rating Desc",
      value: "vote_average.desc",
    },
  ];
  return (
    <>
      <div className="space-y-2 border p-2 rounded-lg">
        <TypographyP>
          <span className="">Genres</span>
        </TypographyP>
        <div className="flex flex-wrap justify-start gap-2">
          {genresList.map((genre) => {
            return (
              <Button
                key={uuidv4()}
                variant={"secondary"}
                onClick={() =>
                  setSelectFilter((prev) => ({
                    ...prev,
                    genres: String(genre.id),
                  }))
                }
                // className=""
                className={`genre-button ${
                  selectFilter.genres === String(genre.id)
                    ? "bg-primary hover:bg-primary ssssssssssssss"
                    : "hover:outline hover:outline-1 outline-primary"
                }`}
              >
                {genre.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 border p-2 rounded-lg mt-2">
        <TypographyP>
          <span className="">Sort By</span>
        </TypographyP>
        <div className="flex flex-wrap justify-start gap-2">
          {popularityBtn.map((popularity) => {
            return (
              <Button
                key={uuidv4()}
                variant={"secondary"}
                onClick={() =>
                  setSelectFilter((prev) => ({
                    ...prev,
                    popularity: popularity.value,
                  }))
                }
                className={`genre-button ${
                  selectFilter.popularity === popularity.value
                    ? "bg-primary hover:bg-primary"
                    : "hover:outline hover:outline-1 outline-primary"
                }`}
              >
                {popularity.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 border p-2 rounded-lg mt-2">
        <TypographyP>
          <span className="">Release Year</span>
        </TypographyP>
        <YearsPopOver
          selectedYear={selectFilter.year}
          setSelectedYear={setSelectFilter}
        />
      </div>

      <div className="flex justify-start border mt-2 gap-x-2 p-2">
        <Button onClick={() => filterDispatch && filterDispatch()}>
          Apply
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            setSelectFilter({
              genres: "",
              popularity: "",
              year: "",
              page: 1,
            })
          }
        >
          Clear Filter
        </Button>
      </div>
    </>
  );
}
export default Filter;
