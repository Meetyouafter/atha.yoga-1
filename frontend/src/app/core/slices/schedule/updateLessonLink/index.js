/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import updateLessonLinkSlice from './updateLessonLink';

const initialState = {
  index: 0,
  link: '',
  linkInfo: '',
  errorMessage: '',
};

const updateLessonsLinkSlice = createSlice({
  name: 'postNewRescheduleLink',
  initialState,
  extrareducers: {
    [updateLessonLinkSlice.fulfilled]: (state, action) => {
      state.index = action.payload.index;
      state.date = action.payload.link;
      state.link_info = action.payload.linkInfo;
      state.errorMessage = null;
    },
    [updateLessonLinkSlice.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export default updateLessonsLinkSlice.reducer;
