import { createAsyncThunk } from '@reduxjs/toolkit';
import ScheduleService from '../../../services/shedule';

const updateLessonDateSlice = createAsyncThunk(
  'courses/reschedule-lesson',
  async ({ index, date }, thunkAPI) => {
    try {
      const result = await ScheduleService.postNewLessonDate(index, date);
      return result.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default updateLessonDateSlice;
