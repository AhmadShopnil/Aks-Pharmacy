import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+880 1712 345678",
        address: "House 12, Road 5, Dhanmondi, Dhaka",
        city: "Dhaka",
        zip: "1209",
        country: "Bangladesh"
    },
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
    },
});

export const { updateProfile, setOrders } = userSlice.actions;
export default userSlice.reducer;
