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
  id?: number,
  poster_path?: string,
  original_title?: string,
  overview?: string
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