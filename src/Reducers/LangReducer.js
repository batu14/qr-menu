import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    langCode: localStorage.getItem('langCode') || 'tr',
}

const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLangCode: (state, action) => {
            state.langCode = action.payload;
            localStorage.setItem('langCode', action.payload);
        },
    },
})

export const { setLangCode } = langSlice.actions;
export default langSlice.reducer;