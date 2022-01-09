import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  films: [],
  pagesCount: 0,
  apiKey: 'ebea8cfca72fdff8d2624ad7bbf78e4c',
  status: null,
  error: null,
};

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async ({page, apiKey}, {rejectWithValue}) => {

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const toolkitSlice = createSlice({
  name: 'films',
  initialState,
  extraReducers: {
    [fetchFilms.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchFilms.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.films = action.payload.results;
      state.pagesCount = action.payload.total_pages;
    },
    [fetchFilms.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
});

export default toolkitSlice.reducer;
