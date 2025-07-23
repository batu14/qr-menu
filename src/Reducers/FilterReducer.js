import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    activeFilters: 0,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setActiveFilters: (state, action) => {
            state.activeFilters = action.payload
        }
    }
})

export const { setSearchValue, setActiveFilters } = filterSlice.actions
export default filterSlice.reducer