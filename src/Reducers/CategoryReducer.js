import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
            window.localStorage.setItem("categories", JSON.stringify(action.payload))
        }
    }
})

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer