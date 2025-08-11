import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from './storee/CartSlice' 

import { LoadState, SaveState } from './LocalStorage';

const preloadedState = {
  cart: LoadState() || [],
};

export const store = configureStore({
  reducer: {    
      cart: cartSlice,
  },
   preloadedState,
})

store.subscribe(() => {
  SaveState(store.getState().cart);
});