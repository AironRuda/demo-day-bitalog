import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { User } from "../model/user.model";

const initialState: User | null = null

const fetchUser = createAsyncThunk("users/fetchUser", async (id: string) => {
    const userRef = doc(db, "users", id);
    const user = await getDoc(userRef)
    return user
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logOut: (state) => {
            return state = null
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log(action.payload);
        })
    },
})

export { fetchUser }
export default userSlice.reducer