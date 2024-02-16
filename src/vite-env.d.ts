/// <reference types="vite/client" />

type GenreTpes = {
  id: number;
  name: string;
};

interface Results {
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  profile_path: string;
}

type TrailerResultsandBackdrops = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  aspect_ratio: number;
  file_path: string;
  height: number;
  vote_average: number;
  vote_count: number;
  width: number;
};

interface Movies {
  page: number;
  results: Results[];
  genres: GenreTpes[];
  total_pages: number;
  total_results: number;
}

interface FavDataResponse {
  total: number;
  documents: {
    movie_id: string;
    user_name: string;
    movie_title: string;
    $id: string;
    movie_poster_path: string;
  }[];
}

interface Media {
  backdrops: TrailerResultsandBackdrops[];
  id: number;
  posters: TrailerResultsandBackdrops[];
  logos: TrailerResultsandBackdrops[];
  results: TrailerResultsandBackdrops[];
}

interface CastandCrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  department: string;
  job: string;
}

interface CastAndCrew {
  id: number;
  cast: CastandCrewMember[];
  crew: CastandCrewMember[];
}

interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string; // Should be Date type
  deathday: null | string; // Should be null or Date type
  gender: number; // Can be converted to enum "Gender" with values like MALE, FEMALE, etc.
  homepage: null | string;
  id: number;
  imdbId: string;
  known_for_department: string;
  name: string;
  placeOfBirth: string;
  popularity: number;
  profile_path: string;
}

interface TrailerTypes {
  id: string;
  results: TrailerResults[];
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

type Episodes = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CastandCrewMember[];
};

type Season = {
  _id: string; // this id for single season details
  id: number;
  air_date: string;
  episodes: Episodes[];
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

type SpokenLag = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

interface Movie extends Results {
  tagline: string;
  runtime: number;
  production_companies: ProductionCompanies[];
  genres: GenreTpes[];
  seasons: Season[];
  number_of_episodes: number;
  spoken_languages: SpokenLag[];
}

interface User {
  id: string;
  name: string;
}
type SubLinkDetailsTypes<T> = {
  name: string;
  path: string;
  icon: React.ReactNode;
} & T;
