import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
            window.localStorage.setItem("sidebar", state.isOpen)
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer