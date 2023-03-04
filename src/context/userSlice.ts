import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../model/activity.model';
import { Project } from '../model/projects.model';
import { User } from '../model/user.model';
import { fetchAllProjectsAdmin, fetchUser } from './userThunks';

const initialState: User = {
  id: '',
  rol: '',
  projects: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    addActivity: (
      state,
      action: PayloadAction<{ projectId: string; activity: Activity }>
    ) => {
      const currentProject = state.projects.findIndex(
        (projects) => projects.id === action.payload.projectId
      );
      if (currentProject >= 0)
        state.projects[currentProject].activities.push(action.payload.activity);
    },
    updateActivity: (
      state,
      action: PayloadAction<{ projectId: string; activity: Activity }>
    ) => {
      const currentProject = state.projects.findIndex(
        (projects) => projects.id === action.payload.projectId
      );
      if (currentProject >= 0) {
        const currentActivity = state.projects[
          currentProject
        ].activities.findIndex(
          (activity) => activity.id === action.payload.activity.id
        );
        if (currentActivity >= 0)
          state.projects[currentProject].activities[currentActivity] =
            action.payload.activity;
      }
    },
    deleteActivity: (
      state,
      action: PayloadAction<{ activityId: string; projectId: string }>
    ) => {
      const currentProject = state.projects.findIndex(
        (projects) => projects.id === action.payload.projectId
      );
      if (currentProject >= 0) {
        const newActivities = state.projects[currentProject].activities.filter(
          (activity) => activity.id !== action.payload.activityId
        );
        state.projects[currentProject].activities = newActivities;
      }
    },
    logOut: (state) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<User | undefined>) => {
          if (action.payload) {
            state = action.payload;
          }
          return state;
        }
      )
      .addCase(fetchUser.rejected, () => {
        console.log('Hubo un error llamando al usuario');
      });
    builder.addCase(fetchAllProjectsAdmin.fulfilled, (state, action) => {
      if (action.payload) state.projects = [...action.payload];
    });
  },
});

export const {
  logOut,
  addProject,
  addActivity,
  updateActivity,
  deleteActivity,
} = userSlice.actions;
export default userSlice.reducer;
