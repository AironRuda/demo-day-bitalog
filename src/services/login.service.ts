import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { LoginValues } from '../model/login.model';

export const login = async (values: LoginValues) => {
  return await signInWithEmailAndPassword(auth, values.email, values.password);
};
