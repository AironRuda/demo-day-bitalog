import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { searchProjectsAdmin } from '../firebase/queries';
import { Activity } from '../model/activity.model';
import { Project } from '../model/projects.model';
import { User } from '../model/user.model';

const initialState: User = {
  id: '',
  rol: '',
  projects: [],
};

const fetchUser = createAsyncThunk('users/fetchUser', async (id: string) => {
  const userRef = doc(db, 'users', id);
  const firebaseUserDocument = await (await getDoc(userRef)).data();
  if (firebaseUserDocument) {
    const rol = firebaseUserDocument.rol;
    const user: User = { id, projects: [], rol };
    return user;
  }
});

const fetchAllProjectsAdmin = createAsyncThunk(
  'users/fetchAllProjectsAdmin',
  async (args, { getState }) => {
    const { user } = getState() as { user: User };
    if (user.id) {
      const projects = await (
        await getDocs(searchProjectsAdmin(user.id))
      ).docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      return projects as Project[] | undefined;
    }
  }
);

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

export { fetchUser, fetchAllProjectsAdmin };
export const {
  logOut,
  addProject,
  addActivity,
  updateActivity,
  deleteActivity,
} = userSlice.actions;
export default userSlice.reducer;
