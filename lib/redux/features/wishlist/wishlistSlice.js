import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const product = action.payload;
            const existingIndex = state.items.findIndex(item => item.id === product.id);

            if (existingIndex >= 0) {
                // Remove if already exists
                state.items.splice(existingIndex, 1);
            } else {
                // Add if not exists
                state.items.push(product);
            }
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        clearWishlist: (state) => {
            state.items = [];
        }
    }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (id) => (state) =>
    state.wishlist.items.some(item => item.id === id);

export default wishlistSlice.reducer;
