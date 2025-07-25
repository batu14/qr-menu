import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
  categoryId: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      window.localStorage.setItem("categories", JSON.stringify(action.payload));
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
      console.log(state.categoryId);
    },
  },
});

export const { setCategories, setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
