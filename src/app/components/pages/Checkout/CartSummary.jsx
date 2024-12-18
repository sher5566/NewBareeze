import React from "react";
import TypographyAtom from "../../global/typography/Typography";

/**
 * @typedef {Object} CartItem
 * @property {string} id - Unique identifier for the item
 * @property {string} title - Item name or title
 * @property {string} image - URL of the item's image
 * @property {number} quantity - Number of items ordered
 * @property {number} price - Item's unit price
 * @property {string} [discount] - Optional discount percentage (e.g., "10%")
 */

/**
 * CartSummary component displays the order summary including items, prices, and totals
 * @param {Object} props - Component props
 * @param {CartItem[]} props.cartItems - Array of items in the cart
 * @param {number} props.subtotal - Sum of all items' prices before discount
 * @param {number} props.totalDiscount - Total discount amount
 * @param {number} props.shipping - Shipping cost
 * @param {number} props.finalTotal - Final amount after discounts and shipping
 * @param {Object} props.Helper - Utility helper object containing price formatting methods
 * @returns {JSX.Element} Rendered cart summary
 */
const CartSummary = ({
  cartItems,
  subtotal,
  totalDiscount,
  shipping,
  finalTotal,
  Helper,
}) => {
  /**
   * Safely formats price values with fallback for invalid inputs
   * @param {number} value - Price value to format
   * @returns {string} Formatted price string or "N/A" for invalid values
   */
  const safeFormatPrice = (value) => {
    if (typeof value === "number" && !isNaN(value)) {
      return Helper.global.formatPrice(value);
    }
    return "N/A"; // Fallback for invalid price values
  };

  return (
    <div className="bg-white">
      <div className="space-y-6">
        {/* Cart Items List */}
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b">
            {/* Item Image with Quantity Badge */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-32 object-cover"
              />
              <span className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {item.quantity}
              </span>
            </div>

            {/* Item Details */}
            <div className="flex-1">
              <TypographyAtom
                text={item.title}
                type="h3"
                additionalClasses="font-medium"
              />
              {/* Conditional Price Display with Discount */}
              {item.discount && item.discount !== "0%" ? (
                <div className="flex items-center gap-2 mt-1">
                  {/* Discounted Price */}
                  <TypographyAtom
                    text={safeFormatPrice(
                      Helper.global.calculateItemTotal(item)
                    )}
                    type="p"
                    additionalClasses="font-medium"
                  />
                  {/* Original Price (Strikethrough) */}
                  <TypographyAtom
                    text={safeFormatPrice(item.price * item.quantity)}
                    type="p"
                    additionalClasses="text-gray-500 line-through text-sm"
                  />
                  {/* Discount Badge */}
                  <span className="text-sm text-red-600">
                    ({item.discount} OFF)
                  </span>
                </div>
              ) : (
                // Regular Price Display
                <TypographyAtom
                  text={safeFormatPrice(Helper.global.calculateItemTotal(item))}
                  type="p"
                  additionalClasses="mt-1"
                />
              )}
            </div>
          </div>
        ))}

        {/* Order Summary Section */}
        <div className="space-y-4 pt-4">
          {/* Subtotal Row */}
          <div className="flex justify-between">
            <TypographyAtom text="Subtotal" type="p" />
            <TypographyAtom text={safeFormatPrice(subtotal)} type="p" />
          </div>

          {/* Discount Row */}
          <div className="flex justify-between">
            <TypographyAtom text="Discount" type="p" />
            <TypographyAtom
              text={safeFormatPrice(totalDiscount)}
              type="p"
              additionalClasses="text-red-600"
            />
          </div>

          {/* Shipping Row */}
          <div className="flex justify-between">
            <TypographyAtom text="Shipping" type="p" />
            <TypographyAtom text={safeFormatPrice(shipping)} type="p" />
          </div>

          {/* Total Row */}
          <div className="flex justify-between border-t pt-4">
            <TypographyAtom
              text="Total"
              type="p"
              additionalClasses="font-medium"
            />
            <TypographyAtom
              text={safeFormatPrice(finalTotal)}
              type="p"
              additionalClasses="font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
