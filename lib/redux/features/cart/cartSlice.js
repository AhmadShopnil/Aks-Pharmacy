import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart slice for client-side cart state management
 * Handles add, remove, update, and clear cart 
 */

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to cart
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if (existingItem) {
                // Item already exists, increase quantity
                existingItem.quantity += newItem.quantity || 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                // New item, add to cart
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: newItem.quantity || 1,
                    totalPrice: newItem.price * (newItem.quantity || 1),
                    img: newItem.img,
                    discount: newItem.discount,
                });
            }

            // Recalculate totals
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },

        // Remove item from cart
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);

            // Recalculate totals
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },

        // Update item quantity
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or negative
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    existingItem.quantity = quantity;
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                }

                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },

        // Clear all items from cart
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },

        // Increment item quantity
        incrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;

                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },

        // Decrement item quantity
        decrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    // Remove item if quantity becomes 0
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    existingItem.quantity -= 1;
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                }

                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },
    },
});

// Export actions
export const {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    incrementQuantity,
    decrementQuantity,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartCount = (state) => state.cart.totalQuantity;
export const selectCartItemsCount = (state) => state.cart.items?.length;
export const selectCartItemById = (id) => (state) =>
    state.cart.items.find((item) => item.id === id);

// Export reducer
export default cartSlice.reducer;
