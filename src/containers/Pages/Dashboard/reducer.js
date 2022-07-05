import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTurnover, getDashboard, getNewestOrder } from 'apis/order';

const namespace = 'dashboard';

export const fetchGetTurnover = createAsyncThunk(`${namespace}/fetchGetTurnover`, async (params) => {
  const res = await getTurnover(params);
  return res;
});

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
    isLoadingTurnover: false,
    isLoadingNewestOrder: false,
    params: {},
    turnover: {},
    dashboard: {},
    newsestOrder: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetTurnover.pending]: (state) => {
      state.isLoadingTurnover = true;
    },
    [fetchGetTurnover.fulfilled]: (state, action) => {
      state.isLoadingTurnover = false;
      state.turnover = action.payload;
    },
    [fetchGetTurnover.rejected]: (state, action) => {
      state.isLoadingTurnover = false;
      state.error = action.error;
    },
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
