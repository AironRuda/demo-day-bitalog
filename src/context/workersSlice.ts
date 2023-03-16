import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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