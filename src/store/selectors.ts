export const filmSelector = (state: { films: { films: Array<object>; }; }) => state.films.films;
export const pagesCountSelector = (state: { films: { pagesCount: number; }; }) => state.films.pagesCount;
export const apiKeySelector = (state: { films: { apiKey: string; }; }) => state.films.apiKey;