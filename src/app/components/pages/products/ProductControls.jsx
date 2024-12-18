"use client";

import React from "react";
import { Btn } from "../../global/buttons/Button";
import { Select } from "../../global/select/SelectOption";

/**
 * @typedef {Object} SortOption
 * @property {string} value - The value used for sorting (e.g., "newest", "price-low-high")
 * @property {string} label - The display text for the sort option
 */

/**
 * @typedef {Object} ProductControlsProps
 * @property {(isOpen: boolean) => void} setIsFilterOpen - Function to toggle the filter panel
 * @property {string} [searchQuery] - Current search query, if any
 * @property {() => void} clearSearch - Function to clear the current search query
 * @property {string} sortType - Current sort type value
 * @property {(type: string) => void} setSortType - Function to update the sort type
 * @property {Array<SortOption>} simpleOptions - Array of available sorting options
 */

/**
 * ProductControls component provides filtering and sorting controls for the product grid
 * It includes a filter button, search clear option, and sorting dropdown.
 *
 * @component
 * @param {ProductControlsProps} props - Component props
 * @returns {JSX.Element} Product control panel with filtering and sorting options
 *
 * @example
 * const simpleOptions = [
 *   { value: "newest", label: "Newest" },
 *   { value: "price-low-high", label: "Price: Low to High" }
 * ];
 *
 * <ProductControls
 *   setIsFilterOpen={setIsFilterOpen}
 *   searchQuery="blue dress"
 *   clearSearch={() => handleClearSearch()}
 *   sortType="newest"
 *   setSortType={setSortType}
 *   simpleOptions={simpleOptions}
 * />
 */
const ProductControls = ({
  setIsFilterOpen,
  searchQuery,
  clearSearch,
  sortType,
  setSortType,
  simpleOptions,
}) => {
  return (
    <div className="flex justify-between w-full items-center">
      {/* Left side controls: Filter button and Clear Search */}
      <div className="flex gap-2">
        {/* Filter Toggle Button */}
        <Btn
          onClick={() => setIsFilterOpen(true)}
          customStyles="flex items-center gap-2 px-4 py-2 border border-gray-300"
          text="Filter"
        />

        {/* Conditional Clear Search Button */}
        {searchQuery && (
          <Btn
            onClick={clearSearch}
            customStyles="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600"
            text="Clear Search"
          />
        )}
      </div>

      {/* Right side control: Sort Dropdown */}
      <Select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        customStyles="px-4 py-2 border border-gray-300"
        options={simpleOptions}
      />
    </div>
  );
};

export default ProductControls;
