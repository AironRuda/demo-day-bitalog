import { createSlice } from "@reduxjs/toolkit";

const initialState: string = ""

const selectedProjectSlices = createSlice({
    name: "selectedProject",
    initialState,
    reducers: {
    },
    extraReducers(builder) {

    },
})

export default selectedProjectSlices.reducer;