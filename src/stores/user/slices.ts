import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  info: null as unknown,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
  extraReducers({addCase, addDefaultCase, addMatcher}) {},
});

const {reducer: userReducer, actions: userActions} = userSlice;

export {userReducer, userActions};
