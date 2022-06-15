import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkLogged, logout } from 'apis/auth';

const namespace = 'app';

export const fetchCheckLogged = createAsyncThunk(`${namespace}/fetchCheckLogged`, async () => {
  return await checkLogged();
});

export const fetchLogout = createAsyncThunk(`${namespace}/fetchLogout`, async () => {
  return await logout();
});

const appSlice = createSlice({
  name: namespace,
  initialState: {
    isLoading: false,
    isLoadingLogout: false,
    user: null,
    error: null,
    isLogin: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
  extraReducers: {
    [fetchCheckLogged.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCheckLogged.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = null;
      state.isLogin = true;
    },
    [fetchCheckLogged.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },

    [fetchLogout.pending]: (state) => {
      state.isLoadingLogout = true;
    },
    [fetchLogout.fulfilled]: (state) => {
      state.isLoadingLogout = false;
      state.user = null;
      state.error = null;
      state.isLogin = false;
    },
    [fetchLogout.rejected]: (state, { error }) => {
      state.isLoadingLogout = false;
      state.error = error.message;
    },
  },
});

const { reducer, actions } = appSlice;

export { actions };
export default reducer;
