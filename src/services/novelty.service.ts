import { DocumentData, DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { noveltyRef } from '../firebase/config';

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
