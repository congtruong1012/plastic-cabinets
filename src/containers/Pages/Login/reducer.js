import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'apis/auth';

const namespace = 'login';

export const fetchLogin = createAsyncThunk(`${namespace}/fetchLogin`, async (params) => {
  return await login(params);
});

const loginSlice = createSlice({
  name: namespace,
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.error = null;
    },
    [fetchLogin.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
  },
});

const { reducer } = loginSlice;

export default reducer;
