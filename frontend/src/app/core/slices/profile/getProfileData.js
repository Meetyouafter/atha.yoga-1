import { createAsyncThunk } from '@reduxjs/toolkit';
import ProfileService from '../../../services/profile';

const getProfileDataSlice = createAsyncThunk(
  'core/profile',
  async (userID, thunkAPI) => {
    try {
      const result = await ProfileService.getProfileData(userID);

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getProfileDataSlice;
