import api from '@/api/api';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  person: null,
  status: null,
  error: null,
};

export const fetchPersonById = createAsyncThunk(
  'person/fetchPersonById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/v1/person?id=${id}&selectFields=name enName photo birthday death age countAwards profession facts movies`
      );
      return response.data.docs[0];
    } catch (error) {
      rejectWithValue(error.code);
    }
  }
);

const personSlice = createSlice({
  name: 'person',
  initialState,
  extraReducers: {
    [fetchPersonById.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchPersonById.fulfilled]: (state, action) => {
      state.status = 'resolved';
      console.log('resolved');

      state.person = action.payload;
    },

    [fetchPersonById.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default personSlice;
