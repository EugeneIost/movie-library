import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movie-slice';
import moviesListSlice from './movies-list-slice';
import personSlice from './person-slice';

const store = configureStore({
  reducer: {
    moviesList: moviesListSlice.reducer,
    movie: movieSlice.reducer,
    person: personSlice.reducer,
  },
});

export default store;
