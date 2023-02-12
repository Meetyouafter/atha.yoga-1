/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import updateLessonDateSlice from './updateLessonDate';

const initialState = {
  index: 0,
  date: null,
  errorMessage: '',
};

const updateLessonsDateSlice = createSlice({
  name: 'postNewDate',
  initialState,
  extrareducers: {
    [updateLessonDateSlice.fulfilled]: (state, action) => {
      state.index = action.payload.index;
      state.date = action.payload.date;
      state.errorMessage = null;
    },
    [updateLessonDateSlice.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export default updateLessonsDateSlice.reducer;
