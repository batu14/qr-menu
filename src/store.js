import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./Reducers/DataReducer";
import sidebarReducer from "./Reducers/SidebarReducer";
const store = configureStore({
  reducer: {
    view: viewReducer,
    sidebar: sidebarReducer,
  },
});

export default store;