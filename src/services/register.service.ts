import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { auth, userRef } from '../firebase/config';
import { RegisterDTO } from '../model/user.model';

export const createUser = async (values: RegisterDTO) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await setDoc(userRef(response.user.uid), {
      rol: values.rol,
      name: values.name,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
