import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListOrder, confirmOrder, cancelOrder, deliverOrder } from 'apis/order';

const namespace = 'order';

export const fetchGetListOrder = createAsyncThunk(`${namespace}/fetchGetListOrder`, async ({ params }) => {
  const res = await getListOrder(params);
  return res;
});

export const fetchConfirmOrder = createAsyncThunk(`${namespace}/fetchConfirmOrder`, async (params) => {
  const res = await confirmOrder(params);
  return res;
});

export const fetchCancelOrder = createAsyncThunk(`${namespace}/fetchCancelOrder`, async (params) => {
  const res = await cancelOrder(params);
  return res;
});

export const fetchDeliverOrder = createAsyncThunk(`${namespace}/fetchDeliverOrder`, async (params) => {
  const res = await deliverOrder(params);
  return res;
});

const orderSlice = createSlice({
  name: namespace,
  initialState: {
    isLoadingOrder: false,
    isLoadingConfirm: false,
    isLoadingCancel: false,
    isLoadingDeliver: false,
    params: {},
    orders: [],
    total: 0,
    page: 1,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetListOrder.pending]: (state, { meta: { arg } }) => {
      const { params, isFirst } = arg;
      state.isLoadingOrder = true;
      state.params = params;
      if (isFirst) {
        state.orders = [];
      }
    },
    [fetchGetListOrder.fulfilled]: (state, action) => {
      state.isLoadingOrder = false;
      state.orders = action.payload?.data || [];
      state.total = action.payload?.meta?.total || 0;
      state.page = action.payload?.meta?.page || 1;
    },
    [fetchGetListOrder.rejected]: (state, action) => {
      state.isLoadingOrder = false;
      state.error = action.error;
      state.orders = [];
    },

    // Confirm order
    [fetchConfirmOrder.pending]: (state) => {
      state.isLoadingConfirm = true;
    },
    [fetchConfirmOrder.fulfilled]: (state, { payload }) => {
      state.isLoadingConfirm = false;
      const index = state.orders.findIndex((item) => item?.code === payload?.data?.code);

      if (index > -1) {
        state.orders[index].status = 2;
      }
    },
    [fetchConfirmOrder.rejected]: (state, { payload }) => {
      state.isLoadingConfirm = false;
      state.error = payload?.code;
    },

    // Cancel order
    [fetchCancelOrder.pending]: (state) => {
      state.isLoadingCancel = true;
    },
    [fetchCancelOrder.fulfilled]: (state, { payload }) => {
      state.isLoadingCancel = false;
      const index = state.orders.findIndex((item) => item?.code === payload?.data?.code);

      if (index > -1) {
        state.orders[index].status = 4;
      }
    },
    [fetchCancelOrder.rejected]: (state, { payload }) => {
      state.isLoadingCancel = false;
      state.error = payload?.code;
    },

    // Deliver order
    [fetchDeliverOrder.pending]: (state) => {
      state.isLoadingDeliver = true;
    },
    [fetchDeliverOrder.fulfilled]: (state, { payload }) => {
      state.isLoadingDeliver = false;
      const index = state.orders.findIndex((item) => item?.code === payload?.data?.code);

      if (index > -1) {
        state.orders[index].status = 3;
      }
    },
    [fetchDeliverOrder.rejected]: (state, { payload }) => {
      state.isLoadingDeliver = false;
      state.error = payload?.code;
    },
  },
});

const { reducer, actions } = orderSlice;
export { actions };
export default reducer;
