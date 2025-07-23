import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   view: "grid" || localStorage.getItem("view") || "grid",
}

const ViewSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setView: (state, action) => {
            state.view = action.payload;
            localStorage.setItem("view", action.payload);
        }
    }
})

export const { setView } = ViewSlice.actions;
export default ViewSlice.reducer;