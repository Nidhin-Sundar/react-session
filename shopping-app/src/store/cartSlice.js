import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // Add product or increase quantity
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // Remove one unit (decrease quantity by 1)
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },

    // Delete product entirely from cart
    deleteFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // Clear the entire cart
    clearCart(state) {
      state.items = [];
    },
  },
});

// Action creators
export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
