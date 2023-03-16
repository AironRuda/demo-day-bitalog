import { createSlice } from "@reduxjs/toolkit";
import { User } from "../model/user.model";

const initialState: { workers: Pick<User, "name" | "id">[] } = {
    workers: []
}

const workersSlice = createSlice({
    name: "workers",
    initialState,
    reducers: {
        setWorkers: (state, action) => {
            state.workers = action.payload
        }
    }
})

export const { setWorkers } = workersSlice.actions
export default workersSlice.reducer