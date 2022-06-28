import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDashboard, getNewestOrder } from 'apis/dashboard';

const namespace = 'dashboard';

export const fetchGetDashboard = createAsyncThunk(`${namespace}/fetchGetDashboard`, async (params) => {
  return await getDashboard(params);
});

export const fetchGetNewestOrder = createAsyncThunk(`${namespace}/fetchGetNewestOrder`, async () => {
  return await getNewestOrder();
});

const dashboardSlice = createSlice({
  name: namespace,
  initialState: {
    isLoadingDashboard: false,
    isLoadingNewestOrder: false,
    params: {},
    dashboard: [],
    newsestOrder: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetDashboard.pending]: (state, { meta: { arg } }) => {
      state.isLoadingDashboard = true;
      state.params = arg;
    },
    [fetchGetDashboard.fulfilled]: (state, { payload }) => {
      state.isLoadingDashboard = false;
      state.dashboard = payload;
      state.error = null;
    },
    [fetchGetDashboard.rejected]: (state, { error }) => {
      state.isLoadingDashboard = false;
      state.error = error.message;
    },

    [fetchGetNewestOrder.pending]: (state) => {
      state.isLoadingNewestOrder = true;
    },
    [fetchGetNewestOrder.fulfilled]: (state, { payload }) => {
      state.isLoadingNewestOrder = false;
      state.newsestOrder = payload;
      state.error = null;
    },
    [fetchGetNewestOrder.rejected]: (state, { error }) => {
      state.isLoadingNewestOrder = false;
      state.error = error.message;
    },
  },
});

const { reducer, actions } = dashboardSlice;
export { actions };
export default reducer;
