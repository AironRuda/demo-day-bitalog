import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { RegisterDTO } from '../model/user.model';

export const registerHandle = async (values: RegisterDTO) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    return response;
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};
