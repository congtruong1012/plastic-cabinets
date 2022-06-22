import { configureStore } from '@reduxjs/toolkit';
import login from 'containers/Pages/Login/reducer';
import app from 'containers/App/reducer';
import categories from 'containers/Pages/Categories/reducer';

export const store = configureStore({
  reducer: {
    login,
    app,
    categories,
  },
});
