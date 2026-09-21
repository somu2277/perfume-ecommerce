import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totals: { subtotal: 0, discount: 0, grandTotal: 0 },
  isOpen: false,
  isLoading: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.totals = action.payload.totals;
    },
    toggleCart: (state, action) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setCart, toggleCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
