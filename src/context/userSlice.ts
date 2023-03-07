import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../model/activity.model';
import { Project } from '../model/projects.model';
import { User } from '../model/user.model';
import {
  fetchAllProjectsAdmin,
  fetchProjectsWorker,
  fetchUser,
} from './thunks';

const initialState: Pick<User, 'id' | 'rol'> = {
  id: '',
  rol: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
