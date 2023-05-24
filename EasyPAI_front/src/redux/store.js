/**
 * @file store.js
 * @description Configures the Redux store using the @reduxjs/toolkit library.
 * @author  jhludwolf
 * @date 06.12.22
 */

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
});
