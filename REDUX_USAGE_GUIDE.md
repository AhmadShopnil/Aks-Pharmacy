# Redux Toolkit & RTK Query - Usage Guide

This guide explains how to use the Redux Toolkit and RTK Query setup in your e-commerce application.

## 📁 Project Structure

```
lib/redux/
├── store.js                    # Redux store configuration
├── hooks.js                    # Custom Redux hooks
├── ReduxProvider.jsx           # Provider wrapper component
├── services/
│   ├── baseApi.js             # Base RTK Query API
│   ├── productsApi.js         # Products API endpoints
│   └── cartApi.js             # Cart API endpoints
└── features/
    ├── cart/
    │   └── cartSlice.js       # Cart state slice
    └── ui/
        └── uiSlice.js         # UI state slice
```

## 🛒 Using Cart Functionality

### Adding Items to Cart

```jsx
'use client';

import { useAppDispatch } from '@/lib/redux/hooks';
import { addItem } from '@/lib/redux/features/cart/cartSlice';

function ProductCard({ product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img,
      quantity: 1,
    }));
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  );
}
```

### Reading Cart State

```jsx
'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { selectCartItems, selectCartTotal, selectCartCount } from '@/lib/redux/features/cart/cartSlice';

function CartSummary() {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);

  return (
    <div>
      <p>Items: {cartCount}</p>
      <p>Total: ${cartTotal.toFixed(2)}</p>
    </div>
  );
}
```

### Cart Actions Available

- `addItem(item)` - Add item to cart
- `removeItem(id)` - Remove item from cart
- `updateQuantity({ id, quantity })` - Update item quantity
- `incrementQuantity(id)` - Increase quantity by 1
- `decrementQuantity(id)` - Decrease quantity by 1
- `clearCart()` - Clear all items

## 🔍 Using RTK Query for Data Fetching

### Fetching Products

```jsx
'use client';

import { useGetProductsQuery } from '@/lib/redux/services/productsApi';

function ProductList() {
  const { data: products, isLoading, error } = useGetProductsQuery({
    category: 'electronics',
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Available Product Queries

- `useGetProductsQuery({ category, limit, page, sort })` - Get all products
- `useGetProductByIdQuery(id)` - Get single product
- `useGetProductsByCategoryQuery(category)` - Get products by category
- `useGetFeaturedProductsQuery({ limit })` - Get featured products
- `useGetBestSellingProductsQuery({ limit })` - Get best selling products
- `useSearchProductsQuery(searchTerm)` - Search products

## 🎨 Using UI State

### Toggle Cart Drawer

```jsx
'use client';

import { useAppDispatch } from '@/lib/redux/hooks';
import { toggleCartDrawer } from '@/lib/redux/features/ui/uiSlice';

function CartButton() {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(toggleCartDrawer())}>
      Open Cart
    </button>
  );
}
```

### Show Notifications

```jsx
import { showNotification } from '@/lib/redux/features/ui/uiSlice';

// In your component
dispatch(showNotification({
  message: 'Item added to cart!',
  type: 'success' // 'success', 'error', 'warning', 'info'
}));
```

## ⚙️ Configuration

### API Base URL

Set your API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

If not set, it defaults to `/api`.

### Redux DevTools

Redux DevTools are automatically enabled in development mode. Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) for your browser to inspect state and actions.

## 🔄 State Persistence (Optional)

To persist cart state across page refreshes, you can add `redux-persist`:

```bash
npm install redux-persist
```

Then update your store configuration to include persistence.

## 📝 Important Notes

1. **Client Components**: Any component using Redux hooks must be a client component (`'use client'` directive)
2. **Server Components**: You cannot use Redux hooks in server components
3. **API Endpoints**: Update the API endpoints in `services/productsApi.js` and `services/cartApi.js` to match your backend
4. **Mock Data**: If you don't have a backend yet, you can use the cart slice for client-side cart management

## 🎯 Components Created

- **CartButton** - Displays cart icon with item count badge
- **CartDrawer** - Sliding drawer showing cart items with full management
- **ProductCard** - Product card with Redux-integrated add to cart functionality

All components are fully integrated and ready to use!
