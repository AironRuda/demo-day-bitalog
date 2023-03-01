import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { User } from "../model/user.model";

const initialState: User = {
    id: "",
    rol: "",
    projects: []
}

const fetchUser = createAsyncThunk("users/fetchUser", async (id: string) => {
    const userRef = doc(db, "users", id);
    const firebaseUserDocument = await (await getDoc(userRef)).data()
    if (firebaseUserDocument) {
        const rol = firebaseUserDocument.rol
        const user: User = { id, projects: [], rol }
        return user
    }
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logOut: (state) => {
            return initialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
                if (action.payload) {
                    state = action.payload
                }
                return state
            })
            .addCase(fetchUser.rejected, () => {
                console.log("Hubo un error llamando al usuario");
            })
    },
})

export { fetchUser }
export default userSlice.reducer