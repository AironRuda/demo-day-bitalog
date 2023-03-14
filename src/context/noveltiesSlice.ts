import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Novelties, Novelty } from "../model/novelties.model";

const initialState: Novelties = {
    novelties: []
}

const noveltiesSlice = createSlice({
    name: "novelties",
    initialState,
    reducers: {
        setNovelties: (state: Novelties, action: PayloadAction<Novelty[]>) => {
            state.novelties = action.payload
        }
    }
})

export const getNovelties = (state: { novelties: Novelties }) => state.novelties.novelties
export const { setNovelties } = noveltiesSlice.actions
export default noveltiesSlice.reducer