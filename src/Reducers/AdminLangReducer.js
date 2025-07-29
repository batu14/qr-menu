import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("adminLang") || "tr",
};

const adminLangSlice = createSlice({
  name: "adminLang",
  initialState,
  reducers: {
    setAdminLang: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("adminLang", action.payload);
    },
  },
});

export const { setAdminLang } = adminLangSlice.actions;
export default adminLangSlice.reducer;