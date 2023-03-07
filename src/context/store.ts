import userReducer from './userSlice';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
});
