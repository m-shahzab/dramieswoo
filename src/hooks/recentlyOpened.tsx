// // useRecentlyOpenedMovies.ts

// import { useState, useEffect } from "react";

// // Define the type for a recently opened movie
// type RecentlyOpenedMovie = {
//   type: string;
//   id: number; // Replace with the actual type for movie IDs (e.g., number, UUID, etc.)
// };

// const useRecentlyOpenedMovies = () => {
//   const [recentlyOpened, setRecentlyOpened] = useState<RecentlyOpenedMovie[]>(
//     []
//   );

//   // Load previously stored movies from localStorage on component mount
//   useEffect(() => {
//     const storedMovies =
//       JSON.parse(localStorage.getItem("recentlyOpenedMovies")) || [];
//     setRecentlyOpened(storedMovies);
//   }, []);

//   // Add a movie to the recently opened list
//   const addRecentlyOpenedMovie = (movie: RecentlyOpenedMovie) => {
//     const updatedList = [...recentlyOpened, movie];
//     setRecentlyOpened(updatedList);
//     localStorage.setItem("recentlyOpenedMovies", JSON.stringify(updatedList));
//   };

//   return { recentlyOpened, addRecentlyOpenedMovie };
// };

// export default useRecentlyOpenedMovies;
