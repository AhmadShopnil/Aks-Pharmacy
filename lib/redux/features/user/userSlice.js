import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: {
        name: "Samrat Khan",
        email: "test@example.com",
        phone: "+880 1712 345678",
        address: "House 12, Road 5, Dhanmondi, Dhaka",
        city: "Dhaka",
        zip: "1209",
        country: "Bangladesh"
    },
    addresses: [
        {
            id: 1,
            label: "Home",
            name: "John Doe",
            phone: "+880 1712 345678",
            address: "House 12, Road 5, Dhanmondi",
            city: "Dhaka",
            zip: "1209",
            country: "Bangladesh",
            isDefault: true
        }
    ],
    orders: [],
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addAddress: (state, action) => {
            const newAddress = {
                ...action.payload,
                id: Date.now(),
                isDefault: state.addresses.length === 0
            };
            state.addresses.push(newAddress);
        },
        updateAddress: (state, action) => {
            const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
            if (index !== -1) {
                state.addresses[index] = { ...state.addresses[index], ...action.payload };
            }
        },
        deleteAddress: (state, action) => {
            state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
            // If deleted address was default, set first address as default
            if (state.addresses.length > 0 && !state.addresses.some(addr => addr.isDefault)) {
                state.addresses[0].isDefault = true;
            }
        },
        setDefaultAddress: (state, action) => {
            state.addresses.forEach(addr => {
                addr.isDefault = addr.id === action.payload;
            });
        },
    },
});

export const { updateProfile, setOrders, addAddress, updateAddress, deleteAddress, setDefaultAddress } = userSlice.actions;
export default userSlice.reducer;
