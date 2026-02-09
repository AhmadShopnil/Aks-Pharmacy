import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    profile: null,
    addresses: [],
    orders: [],
    isLoading: false,
    error: null,  

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
           
            state.profile = {
                name: user?.full_name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.name || "User",
                email: user?.email,
                phone: user?.phone,
                address: user?.address || "",
                city: user?.city || "",
                zip: user?.zip || "",
                country: user?.country || "Bangladesh"
            };
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.profile = null;
            state.error = null;
            state.addresses = []; // clear addresses on logout
            state.orders = [];
        },
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
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
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                state.isAuthenticated = true;

                //  user to profile
                const user = payload.user || {};
                state.profile = {
                    name: user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || "User",
                    email: user.email,
                    phone: user.phone,
                    address: user.address || "",
                    city: user.city || "",
                    zip: user.zip || "",
                    country: user.country || "Bangladesh"
                };
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                // Check if registration returns token/user immediately
                if (payload.token) {
                    state.token = payload.token;
                    state.user = payload.user;
                    state.isAuthenticated = true;

                    const user = payload.user || {};
                    state.profile = {
                        name: user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || "User",
                        email: user.email,
                        phone: user.phone,
                        address: user.address || "",
                        city: user.city || "",
                        zip: user.zip || "",
                        country: user.country || "Bangladesh"
                    };
                }
            }
        );
    },
});

export const { setCredentials, logout, updateProfile, setOrders, addAddress, updateAddress, deleteAddress, setDefaultAddress } = userSlice.actions;
export default userSlice.reducer;
