import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './services/baseApi';
import cartReducer from './features/cart/cartSlice';
import uiReducer from './features/ui/uiSlice';


export const makeStore = () => {
  const store = configureStore({
    reducer: {
      // RTK Query API reducer
      [baseApi.reducerPath]: baseApi.reducer,
      
      // Feature slices
      cart: cartReducer,
      ui: uiReducer,
    },
    
    //  middleware for caching, invalidation
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    
    //  Redux DevTools in development
    devTools: process.env.NODE_ENV !== 'production',
  });

  //  Enable refetchOnFocus/refetchOnReconnect behaviors ,--this is optional
  setupListeners(store.dispatch);

  return store;
};

// Export store instance 
export const store = makeStore();

// Infer types from the store itself
export const getState = store.getState;
export const dispatch = store.dispatch;
