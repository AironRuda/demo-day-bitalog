import { createSlice } from '@reduxjs/toolkit';
import { IWorker } from '../model/user.model';

const initialState: { workers: IWorker[] } = {
  workers: [],
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setWorkers: (state, action) => {
      state.workers = action.payload;
    },
  },
});

export const { setWorkers } = workersSlice.actions;
export default workersSlice.reducer;
