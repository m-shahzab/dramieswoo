import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import appwriteService from "@/appwrite/services";

import tmdbConfi from "@/envConfi";
console.log("api called");

export const movieApi = createApi({
  reducerPath: "TMDBApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: tmdbConfi.tmdbToken,
    },
  }),
  endpoints: (builder) => ({
    geTtrendingMovies: builder.query<Movies, string>({
      query: (query) => `${query}`,
    }),
    getRecomendations: builder.query<Movies, string>({
      query: (query) => `${query}/recommendations`,
    }),

    getInfo: builder.query<Movie, string>({
      query: (query) => {
        return query;
      },
    }),

    pagination: builder.query<Movies, number>({
      query: (pageNo) => `movies?page=${pageNo}`,
    }),

    searchQuery: builder.query<
      Movies,
      {
        page: number;
        checkBoxId: string;
        value: string;
      }
    >({
      query: ({ checkBoxId, page, value }) => {
        return `search/${checkBoxId}?query=${value}&page=${page}`;
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}(${queryArgs.value})`;
      },

      merge: (currentCache, newItems) => {
        const newMovies = newItems.results.filter(
          (newMovie) =>
            !currentCache.results.some(
              (cachedMovie) => cachedMovie.id === newMovie.id
            )
        );
        currentCache.results.push(...newMovies);
      },

      // Refetch when the value or page arg changes
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.value !== previousArg?.value ||
          currentArg?.page !== previousArg?.page
        );
      },
    }),

    //get media('trailer,backdrops,posters') for movies and series
    getMedia: builder.query<Media, string>({
      query: (query) => query,
    }),
    getCastCrew: builder.query<CastAndCrew, string>({
      query: (query) => {
        return `${query}/credits`;
      },
    }),

    getPersonInfo: builder.query<Person, number>({
      query: (query) => {
        return `/person/${query}`;
      },
    }),

    getMoviesByPerson: builder.query<
      Movies,
      {
        id: number;
        page: number;
      }
    >({
      query: ({ id, page }) => {
        return `/discover/movie?include_adult=true&with_people=${id}&page=${page}`;
      },

      // Only have one cache entry because the id always maps to one string
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}(${queryArgs.id})`;
      },

      merge: (currentCache, newItems) => {
        const newMovies = newItems.results.filter(
          (newMovie) =>
            !currentCache.results.some(
              (cachedMovie) => cachedMovie.id === newMovie.id
            )
        );
        currentCache.results.push(...newMovies);
      },

      // Refetch when the id or page arg changes
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.id !== previousArg?.id ||
          currentArg?.page !== previousArg?.page
        );
      },
    }),

    getFavoriteList: builder.query<any, string>({
      queryFn: async (arg) => {
        console.log("get list recall::::::::::");
        const data = await appwriteService.getFavList({
          user_id: String(arg),
        });
        return { data: data };
      },
    }),
  }),
});

export const {
  useGeTtrendingMoviesQuery,
  useGetInfoQuery,
  useGetRecomendationsQuery,
  useGetCastCrewQuery,
  useGetMoviesByPersonQuery,
  useGetPersonInfoQuery,
  useGetFavoriteListQuery,
  useGetMediaQuery,
  usePaginationQuery,
  useSearchQueryQuery,
} = movieApi;
