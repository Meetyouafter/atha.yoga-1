import { createAsyncThunk } from '@reduxjs/toolkit';
import ScheduleService from '../../../../services/shedule';

const updateLessonLinkSlice = createAsyncThunk(
  'courses/reschedule-lesson-link',
  async ({ index, link, linkInfo }, thunkAPI) => {
    try {
      const result = await ScheduleService.postNewLessonLink(index, link, linkInfo);
      return result.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default updateLessonLinkSlice;
