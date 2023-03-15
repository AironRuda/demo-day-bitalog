import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../model/user.model';
import { fetchUser } from './thunks';

const initialState: Omit<User, 'projects'> = {
  id: '',
  rol: '',
  name: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<Omit<User, 'projects'> | undefined>) => {
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
