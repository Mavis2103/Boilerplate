import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const initialState = {
	count: 0 as number,
};

const countSlice = createSlice({
	initialState,
	name: "count",
	reducers: {
		inscrement: (state, action) => {
			return {
				...state,
				count: state.count++,
			};
		},
	},
	extraReducers({ addCase, addDefaultCase, addMatcher }) {},
});

const { reducer: countReducer, actions: countActions } = countSlice;

export { countReducer, countActions };
