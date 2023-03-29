import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/api';

const LIMIT = 12;

const initialState = {
  movies: [],
  currentPage: 1,
  pagesQuantity: null,
  searchValue: '',
  status: null,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'moviesList/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    let response;
    console.log(state.moviesList);

    try {
      if (state.moviesList.searchValue) {
        response = await api.get(
          `/v1/movie?name=${state.moviesList.searchValue}&page=${state.moviesList.currentPage}&limit=${LIMIT}`
        );
      } else {
        response = await api.get(
          `/v1/movie?page=${state.moviesList.currentPage}&limit=${LIMIT}`
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

const moviesListSlice = createSlice({
  name: 'moviesList',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchMovies.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.movies = action.payload.docs;
      state.pagesQuantity = action.payload.pages;
    },

    [fetchMovies.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { setCurrentPage, setSearchValue } = moviesListSlice.actions;

export default moviesListSlice;
