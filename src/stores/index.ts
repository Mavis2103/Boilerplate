import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { countReducer } from "./count/slice";

const rootReducer = combineReducers({
	countStore: countReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
