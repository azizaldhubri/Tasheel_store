// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AutohideSnackbar from '../../Component/Dashboard/AutohideSnackbar';
 

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    deletefromCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (  existing.quantity>1) {
        existing.quantity -= 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart ,deletefromCart} = cartSlice.actions;
export default cartSlice.reducer;
