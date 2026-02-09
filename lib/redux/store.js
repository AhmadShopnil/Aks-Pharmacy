import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { baseApi } from './services/baseApi';
import cartReducer from './features/cart/cartSlice';
import uiReducer from './features/ui/uiSlice';
import userReducer from './features/user/userSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

// Create a custom storage to handle SSR (Server Side Rendering)
// redux-persist's default storage uses localStorage which is not available on the server
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const customStorage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: 'aks-shop-root', // unique key for the storage
  storage: customStorage,
  whitelist: ['cart', 'wishlist', 'user'], // Persist cart, wishlist, and user session
};

const rootReducer = combineReducers({
  // RTK Query API reducer
  [baseApi.reducerPath]: baseApi.reducer,

  // Feature slices
  cart: cartReducer,
  ui: uiReducer,
  user: userReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persistor
export const persistor = persistStore(store);

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer types from the store itself
export const getState = store.getState;
export const dispatch = store.dispatch;
