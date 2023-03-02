import { collection, query, where } from 'firebase/firestore';
import { db } from './config';

export const searchProjectsAdmin = (id: string) => {
  return query(collection(db, 'projects'), where('adminId', '==', id));
};

export const searchWorkers = query(
  collection(db, 'users'),
  where('rol', '==', 'worker')
);