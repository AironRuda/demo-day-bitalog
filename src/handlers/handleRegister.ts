import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { RegisterDTO } from '../model/user.model';

export const registerHandle = async (values: RegisterDTO) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await setDoc(doc(db, 'users', response.user.uid), {
      rol: values.rol,
      name: values.name,
    });
    return response;
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};
