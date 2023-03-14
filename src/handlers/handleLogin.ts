import LoginValues from '../model/login.model';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FirebaseError } from 'firebase/app';

export const handleLogin = async (values: LoginValues) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};
