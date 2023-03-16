import userReducer from './userSlice';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import noveltiesReducer from './noveltiesSlice';
import workersReducer from './workersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    novelties: noveltiesReducer,
    Workers: workersReducer
  },
});
