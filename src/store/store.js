import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
  films: toolkitSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;