import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListUser, createUser } from 'apis/user';

const namespace = 'user';

export const fetchGetListUser = createAsyncThunk(`${namespace}/fetchGetListUser`, async ({ params }) => {
  const res = await getListUser(params);
  return res;
});

export const fetchCreateUser = createAsyncThunk(`${namespace}/fetchCreateUser`, async (params) => {
  const res = await createUser(params);
  return res;
});

const userSlice = createSlice({
  name: namespace,

  initialState: {
    isLoading: false,
    isLoadingCreate: false,
    params: {},
    list: [],
    total: 0,
    error: null,
  },
  extraReducers: {
    [fetchGetListUser.pending]: (state, { meta: { arg } }) => {
      state.isLoading = true;
      state.params = arg.params;
      if (arg.isFirst) {
        state.list = [];
      }
    },
    [fetchGetListUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.data || [];
      state.total = +payload?.meta?.total || 0;
    },
    [fetchGetListUser.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    },

    [fetchCreateUser.pending]: (state) => {
      state.isLoadingCreate = true;
    },
    [fetchCreateUser.fulfilled]: (state) => {
      state.isLoadingCreate = false;
    },
    [fetchCreateUser.rejected]: (state, { error }) => {
      state.isLoadingCreate = false;
      state.error = error;
    },
  },
});

export const { isLoading, isLoadingCreate, params, list, total, error } = userSlice.reducer;

export default userSlice.reducer;
