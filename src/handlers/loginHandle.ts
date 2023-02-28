import LoginValues from "../model/login.model";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { FirebaseError } from "firebase/app";


export const handleLogin = async (values: LoginValues) => {
    try {
        await signInWithEmailAndPassword(auth, values.email, values.password)
    } catch (error) {
        if (error instanceof FirebaseError) return error.message
    }
}

