"use client"; // Marks this as a Client Component in Next.js

import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} CartItem
 * @property {string} id - Cart item unique ID
 * @property {string} productId - Product ID reference
 * @property {string} title - Product title/name
 * @property {string} sku - Product SKU/stock keeping unit
 * @property {number} price - Product price per unit
 * @property {number} quantity - Selected quantity of the product
 * @property {string} image - Product image URL reference
 * @property {number} totalPrice - Calculated total price for this item
 */

/**
 * @typedef {Object} CartState
 * @property {CartItem[]} items - Array of items currently in cart
 * @property {number} subTotal - Calculated subtotal of all items before shipping
 * @property {string} orderNote - Customer's additional order instructions/notes
 */

/**
 * Loads cart state from localStorage
 * @returns {CartState} Initial cart state, either from storage or default values
 */
const loadState = () => {
  try {
    // Attempt to load state from localStorage
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      // Return default state if no stored state exists
      return {
        items: [],
        subTotal: 0,
        orderNote: "",
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // Return default state if there's an error
    return {
      items: [],
      subTotal: 0,
      orderNote: "",
    };
  }
};

// Initialize cart state from localStorage
const initialState = loadState();

/**
 * @type {import('@reduxjs/toolkit').Slice}
 * Cart slice containing state and reducers for cart management
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds new item to cart or updates existing item quantity
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action with payload containing item details
     * @param {CartItem} action.payload - Item to add or update
     */
    addToCart: (state, action) => {
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex >= 0) {
        // Update quantity and total price of existing item
        state.items[existingItemIndex].quantity = action.payload.quantity;
        state.items[existingItemIndex].totalPrice =
          action.payload.price * action.payload.quantity;
      } else {
        // Add new item with generated ID and calculated total price
        state.items.push({
          ...action.payload,
          id: action.payload.productId,
          color: action.payload.color,
          totalPrice: action.payload.price * action.payload.quantity,
        });
      }

      // Recalculate cart subtotal
      state.subTotal = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      // Persist updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    /**
     * Updates the quantity of an existing cart item
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action
     * @param {Object} action.payload - Update details
     * @param {string} action.payload.itemId - ID of item to update
     * @param {number} action.payload.quantity - New quantity (minimum 1)
     */
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        // Update quantity and recalculate total price
        item.quantity = Math.max(1, quantity);
        item.totalPrice = item.price * item.quantity;

        // Recalculate cart subtotal
        state.subTotal = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );

        // Persist changes to localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    /**
     * Removes an item from the cart
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action
     * @param {string} action.payload - ID of item to remove
     */
    removeFromCart: (state, action) => {
      // Filter out the item to remove
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate cart subtotal
      state.subTotal = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      // Persist updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    /**
     * Updates the order note for the entire cart
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action
     * @param {string} action.payload - New order note text
     */
    updateOrderNote: (state, action) => {
      // Update order note
      state.orderNote = action.payload;

      // Persist changes to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// Export individual actions
export const { addToCart, updateQuantity, removeFromCart, updateOrderNote } =
  cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
