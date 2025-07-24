import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./Reducers/DataReducer";
import sidebarReducer from "./Reducers/SidebarReducer";
import categoryReducer from "./Reducers/CategoryReducer";
import filterReducer from "./Reducers/FilterReducer";
import tabReducer from "./Reducers/TabReducer";
const store = configureStore({
  reducer: {
    view: viewReducer,
    sidebar: sidebarReducer,
    category: categoryReducer,
    filter: filterReducer,
    tab: tabReducer,
  },
});

export default store;