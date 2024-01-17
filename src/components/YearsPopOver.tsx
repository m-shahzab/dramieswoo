import * as React from "react";

import { RxCaretSort, RxCheck } from "react-icons/rx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

function YearsPopOver({
  selectedYear,
  setSelectedYear,
}: {
  selectedYear: string;
  setSelectedYear: React.Dispatch<
    React.SetStateAction<{
      genres: string;
      popularity: string;
      year: string;
      page: number;
    }>
  >;
}) {
  const [open, setOpen] = React.useState(false);
  const maxYear = new Date().getFullYear();
  const minYear = 1980;
  const years = [];

  for (let i = maxYear; i >= minYear; i--) {
    years.push({
      value: String(i),
      label: String(i),
    });
  }
  if (open) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedYear
              ? years.find((year) => year.value === selectedYear)?.label
              : "Select years..."}
            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search years..." className="h-9" />
            <CommandEmpty>No years found.</CommandEmpty>
            <ScrollArea className="h-72 overflow-hidden">
              <CommandGroup className="">
                {years.map((year) => (
                  <CommandItem
                    key={year.value}
                    value={year.value}
                    onSelect={(currentYear) => {
                      // setSelectedYear(
                      //   currentYear === selectedYear ? "" : currentYear
                      // );
                      setSelectedYear((prev) => ({
                        ...prev,
                        year: currentYear === selectedYear ? "" : currentYear,
                      }));
                      setOpen(false);
                    }}
                    className="border-b"
                  >
                    {year.label}
                    <RxCheck
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedYear === year.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default YearsPopOver;
