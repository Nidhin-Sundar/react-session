import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    // Add to wishlist (only if not already present)
    addToWishlist(state, action) {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product);
      }
    },

    // Remove from wishlist by id
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // Toggle: add if not present, remove if present
    toggleWishlist(state, action) {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
    },

    // Clear the entire wishlist
    clearWishlist(state) {
      state.items = [];
    },
  },
});

// Action creators
export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id);

export default wishlistSlice.reducer;
