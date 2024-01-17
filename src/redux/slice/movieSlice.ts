import { DocumentTypes } from "@/appwrite/services";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type payloadType = {
  nextMovies: Results[];
};

export type FavoriteListType = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  movie_id: string;
  movie_poster_path: string;
  movie_title: string;
  user_id: string;
  user_name: string;
};

type FavoriteListProps = {
  total: number;
  documents: FavoriteListType[];
  loading: boolean;
  page: number;
};
const initialState: {
  nextMovies: Results[];
  movieFilter: {
    genres: string;
    popularity: string;
    year: string;
    startDate: string;
    endDate: string;
    page: number;
  };
  isTrailerOpen: boolean;
  moboFilter: boolean;
  favoriteList: FavoriteListProps;
} = {
  nextMovies: [], // Array to store next 2 movies
  movieFilter: {
    genres: "",
    popularity: "popularity.desc",
    year: "",
    startDate: "",
    endDate: "",
    page: 0,
  },
  isTrailerOpen: false,
  moboFilter: false,
  favoriteList: {
    total: 0,
    documents: [],
    loading: true,
    page: 1,
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    nextTwoMovies(state, action: PayloadAction<payloadType>) {
      state.nextMovies = action.payload.nextMovies;
    },
    nextPage(state, action: PayloadAction<number>) {
      state.movieFilter.page = action.payload;
    },
    prevPage(state, action: PayloadAction<number>) {
      state.movieFilter.page = action.payload;
    },
    setFilter(state, action: PayloadAction<any>) {
      console.log("action.payload", action.payload);
      state.movieFilter = { ...state.movieFilter, ...action.payload };
    },
    setTrailerOpen(state, action: PayloadAction<boolean>) {
      state.isTrailerOpen = action.payload;
    },

    setMoboFilter(state, action: PayloadAction<boolean>) {
      state.moboFilter = action.payload;
    },
    addToFavoriteList(state, action: PayloadAction<FavoriteListProps>) {
      state.favoriteList = action.payload;
      state.favoriteList.loading = false;
    },

    deleteFromFavoriteList(state, action: PayloadAction<string>) {
      // state.favoriteList = {
      //   ...state.favoriteList,
      //   total: state.favoriteList.total - 1,
      //   documents: state.favoriteList.documents.filter(
      //     (doc) => doc.$id !== action.payload
      //   ),
      // };
      state.favoriteList.total = state.favoriteList.total - 1;
      state.favoriteList.documents = state.favoriteList.documents.filter(
        (doc) => doc.$id !== action.payload
      );
      // console.log(action.payload);
    },
    addNewMovieToFavList(state, action: PayloadAction<FavoriteListType>) {
      state.favoriteList.total = state.favoriteList.total + 1;
      if (state.favoriteList.documents.length > 19)
        state.favoriteList.documents.pop();
      state.favoriteList.documents = [
        action.payload,
        ...state.favoriteList.documents,
      ];
      // state.favoriteList.documents[0] = action.payload.documents[0];
    },
  },
});

export const {
  nextTwoMovies,
  nextPage,
  prevPage,
  addNewMovieToFavList,
  deleteFromFavoriteList,
  setMoboFilter,
  setFilter,
  setTrailerOpen,
  addToFavoriteList,
} = movieSlice.actions;
export default movieSlice.reducer;
