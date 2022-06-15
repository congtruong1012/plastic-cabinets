import { configureStore } from '@reduxjs/toolkit';
import login from 'containers/Pages/Login/reducer';
import app from 'containers/App/reducer';

export const store = configureStore({
  reducer: {
    login,
    app,
  },
});
