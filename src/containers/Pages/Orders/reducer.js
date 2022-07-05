import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListOrder } from 'apis/order';

const namespace = 'order';

export const fetchGetListOrder = createAsyncThunk(`${namespace}/fetchGetListOrder`, async (params) => {
  const res = await getListOrder(params);
  return res;
});

const orderSlice = createSlice({
  name: namespace,
  initialState: {
    isLoadingOrder: false,
    params: {},
    orders: [],
    total: 0,
    page: 1,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetListOrder.pending]: (state, { meta: { arg } }) => {
      state.isLoadingOrder = true;
      state.params = arg;
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
    },
  },
});

const { reducer, actions } = orderSlice;
export { actions };
export default reducer;
