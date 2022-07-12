import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListProduct, getDetailProduct, creUpdProduct, deleteProduct } from 'apis/product';
import { getAllCategory } from 'apis/category';
const namespace = 'product';

export const fetchGetListProduct = createAsyncThunk(`${namespace}/fetchGetListProduct`, async ({ params }) => {
  return await getListProduct(params);
});

export const fetchGetAllCategory = createAsyncThunk(`${namespace}/fetchGetAllCategory`, async (params) => {
  return await getAllCategory(params);
});

export const fetchGetDetailProduct = createAsyncThunk(`${namespace}/fetchGetDetailProduct`, async (params) => {
  return await getDetailProduct(params);
});

export const fetchCreUpdProduct = createAsyncThunk(`${namespace}/fetchCreUpdProduct`, async (body) => {
  return await creUpdProduct(body);
});

export const fetchDeleteProduct = createAsyncThunk(`${namespace}/fetchDeleteProduct`, async (id) => {
  return await deleteProduct(id);
});

const productSlice = createSlice({
  name: namespace,
  initialState: {
    isLoading: false,
    isLoadingDetail: false,
    isLoadingCreUpd: false,
    isLoadingDelete: false,
    isLoadingCategory: false,
    params: {},
    data: [],
    product: {},
    categories: [],
    total: 0,
    page: 1,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetAllCategory.pending]: (state) => {
      state.isLoadingCategory = true;
    },
    [fetchGetAllCategory.fulfilled]: (state, { payload }) => {
      state.isLoadingCategory = false;
      state.categories = payload;
      state.error = null;
    },
    [fetchGetAllCategory.rejected]: (state, { error }) => {
      state.isLoadingCategory = false;
      state.error = error.message;
      state.categories = [];
    },

    [fetchGetListProduct.pending]: (state, { meta: { arg } }) => {
      const { params, isFirst } = arg;
      state.isLoading = true;
      state.params = params;
      if (isFirst) {
        state.data = [];
      }
    },
    [fetchGetListProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
      state.total = payload?.meta?.total;
      state.page = payload?.meta?.page;
      state.error = null;
    },
    [fetchGetListProduct.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
      state.product = [];
    },

    [fetchGetDetailProduct.pending]: (state) => {
      state.isLoadingDetail = true;
    },
    [fetchGetDetailProduct.fulfilled]: (state, { payload }) => {
      state.isLoadingDetail = false;
      state.product = payload;
      state.error = null;
    },
    [fetchGetDetailProduct.rejected]: (state, { error }) => {
      state.isLoadingDetail = false;
      state.error = error.message;
    },

    [fetchCreUpdProduct.pending]: (state) => {
      state.isLoadingCreUpd = true;
    },
    [fetchCreUpdProduct.fulfilled]: (state) => {
      state.isLoadingCreUpd = false;
      state.error = null;
    },
    [fetchCreUpdProduct.rejected]: (state, { error }) => {
      state.isLoadingCreUpd = false;
      state.error = error.message;
    },

    [fetchDeleteProduct.pending]: (state) => {
      state.isLoadingDelete = true;
    },
    [fetchDeleteProduct.fulfilled]: (state) => {
      state.isLoadingDelete = false;
      state.error = null;
    },
    [fetchDeleteProduct.rejected]: (state, { error }) => {
      state.isLoadingDelete = false;
      state.error = error.message;
    },
  },
});

const { reducer, actions } = productSlice;
export { actions };
export default reducer;
