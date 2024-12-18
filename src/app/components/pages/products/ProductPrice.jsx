"use client";

import React from "react";
import TypographyAtom from "../../global/typography/Typography";
import { Helper } from "../../../utils/helpers/index";

/**
 * @typedef {Object} ProductPriceProps
 * @property {number} [price] - The original price of the product
 * @property {string} [discount] - Discount percentage as a string (e.g., "10%", "0%")
 */

/**
 * ProductPrice component displays the price of a product, handling both regular and discounted prices.
 * If a discount is present, it shows both the original and discounted prices.
 *
 * @component
 * @param {ProductPriceProps} props - Component props
 * @returns {JSX.Element} Price display with optional discount formatting
 *
 * @example
 * // Regular price
 * <ProductPrice price={1000} discount="0%" />
 *
 * @example
 * // Discounted price
 * <ProductPrice price={1000} discount="10%" />
 *
 * @example
 * // With undefined price (defaults to 0)
 * <ProductPrice price={undefined} discount="0%" />
 */
const ProductPrice = ({ price, discount }) => {
  // If there's no discount, display regular price only
  if (discount === "0%") {
    return (
      <TypographyAtom
        additionalClasses="text-black font-medium"
        variant="body1"
        text={Helper.global.formatPrice(price || 0)}
      />
    );
  }

  // If there's a discount, display both original and discounted prices
  return (
    <div className="flex items-center gap-2">
      {/* Discounted Price */}
      <TypographyAtom
        additionalClasses="text-black font-medium"
        variant="body1"
        text={Helper.global.formatPrice(
          Helper.global.calculateDiscountedPrice(price || 0, discount)
        )}
      />
      {/* Original Price (struck through) */}
      <TypographyAtom
        additionalClasses="text-gray-500 line-through text-sm"
        variant="body1"
        text={Helper.global.formatPrice(price || 0)}
      />
    </div>
  );
};

export default ProductPrice;
