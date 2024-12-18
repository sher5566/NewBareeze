"use client"; // Marks this as a Client Component in Next.js

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/products/products";
import cartReducer from "./slices/cartslice/Cartslice";

/**
 * @fileoverview Redux store configuration file
 * Combines multiple reducers and creates the central store for state management
 */

/**
 * @constant store
 * @description Configures and creates the Redux store with combined reducers
 * for products and cart management.
 *
 * @property {Object} reducer - Combined reducers object
 * @property {Function} reducer.products - Handles product-related state
 * @property {Function} reducer.cart - Handles shopping cart state
 *
 * @example
 * // Usage in components
 * import { useSelector, useDispatch } from 'react-redux';
 * const products = useSelector(state => state.products);
 * const cart = useSelector(state => state.cart);
 */
export const store = configureStore({
  reducer: {
    // Product state management reducer
    products: productReducer,
    // Shopping cart state management reducer
    cart: cartReducer,
  },
});

// Default export of the configured store
export default store;
