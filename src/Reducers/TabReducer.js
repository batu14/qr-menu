import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeTab: null
}

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const { setActiveTab } = tabSlice.actions
export default tabSlice.reducer