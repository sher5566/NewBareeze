"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import TypographyAtom from "../../global/typography/Typography";
import { Btn } from "../../global/buttons/Button";
import ProductPrice from "./ProductPrice";
import { addToCart } from "../../../redux/slices/cartslice/Cartslice";

/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier for the product
 * @property {string} title - Product name/title
 * @property {string} Category - Product category
 * @property {string} Fabric - Product fabric type
 * @property {string} Discount - Discount percentage (e.g., "10%", "0%")
 * @property {number} price - Product price
 * @property {string[]} images - Array of product image URLs
 * @property {boolean} sold_out - Whether the product is out of stock
 */

/**
 * ProductCard component displays individual product information in a grid layout
 * with hover effects and add to cart functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Product} props.product - Product object containing all product details
 * @returns {JSX.Element} A product card component
 */
const ProductCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get cart items from Redux store to check if product is already in cart
  const cartItems = useSelector((state) => state.cart.items);

  /**
   * Checks if the product is already in the shopping cart
   * @type {boolean}
   */
  const isInCart = cartItems.some((item) => item.productId === product.id);

  /**
   * Handles click events on the product card
   * Prevents navigation when clicking the Add to Bag button
   *
   * @param {React.MouseEvent} e - Click event object
   */
  const handleCardClick = (e) => {
    if (e.target.closest("button")) {
      e.stopPropagation();
      return;
    }
    router.push(`/products/ProductDetail/${product.id}`);
  };

  /**
   * Handles adding product to cart
   * Validates stock status and dispatches add to cart action
   *
   * @param {React.MouseEvent} e - Click event object
   */
  const handleAddToBag = (e) => {
    e.stopPropagation(); // Prevent card click navigation

    // Check if product is out of stock
    if (product.sold_out) {
      toast.error("Sorry, this product is currently out of stock");
      return;
    }

    // Generate unique SKU for the product
    const sku = `${product.Category}-${product.id}`.toUpperCase();

    // Prepare cart item object with default values
    const cartItem = {
      productId: product.id,
      title: product.title,
      color: product.Color,
      sku: sku,
      price: product.price, // Default to base price
      quantity: 1, // Default quantity
      image: product.images[0],
      size: "2-PIECES", // Default size
      discount: product.Discount,
    };

    // Dispatch add to cart action
    dispatch(addToCart(cartItem));

    // Show success toast notification
    toast.success(`${product.title} successfully added to bag`);
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleCardClick}>
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Product Image Container */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        {/* Discount Badge */}
        {product.Discount !== "0%" && (
          <div className="absolute top-3 right-3 bg-[#03a9f4] text-white px-2 py-0.5 text-sm z-10">
            {product.Discount} OFF
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black text-white px-3 py-0.5 text-sm z-10">
          {product.Category}
        </div>

        {/* Primary Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Secondary Product Image (shown on hover) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} - alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Product Information */}
      <div className="mt-4 space-y-3">
        {/* Product Title */}
        <TypographyAtom
          additionalClasses="font-bold text-gray-900 uppercase text-md"
          variant="h2"
          text={product.title}
        />

        {/* Product Fabric */}
        <TypographyAtom
          additionalClasses="font-medium text-gray-900 uppercase text-md"
          variant="h3"
          text={product.Fabric}
        />

        {/* Product Price */}
        <ProductPrice price={product.price} discount={product.Discount} />

        {/* Add to Cart Button or Status Message */}
        <div className="transform translate-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {!product.sold_out ? (
            isInCart ? (
              // Already in Cart Message
              <div className="w-full bg-[#03a9f4] text-white py-2 px-4 text-sm uppercase font-medium text-center">
                Already in Cart
              </div>
            ) : (
              // Add to Bag Button
              <Btn
                onClick={handleAddToBag}
                customStyles="w-full bg-black text-white py-2 px-4 text-sm uppercase font-medium 
                             transition-all duration-300 hover:bg-white hover:text-black hover:shadow-md 
                             border border-transparent hover:border-black"
                text="ADD TO BAG"
              />
            )
          ) : (
            // Out of Stock Message
            <div className="w-full bg-red-600 text-white py-2 px-4 text-sm uppercase font-medium text-center">
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
