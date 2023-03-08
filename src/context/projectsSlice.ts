import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../model/activity.model';
import { Project } from '../model/projects.model';
import { fetchAllProjectsAdmin, fetchProjectsWorker } from './thunks';

const initialState: { projects: Project[]; selectedProject: string } = {
  projects: [],
  selectedProject: '',
};

const getCurrentProjectIndex = (projects: Project[], projectId: string) => {
  return projects.findIndex((projects) => projects.id === projectId);
};

const getCurrentActivityIndex = (
  projects: Project[],
  projectId: string,
  activityId: string
) => {
  const currentProjectIndex = getCurrentProjectIndex(projects, projectId);
  const currentActivityIndex = projects[
    currentProjectIndex
  ].activities.findIndex((activity) => activity.id === activityId);
  return { currentProjectIndex, currentActivityIndex };
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateStatusProject: (state, action: PayloadAction<string>) => {
      const currentProjectIndex = getCurrentProjectIndex(
        state.projects,
        action.payload
      );
      if (currentProjectIndex >= 0)
        state.projects[currentProjectIndex].completed =
          !state.projects[currentProjectIndex].completed;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      const currentProjectIndex = getCurrentProjectIndex(
        state.projects,
        state.selectedProject
      );
      if (currentProjectIndex >= 0)
        state.projects[currentProjectIndex].activities.push(action.payload);
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const { currentProjectIndex, currentActivityIndex } =
        getCurrentActivityIndex(
          state.projects,
          state.selectedProject,
          action.payload.id
        );
      if (currentActivityIndex >= 0)
        state.projects[currentProjectIndex].activities[currentActivityIndex] = {
          ...action.payload,
        };
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      const currentProjectIndex = getCurrentProjectIndex(
        state.projects,
        state.selectedProject
      );
      if (currentProjectIndex >= 0) {
        const newActivities = state.projects[
          currentProjectIndex
        ].activities.filter((activity) => activity.id !== action.payload);
        state.projects[currentProjectIndex].activities = newActivities;
      }
    },
    updateStatusActivity: (state, action: PayloadAction<string>) => {
      const { currentProjectIndex, currentActivityIndex } =
        getCurrentActivityIndex(
          state.projects,
          state.selectedProject,
          action.payload
        );
      if (currentActivityIndex >= 0) {
        state.projects[currentProjectIndex].activities[
          currentActivityIndex
        ].completed =
          !state.projects[currentProjectIndex].activities[currentActivityIndex]
            .completed;
      }
    },
    cleanProjects: (state) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllProjectsAdmin.fulfilled, (state, action) => {
      if (action.payload) state.projects = [...action.payload];
    });
    builder.addCase(fetchProjectsWorker.fulfilled, (state, action) => {
      if (action.payload) state.projects = [...action.payload];
    });
  },
});

export const getSelectedProject = (state: {
  projects: { selectedProject: string };
}) => state.projects.selectedProject;

export const {
  selectProject,
  addActivity,
  addProject,
  updateActivity,
  updateStatusActivity,
  updateStatusProject,
  deleteActivity,
  cleanProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
