import { createSlice } from '@reduxjs/toolkit';

/**
 * UI slice for global UI state management
 * Handles sidebar, modals, notifications, and loading states
 */

const initialState = {
    sidebarOpen: false,
    mobileMenuOpen: false,
    cartDrawerOpen: false,
    isLoading: false,
    notification: {
        show: false,
        message: '',
        type: 'info', // 'success', 'error', 'warning', 'info'
    },
    modal: {
        isOpen: false,
        type: null,
        data: null,
    },
    authModalOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // Toggle sidebar
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },

        // Set sidebar state
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },

        // Toggle mobile menu
        toggleMobileMenu: (state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },

        // Set mobile menu state
        setMobileMenuOpen: (state, action) => {
            state.mobileMenuOpen = action.payload;
        },

        // Toggle cart drawer
        toggleCartDrawer: (state) => {
            state.cartDrawerOpen = !state.cartDrawerOpen;
        },

        // Set cart drawer state
        setCartDrawerOpen: (state, action) => {
            state.cartDrawerOpen = action.payload;
        },

        // Set global loading state
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        // Show notification
        showNotification: (state, action) => {
            state.notification = {
                show: true,
                message: action.payload.message,
                type: action.payload.type || 'info',
            };
        },

        // Hide notification
        hideNotification: (state) => {
            state.notification = {
                show: false,
                message: '',
                type: 'info',
            };
        },

        // Open modal
        openModal: (state, action) => {
            state.modal = {
                isOpen: true,
                type: action.payload.type,
                data: action.payload.data || null,
            };
        },

        // Close modal
        closeModal: (state) => {
            state.modal = {
                isOpen: false,
                type: null,
                data: null,
            };
        },
        // Open auth modal
        openAuthModal: (state) => {
            state.authModalOpen = true;
        },
        // Close auth modal
        closeAuthModal: (state) => {
            state.authModalOpen = false;
        },
    },
});

// Export actions
export const {
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    toggleCartDrawer,
    setCartDrawerOpen,
    setLoading,
    showNotification,
    hideNotification,
    openModal,
    closeModal,
    openAuthModal,
    closeAuthModal
} = uiSlice.actions;

// Selectors
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectCartDrawerOpen = (state) => state.ui.cartDrawerOpen;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectNotification = (state) => state.ui.notification;
export const selectModal = (state) => state.ui.modal;
export const selectAuthModalOpen = (state) => state.ui.authModalOpen;

// Export reducer
export default uiSlice.reducer;
