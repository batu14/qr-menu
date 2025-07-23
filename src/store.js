import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./Reducers/DataReducer";

const store = configureStore({
  reducer: {
    view: viewReducer,
  },
});

export default store;