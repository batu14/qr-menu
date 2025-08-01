import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./Reducers/DataReducer";
import sidebarReducer from "./Reducers/SidebarReducer";
import categoryReducer from "./Reducers/CategoryReducer";
import filterReducer from "./Reducers/FilterReducer";
import tabReducer from "./Reducers/TabReducer";
import authReducer from "./Reducers/AuthReducer";
import adminLangReducer from "./Reducers/AdminLangReducer";
import langReducer from "./Reducers/LangReducer";

const store = configureStore({
  reducer: {
    view: viewReducer,
    sidebar: sidebarReducer,
    category: categoryReducer,
    filter: filterReducer,
    tab: tabReducer,
    auth: authReducer,
    adminLang: adminLangReducer,
    lang: langReducer,
  },
});

export default store;