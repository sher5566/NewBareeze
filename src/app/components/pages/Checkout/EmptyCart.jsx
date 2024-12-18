"use client";

import React from "react";
import TypographyAtom from "../../global/typography/Typography";
import { Btn } from "../../global/buttons/Button";

/**
 * @typedef {Object} RouterObject
 * @property {(path: string) => void} push - Function to navigate to a new route
 */

/**
 * EmptyCart component displays a message and button when the cart is empty
 * @param {Object} props - Component props
 * @param {RouterObject} props.router - Next.js router object for navigation
 * @returns {JSX.Element} Rendered empty cart message with continue shopping button
 */
const EmptyCart = ({ router }) => (
  // Full-screen container with centered content
  <div className="min-h-screen flex items-center justify-center">
    {/* Content wrapper with spacing between elements */}
    <div className="text-center space-y-4">
      {/* Empty cart message */}
      <TypographyAtom
        text="Your cart is empty"
        type="h2"
        additionalClasses="text-2xl text-gray-600"
      />
      {/* Continue shopping button */}
      <Btn
        onClick={() => router.push("/pages/products")}
        customStyles="text-black underline hover:no-underline"
        text="Continue Shopping"
      />
    </div>
  </div>
);

export default EmptyCart;
