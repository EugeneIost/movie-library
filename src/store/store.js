import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movie-slice';
import moviesListSlice from './movies-list-slice';

const store = configureStore({
  reducer: {
    moviesList: moviesListSlice.reducer,
    movie: movieSlice.reducer,
  },
});

export default store;
