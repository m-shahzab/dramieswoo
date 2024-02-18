import React from "react";
import { Button } from "../ui/button";
import { ExpendContent } from "./ExpendContent";

export function ExpendEpisode({ data }: { data: Episodes }) {
  const [expand, setExpand] = React.useState(false);
  return (
    <>
      {expand && <ExpendContent data={data} />}
      <div className="flex items-center justify-center">
        <Button
          onClick={() => setExpand(!expand)}
          variant={"outline"}
          className="flex items-center gap-x-2"
        >
          {expand ? "Hide" : "Expand"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${expand ? "transform rotate-180" : ""}`}
            viewBox="0 0 25 25"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.707-.293l-8-8a1 1 0 111.414-1.414L10 15.586l7.293-7.293a1 1 0 111.414 1.414l-8 8A1 1 0 0110 18z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </>
  );
}
