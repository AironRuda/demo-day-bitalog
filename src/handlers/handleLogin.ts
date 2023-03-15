import { LoginValues } from '../model/login.model';
import { FirebaseError } from 'firebase/app';
import { login } from '../services/login.service';

export const handleLogin = async (values: LoginValues) => {
  try {
    return await login(values);
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};
