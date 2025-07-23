import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./Reducers/DataReducer";
import sidebarReducer from "./Reducers/SidebarReducer";
import categoryReducer from "./Reducers/CategoryReducer";
import filterReducer from "./Reducers/FilterReducer";
const store = configureStore({
  reducer: {
    view: viewReducer,
    sidebar: sidebarReducer,
    category: categoryReducer,
    filter: filterReducer,
  },
});

export default store;