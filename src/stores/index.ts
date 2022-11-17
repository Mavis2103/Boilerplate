import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {userReducer} from './user/slices';

const rootReducer = combineReducers({
  userStore: userReducer,
});

// run when open app
const store = configureStore({
  reducer: rootReducer,
});

export default store;
