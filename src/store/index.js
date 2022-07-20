import { configureStore } from '@reduxjs/toolkit';
import login from 'containers/Pages/Login/reducer';
import app from 'containers/App/reducer';
import dashboard from 'containers/Pages/Dashboard/reducer';
import categories from 'containers/Pages/Categories/reducer';
import products from 'containers/Pages/Products/reducer';
import orders from 'containers/Pages/Orders/reducer';
import users from 'containers/Pages/Users/reducer';

export const store = configureStore({
  reducer: {
    login,
    app,
    dashboard,
    categories,
    products,
    orders,
    users,
  },
});
