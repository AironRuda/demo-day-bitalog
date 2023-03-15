import { Novelty } from '../model/novelties.model';
import { createNovelty, deleteNovelty } from '../services/novelty.service';

export const handleCreateNovelty = async (
  id: string,
  text: string,
  img: File | null
) => {
  try {
    await createNovelty(id, text, img);
  } catch (error) {
    return error;
  }
};

export const handleDeleteNotify = async (id: string, novelties: Novelty[]) => {
  try {
    await deleteNovelty(id, novelties);
  } catch (error) {
    return error;
  }
};
