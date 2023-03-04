import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { searchProjectsAdmin, searchProjectsWorker } from '../firebase/queries';
import { Project } from '../model/projects.model';
import { User } from '../model/user.model';

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: string) => {
    const userRef = doc(db, 'users', id);
    const firebaseUserDocument = await (await getDoc(userRef)).data();
    if (firebaseUserDocument) {
      const rol = firebaseUserDocument.rol;
      const user: User = { id, projects: [], rol };
      return user;
    }
  }
);

export const fetchAllProjectsAdmin = createAsyncThunk(
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

export const fetchProjectsWorker = createAsyncThunk(
  'users/fetchProjectsWorker',
  async (args, { getState }) => {
    const { user } = getState() as { user: User };
    if (user.id) {
      const projects = await (
        await getDocs(searchProjectsWorker(user.id))
      ).docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      return projects as Project[] | undefined;
    }
  }
);
