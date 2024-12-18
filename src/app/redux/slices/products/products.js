import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} title - Product name/title
 * @property {string} description - Product description
 * @property {number} price - Product price
 * // Add other product properties as needed
 */

/**
 * @typedef {Object} ProductState
 * @property {Object} productList - Container for products data
 * @property {Product[]} productList.Products - Array of product objects
 */

/**
 * @type {ProductState}
 * Initial state for the products slice
 */
export const initialState = {
  isLoadingProductList: true,
  productList: {
    Products: [], // Empty array to store product data
  },
};

/**
 * @type {import('@reduxjs/toolkit').Slice}
 * Product slice containing state and reducers for product management
 */
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /**
     * Updates the complete product list in the store
     * @param {ProductState} state - Current products state
     * @param {Object} action - Redux action
     * @param {Object} action.payload - New product list data
     * @param {Product[]} action.payload.Products - Array of products to set
     */
    setProducts: (state, action) => {

      state.productList = action.payload;
      state.isLoadingProductList = false; 
    },
  },
});

// Export the setProducts action creator
export const { setProducts } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
