import { uuidv4 } from '@firebase/util';
import {
  arrayUnion,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { store } from '../context/store';
import { noveltyRef, storage } from '../firebase/config';
import { Novelty } from '../model/novelties.model';

export const listenNovelty = async (
  id: string,
  callback: (novelties: DocumentSnapshot<DocumentData>) => void
) => {
  return onSnapshot(
    noveltyRef(id),
    (novelties: DocumentSnapshot<DocumentData>) => {
      callback(novelties);
    }
  );
};

export const createNovelty = async (
  id: string,
  text: string,
  img: File | null
) => {
  try {
    const currentProjectId = store.getState().projects.selectedProject;
    const noveltyInfo: Novelty = {
      noveltyId: uuidv4(),
      senderId: id,
      text,
    };
    let url = '';
    if (img) {
      const storageRef = ref(storage, uuidv4());
      await uploadBytesResumable(storageRef, img);
      url = await getDownloadURL(storageRef);
    }
    await updateDoc(noveltyRef(currentProjectId), {
      novelties: arrayUnion(img ? { ...noveltyInfo, img: url } : noveltyInfo),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteNovelty = async (id: string, novelties: Novelty[]) => {
  const currentProjectId = store.getState().projects.selectedProject;
  return await updateDoc(noveltyRef(currentProjectId), {
    novelties: novelties.filter((novelty: Novelty) => novelty.noveltyId !== id),
  });
};
