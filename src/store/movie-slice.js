const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
import api from '@/api/api';

const initialState = {
  movie: null,
  frames: null,
  status: null,
  error: null,
};

export const fetchMovieById = createAsyncThunk(
  'movie/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/v1/movie?id=${id}&selectFields=slogan backdrop poster alternativeName color countries genres movieLength year name rating description watchability persons videos`
      );

      const [data] = response.data.docs;

      const persons = data.persons.reduce(
        (acc, person) => {
          if (person.profession === 'актеры') {
            acc.actors.push(person);
            return acc;
          } else if (person.profession === 'режиссеры') {
            acc.directors.push(person);
            return acc;
          }
          return acc;
        },
        {
          actors: [],
          directors: [],
        }
      );

      // const filteredPersons = data.persons.filter(
      //   (person) => person.profession === 'актеры'
      // );
      // const director = data.persons.find(
      //   (person) => person.profession === 'режиссеры'
      // );

      return {
        ...data,
        persons: persons.actors,
        directors: persons.directors,
      };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fetchMovieFrames = createAsyncThunk(
  'movie/fetchMovieFrames',
  async (id) => {
    try {
      const response = await api.get(
        `/v1/image?movieId=${id}&type=frame&limit=8`
      );

      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  extraReducers: {
    [fetchMovieById.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchMovieById.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.movie = action.payload;
    },

    [fetchMovieById.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    // _________________________________________________________

    [fetchMovieFrames.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchMovieFrames.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.frames = action.payload;
    },

    [fetchMovieFrames.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default movieSlice;
