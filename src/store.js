// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../CartSlice'; // Adjust path if CartSlice is in a different folder

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
