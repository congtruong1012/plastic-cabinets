import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, getListUser } from 'apis/user';
import { removeRoleMember, setRoleMember } from '../../../apis/user';

const namespace = 'user';

export const fetchGetListUser = createAsyncThunk(`${namespace}/fetchGetListUser`, async ({ params }) => {
  const res = await getListUser(params);
  return res;
});

export const fetchCreateUser = createAsyncThunk(`${namespace}/fetchCreateUser`, async (params) => {
  const res = await createUser(params);
  return res;
});

export const fetchSetRoleMember = createAsyncThunk(`${namespace}/fetchSetRoleMember`, async (params) => {
  const res = await setRoleMember(params);
  return res;
});

export const fetchRemoveRoleMember = createAsyncThunk(`${namespace}/fetchRemoveRoleMember`, async (params) => {
  const res = await removeRoleMember(params);
  return res;
});

const userSlice = createSlice({
  name: namespace,

  initialState: {
    isLoading: false,
    isLoadingCreate: false,
    isLoadingSet: false,
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

    [fetchSetRoleMember.pending]: (state) => {
      state.isLoadingSet = true;
    },
    [fetchSetRoleMember.fulfilled]: (state, { payload }) => {
      state.isLoadingSet = false;
      const index = state.list.findIndex((item) => item.id === payload?.id);
      if (index > -1) {
        state.list[index].role = payload?.role;
      }
    },
    [fetchSetRoleMember.rejected]: (state, { error }) => {
      state.isLoadingSet = false;
      state.error = error;
    },

    [fetchRemoveRoleMember.pending]: (state) => {
      state.isLoadingSet = true;
    },
    [fetchRemoveRoleMember.fulfilled]: (state, { payload }) => {
      state.isLoadingSet = false;
      const index = state.list.findIndex((item) => item.id === payload?.id);
      if (index > -1) {
        state.list[index].role = payload?.role;
      }
    },
    [fetchRemoveRoleMember.rejected]: (state, { error }) => {
      state.isLoadingSet = false;
      state.error = error;
    },
  },
});

export const { isLoading, isLoadingCreate, params, list, total, error } = userSlice.reducer;

export default userSlice.reducer;
