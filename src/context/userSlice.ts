import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../model/activity.model';
import { Project } from '../model/projects.model';
import { User } from '../model/user.model';
import {
  fetchAllProjectsAdmin,
  fetchProjectsWorker,
  fetchUser,
} from './userThunks';

const initialState: User = {
  id: '',
  rol: '',
  projects: [],
};

const getCurrentProjectIndex = (state: User, projectId: string) => {
  return state.projects.findIndex((projects) => projects.id === projectId);
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
      const currentProjectIndex = getCurrentProjectIndex(
        state,
        action.payload.projectId
      );
      if (currentProjectIndex >= 0)
        state.projects[currentProjectIndex].activities.push(
          action.payload.activity
        );
    },
    updateActivity: (
      state,
      action: PayloadAction<{ projectId: string; activity: Activity }>
    ) => {
      const currentProjectIndex = getCurrentProjectIndex(
        state,
        action.payload.projectId
      );
      if (currentProjectIndex >= 0) {
        const currentActivityIndex = state.projects[
          currentProjectIndex
        ].activities.findIndex(
          (activity) => activity.id === action.payload.activity.id
        );
        if (currentActivityIndex >= 0)
          state.projects[currentProjectIndex].activities[currentActivityIndex] =
            action.payload.activity;
      }
    },
    deleteActivity: (
      state,
      action: PayloadAction<{ activityId: string; projectId: string }>
    ) => {
      const currentProjectIndex = getCurrentProjectIndex(
        state,
        action.payload.projectId
      );
      if (currentProjectIndex >= 0) {
        const newActivities = state.projects[
          currentProjectIndex
        ].activities.filter(
          (activity) => activity.id !== action.payload.activityId
        );
        state.projects[currentProjectIndex].activities = newActivities;
      }
    },
    updateStatusActivity: (
      state,
      action: PayloadAction<{ activityId: string; projectId: string }>
    ) => {
      const currentProjectIndex = getCurrentProjectIndex(
        state,
        action.payload.projectId
      );
      if (currentProjectIndex >= 0) {
        const currentActivityIndex = state.projects[
          currentProjectIndex
        ].activities.findIndex(
          (activity) => activity.id === action.payload.activityId
        );
        if (currentActivityIndex >= 0) {
          state.projects[currentProjectIndex].activities[
            currentActivityIndex
          ].completed =
            !state.projects[currentProjectIndex].activities[
              currentActivityIndex
            ].completed;
        }
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
    builder.addCase(fetchProjectsWorker.fulfilled, (state, action) => {
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
  updateStatusActivity,
} = userSlice.actions;
export default userSlice.reducer;
