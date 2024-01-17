import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter, setMoboFilter } from "@/redux/slice/movieSlice";

export const useFilterApplyBtn = (selectFilter: {
  genres: string;
  popularity: string;
  year: string;
  page: number;
}) => {
  const dispatch = useAppDispatch();
  const moboFilter = useAppSelector((state) => state.movieSlice.moboFilter);

  const { genres, popularity, year } = selectFilter;
  if (genres === "" && popularity === "" && year === "") {
    return;
  }
  const startDate = `${year === "" ? "" : `${year}-01-01`}`;
  const endDate = `${year === "" ? "" : `${year}-12-31`}`;

  const filterDispatch = () => {
    dispatch(
      setFilter({
        genres: genres,
        popularity: popularity,
        startDate: startDate,
        year: year,
        endDate: endDate,
      })
    );

    if (moboFilter) dispatch(setMoboFilter(false));
  };

  return filterDispatch;
};
