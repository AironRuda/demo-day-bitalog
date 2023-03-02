import userReducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import selectedProjectReducer from "./selectedProjectSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        selectedProject: selectedProjectReducer
    }
})


