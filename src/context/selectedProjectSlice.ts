import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = ""

const selectedProjectSlices = createSlice({
    name: "selectedProject",
    initialState,
    reducers: {
        selectProject: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
    extraReducers(builder) {

    },
})

export const selectedProject = (state: { selectedProject: string }) => state.selectedProject;

export const { selectProject } = selectedProjectSlices.actions
export default selectedProjectSlices.reducer;