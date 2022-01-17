export interface UserItemPageParams {
  id?: string,
  page?: string,
  apiKey?: string
}

export interface TFetchFilms {
  currentPage?: string | number,
  page?: string,
  apiKey?: string
}

export interface TFilmList {
  id?: number | undefined,
  poster_path?: string | undefined,
  original_title?: string | undefined,
  overview?: string | undefined,
  backdrop_path?: string | undefined,
  title?: string | undefined,
  vote_average?: string | undefined,
  runtime?: string | undefined,
  release_date?: string | undefined,
}

export interface Toolkit {
  reducer: any,
  name: string,
}

export interface TState {
  films?: Array<object>,
  pagesCount?: number,
  apiKey?: string,
  status?: null | string,
  error?: null | string,
}

export interface Payload {
  results: Array<object>,
  total_pages: number,
}

export interface Props {
  id: number | undefined,
  page: number | string,
  poster: string | undefined,
  title: string | undefined
}