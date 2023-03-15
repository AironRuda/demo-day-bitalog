import { FirebaseError } from 'firebase/app';
import { RegisterDTO } from '../model/user.model';
import { createUser } from '../services/register.service';

export const registerHandle = async (values: RegisterDTO) => {
  try {
    return await createUser(values);
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};
