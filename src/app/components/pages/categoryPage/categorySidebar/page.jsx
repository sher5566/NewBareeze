"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Btn } from "../../../global/buttons/Button";
import DynamicIcon from "../../../global/icons/index";
import React, { useMemo, useState, useEffect } from "react";
import TypographyAtom from "../../../global/typography/Typography";
import { useSelector } from "react-redux";
import { Helper } from "../../../../utils/helpers/index";

/**
 * CategorySidebar Component
 *
 * This component renders a sidebar that displays a list of product categories.
 * It allows users to filter products by categories and updates the URL accordingly.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Determines if the sidebar is visible
 * @param {Function} props.onClose - Callback function to close the sidebar
 *
 * @returns {JSX.Element} The Category Sidebar component
 */
const CategorySidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get product list from Redux state
  const products = useSelector(
    (state) => state?.products?.productList?.Products || []
  );

  // State to manage the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  /**
   * Get unique categories from the product list.
   * Memoized to avoid recalculation on every render.
   */
  const categories = useMemo(() => {
    const uniqueCategories = Helper.global.getCategoryAll(products);
    return uniqueCategories;
  }, [products]);

  /**
   * Sync the selected category with the URL query parameter.
   * Runs on component mount or when the URL query parameters change.
   */
  useEffect(() => {
    const currentCategory = searchParams.get("category") || "All";
    setSelectedCategory(currentCategory);
  }, [searchParams]);

  /**
   * Handle click event for selecting a category.
   *
   * @param {Object} category - The selected category object
   */
  const handleCategoryClick = (category) => {
    // Guard clause to ensure category is valid
    if (!category || !category.name) return;

    // Update the selected category state
    setSelectedCategory(category.name);

    // Update the URL with the selected category
    const categoryParams = new URLSearchParams({
      category: category.name,
    }).toString();

    router.push(`/products?${categoryParams}`);
    onClose(); // Close the sidebar
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <Btn
          customStyles="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
          text={
            <DynamicIcon
              name="fix"
              additionalClasses="text-2xl hover:bg-[#03a9f4] rounded-full p-1 hover:text-white"
            />
          }
        />

        {/* Sidebar Content */}
        <div className="mt-12 space-y-4 px-6">
          {/* Sidebar Header */}
          <TypographyAtom
            type="heading"
            text="CATEGORIES"
            additionalClasses="font-bold"
          />

          {/* Category List */}
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer py-2 text-gray-700 hover:text-gray-900 transition-colors pl-5 ${
                  selectedCategory === category.name
                    ? "bg-[#03a9f4] text-white"
                    : ""
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>

          {/* Additional Navigation Links */}
          <div className="border-t border-gray-200 pt-4">
            <TypographyAtom
              additionalClasses="text-gray-600 cursor-pointer hover:text-black"
              text="Track Your Order"
              variant="body1"
            />
            <TypographyAtom
              additionalClasses="text-gray-600 cursor-pointer hover:text-black"
              text="Accounts"
              variant="body1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;
