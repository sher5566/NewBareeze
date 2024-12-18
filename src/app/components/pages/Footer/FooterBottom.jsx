"use client"; // Marks this as a Client Component in Next.js

import React from "react";
import { TypographyAtom } from "../../global/typography/Typography";

/**
 * @component FooterBottom
 * @description Renders the bottom section of the footer containing copyright and powered by information
 * @returns {JSX.Element} A React component that displays copyright and powered by text in a responsive layout
 *
 * @example
 * // Usage
 * <FooterBottom />
 */
export const FooterBottom = () => (
  // Container div with top border and responsive padding
  <div className="border-t border-gray-200 pt-4 md:pt-8">
    {/* Flex container for responsive layout - vertical on mobile, horizontal on larger screens */}
    <div className="flex justify-center text-sm text-gray-500 ">
      {/* Copyright text using TypographyAtom component */}
      <TypographyAtom
        text="© 2024 newBareeze - All Rights Reserved"
        type="paragraph"
        variant="small"
      />
      
    </div>
  </div>
);
