import Container from "@/components/container/Container";
import AnimateTitle from "@/components/ui/Typography/AnimateTitle";
import { TypographyH2 } from "@/components/ui/Typography/TypographyH2";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import ShowSearchData from "@/components/ShowSearchData";
import { BeatLoader } from "react-spinners";
function SearchP() {
  const [query, setQuery] = useState("");
  const [debouncedText, fn] = useDebounce(query, 800);
  const [showSearchData, setShowSearchData] = useState(false);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [selectedCheckBoxId, setSelectedCheckBoxId] = useState("multi");

  useEffect(() => {
    if (query === "") {
      setShowSearchData(false);
      fn.flush();
    } else {
      if (loadingRef.current) {
        loadingRef.current.style.display = "block";
      }
      setShowSearchData(true);
    }
  }, [query]);

  const checkboxS = [
    {
      id: "multi",
      label: "All",
    },
    {
      id: "movie",
      label: "Movies",
    },
    {
      id: "tv",
      label: "Series",
    },
    {
      id: "person",
      label: "Person",
    },
  ];
  return (
    <Container className="mt-16 pt-4">
      <motion.div
        className="h-full w-full"
        initial="initial"
        whileHover="whileHover"
      >
        <div className="border px-6 py-4 rounded-md space-y-7">
          <div className="@[650px]:flex-row flex-col flex items-center justify-between">
            <TypographyH2 className="pb-3 relative before:absolute before:left-0 before:bottom-0 before:w-9 before:h-1 before:bg-primary before:rounded-sm before:z-[-1] border-none before:transition-all before:duration-200 group-hover:before:w-32 @lg:text-3xl text-xl inline">
              <AnimateTitle text="Search DramiesWoo"></AnimateTitle>
            </TypographyH2>

            <div className="flex space-x-2">
              {checkboxS.map((item, i) => (
                <div
                  key={item.id}
                  className=" flex space-x-2 items-center justify-center"
                >
                  <Checkbox
                    id={item.id}
                    checked={selectedCheckBoxId === item.id}
                    onCheckedChange={() => setSelectedCheckBoxId(item.id)}
                  />
                  <Label htmlFor={item.id} className="">
                    {item.label}
                  </Label>
                  {i !== checkboxS.length - 1 && (
                    <span className="mb-1">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Input
            type="text"
            value={query}
            placeholder="Discover your favorite movies and series effortlessly"
            className="bg-card"
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {showSearchData && (
          <div ref={loadingRef}>
            <div className="flex justify-center mt-10">
              <BeatLoader color="#3B82F6" size={17} />
            </div>
          </div>
        )}
        <div>
          {debouncedText && (
            <ShowSearchData
              checkBoxId={selectedCheckBoxId}
              person={selectedCheckBoxId === "person"}
              loadingRef={loadingRef}
              value={debouncedText}
            />
          )}
        </div>
      </motion.div>
    </Container>
  );
}

export default SearchP;
