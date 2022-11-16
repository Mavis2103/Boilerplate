import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const countThunk = createAsyncThunk(
	"count/detailApi",
	async (params, thunkApi) => {
		// call api here
	},
);

export { countThunk };
