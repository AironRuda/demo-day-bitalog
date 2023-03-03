import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { searchProjectsAdmin } from '../firebase/queries';
import { Activity, createActivitiesDTO } from '../model/activity.model';
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

export const selectUser = (state: { user: User }) => state.user;
export const selectProjects = (state: { user: User }) => state.user.projects;

export const getCurrentProject = (
  state: { user: { projects: Project[] } },
  projectId: string
) => {
  return state.user.projects.find((projects) => projects.id === projectId);
};

export { fetchUser, fetchAllProjectsAdmin };
export const { logOut, addProject, addActivity } = userSlice.actions;
export default userSlice.reducer;
