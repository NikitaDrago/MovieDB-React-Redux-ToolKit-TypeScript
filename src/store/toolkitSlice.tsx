import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { Payload, TFetchFilms, Toolkit, TState} from "../interfaces";

const initialState: TState = {
  films: [],
  pagesCount: 0,
  apiKey: 'ebea8cfca72fdff8d2624ad7bbf78e4c',
  status: null,
  error: null,
};

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async ({currentPage, apiKey}: TFetchFilms, {rejectWithValue}) => {

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const toolkitSlice: Toolkit = createSlice({
  name: 'films',
  reducers: {},
  initialState,
  extraReducers: {
    [fetchFilms.pending]: (state: TState) => {
      state.status = 'loading';
    },
    [fetchFilms.fulfilled]: (state: TState, action: { payload: Payload }) => {
      state.status = 'resolved';
      state.films = action.payload.results;
      state.pagesCount = action.payload.total_pages;
    },
    [fetchFilms.rejected]: (state: TState, action: { payload: string | null | undefined; }) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
})

export default toolkitSlice.reducer;
