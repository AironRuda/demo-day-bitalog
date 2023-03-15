import { Novelty } from '../model/novelties.model';
import { uuidv4 } from '@firebase/util';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { noveltyRef, storage } from '../firebase/config';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { store } from '../context/store';

export const handleCreateNovelty = async (
  id: string,
  text: string,
  img: File | null
) => {
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
};

export const handleDeleteNotify = async (id: string, novelties: Novelty[]) => {
  const currentProjectId = store.getState().projects.selectedProject;
  await updateDoc(noveltyRef(currentProjectId), {
    novelties: novelties.filter((novelty: Novelty) => novelty.noveltyId !== id),
  });
};
