import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListCategory, creUpdCategory, deleteCategory } from 'apis/category';

const namespace = 'category';

export const fetchGetListCategory = createAsyncThunk(`${namespace}/fetchGetListCategory`, async ({ params }) => {
  return await getListCategory(params);
});

export const fetchCreUpdCategory = createAsyncThunk(`${namespace}/fetchCreUpdCategory`, async (body) => {
  return await creUpdCategory(body);
});

export const fetchDeleteCategory = createAsyncThunk(`${namespace}/fetchDeleteCategory`, async (id) => {
  return await deleteCategory(id);
});

const categorySlice = createSlice({
  name: namespace,
  initialState: {
    isLoading: false,
    isLoadingCreUpd: false,
    isLoadingDelete: false,
    params: {},
    data: [],
    total: 0,
    page: 1,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetListCategory.pending]: (state, { meta: { arg } }) => {
      const { params, isFirst } = arg;
      state.isLoading = true;
      state.params = params;
      if (isFirst) {
        state.data = [];
      }
    },
    [fetchGetListCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
      state.total = payload?.meta?.total;
      state.page = payload?.meta?.page;
      state.error = null;
    },
    [fetchGetListCategory.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
      state.data = [];
    },

    [fetchCreUpdCategory.pending]: (state) => {
      state.isLoadingCreUpd = true;
    },
    [fetchCreUpdCategory.fulfilled]: (state) => {
      state.isLoadingCreUpd = false;
      state.error = null;
    },
    [fetchCreUpdCategory.rejected]: (state, { error }) => {
      state.isLoadingCreUpd = false;
      state.error = error.message;
    },

    [fetchDeleteCategory.pending]: (state) => {
      state.isLoadingDelete = true;
    },
    [fetchDeleteCategory.fulfilled]: (state) => {
      state.isLoadingDelete = false;
      state.error = null;
    },
    [fetchDeleteCategory.rejected]: (state, { error }) => {
      state.isLoadingDelete = false;
      state.error = error.message;
    },
  },
});

const { reducer, actions } = categorySlice;
export { actions };
export default reducer;
