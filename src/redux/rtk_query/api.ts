import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import appwriteService from "@/appwrite/services";
import tmdbConfi from "@/envConfi";
import { Models } from "appwrite";

type FetchMoviesResponse = Movies | Movie;
type TrendingQuery = { type: "trending"; query: string };
type RecommendationsQuery = { type: "recommendations"; query: string };
type InfoQuery = { type: "info"; query: string };
type FetchMoviesQuery = TrendingQuery | RecommendationsQuery | InfoQuery;

type FetchDataQuery = {
  type: "media" | "castCrew" | "personInfo" | "seasonsDetails";
  query: string | number;
};
type FetchDataResponse<T> = T extends "media"
  ? Media
  : T extends "castCrew"
  ? CastAndCrew
  : T extends "personInfo"
  ? Person
  : T extends "seasonsDetails"
  ? Season
  : never;
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
    fetchMovies: builder.query<FetchMoviesResponse, FetchMoviesQuery>({
      query: ({ type, query }) => {
        switch (type) {
          case "trending":
            return `${query}`;
          case "recommendations":
            return `${query}/recommendations`;
          case "info":
            return query;
          default:
            throw new Error("Invalid query type");
        }
      },
    }),

    getFavoriteList: builder.query<
      Models.DocumentList<Models.Document>,
      string
    >({
      queryFn: async (arg) => {
        const data = await appwriteService.getFavList({
          user_id: String(arg),
        });
        return { data: data } as { data: Models.DocumentList<Models.Document> };
      },
    }),
    fetchData: builder.query<
      FetchDataResponse<FetchDataQuery["type"]>,
      FetchDataQuery
    >({
      query: ({ type, query }) => {
        switch (type) {
          case "media":
            return `${query}`;
          case "castCrew":
            return `${query}/credits`;
          case "personInfo":
            return `/person/${query}`;
          case "seasonsDetails":
            return `${query}`;
          default:
            throw new Error("Invalid query type");
        }
      },
      transformResponse: (response, _, arg) => {
        switch (arg.type) {
          case "media":
            return response as Media;
          case "castCrew":
            return response as CastAndCrew;
          case "personInfo":
            return response as Person;
          case "seasonsDetails":
            return response as Season;
          default:
            throw new Error("Invalid query type");
        }
      },
    }),

    pagination: builder.query<Movies, number>({
      query: (pageNo) => {
        return `movies?page=${pageNo}`;
      },
    }),

    fetchDataWinthInfiniteScroll: builder.query<
      Movies,
      {
        type:
          | "getMoviesByPerson"
          | "searchQuery"
          | "movieAndSeriesWithGenres"
          | "pagination"; // type of query
        id?: number;
        page: number;
        value?: string;
        checkBoxId?: string;
        genreId?: string;
        media_type?: string;
        query?: string;
      }
    >({
      query: ({
        type,
        id,
        page,
        checkBoxId,
        value,
        genreId,
        media_type,
        query,
      }) => {
        switch (type) {
          case "getMoviesByPerson":
            return `/discover/movie?include_adult=true&with_people=${id}&page=${page}`;
          case "searchQuery":
            return `search/${checkBoxId}?query=${value}&page=${page}`;
          case "movieAndSeriesWithGenres":
            return `discover/${media_type}?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`;
          case "pagination":
            return `${query}`;
          default:
            throw new Error("Invalid query type");
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        switch (queryArgs.type) {
          case "getMoviesByPerson":
            return `${endpointName}(${queryArgs.id})`;
          case "searchQuery":
            return `${endpointName}(${queryArgs.value})`;
          case "movieAndSeriesWithGenres":
            return `${endpointName}(${queryArgs.genreId})`;
          case "pagination":
            return `${endpointName}(${queryArgs.page})`;
          default:
            throw new Error("Invalid query type");
        }
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
      forceRefetch: ({ currentArg, previousArg }) => {
        switch (currentArg?.type) {
          case "getMoviesByPerson":
            return (
              currentArg?.id !== previousArg?.id ||
              currentArg?.page !== previousArg?.page
            );
          case "searchQuery":
            return (
              currentArg?.value !== previousArg?.value ||
              currentArg?.page !== previousArg?.page
            );
          case "movieAndSeriesWithGenres":
            return currentArg?.page !== previousArg?.page;
          case "pagination":
            return currentArg?.page !== previousArg?.page;
          default:
            return false;
        }
      },
    }),
  }),
});

export const {
  useFetchMoviesQuery,
  useFetchDataQuery,
  useFetchDataWinthInfiniteScrollQuery,
  useGetFavoriteListQuery,
  usePaginationQuery,
} = movieApi;
