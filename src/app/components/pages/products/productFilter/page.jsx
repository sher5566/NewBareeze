"use client";

import React from "react";
import { Helper } from "../../../../utils/helpers/index";
import TypographyAtom from "../../../global/typography/Typography";
import { Btn } from "../../../global/buttons/Button";
import DynamicIcon from "../../../global/icons/index";
import { InputField } from "../../../global/inputs/Inputfield";

/**
 * Filter Component
 *
 * This component renders a sidebar filter menu that includes categories, colors,
 * and fabrics as filter options. It supports reset, apply, and close functionalities.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Controls the visibility of the filter sidebar
 * @param {Function} props.onClose - Callback function to close the filter sidebar
 * @param {Function} props.onFilter - Callback function to apply the filters
 *
 * @returns {JSX.Element} The filter sidebar component
 */
const Filter = ({ isOpen, onClose, onFilter }) => {
  // State to manage the selected filter options
  const [filters, setFilters] = React.useState(Helper.global.resetFilters());

  // Retrieve filter options (categories, colors, fabrics) from the Helper module
  const filterOptions = Helper.global.getFilterOptions();

  /**
   * Resets all filters to their default state.
   */
  const handleResetFilters = () => {
    setFilters(Helper.global.resetFilters());
  };

  /**
   * Handles changes in the filter checkboxes.
   *
   * @param {string} type - The type of filter (e.g., "category", "color", "fabric")
   * @param {string} value - The selected value for the filter
   */
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => Helper.global.handleFilterChange(prev, type, value));
  };

  return (
    <>
      {/* Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <TypographyAtom
              type="h2"
              text="Filters"
              additionalClasses="text-2xl font-semibold text-gray-800"
            />

            <Btn
              customStyles="text-2xl font-semibold text-gray-500 hover:text-gray-800"
              onClick={onClose}
              text={
                <DynamicIcon
                  name="fix"
                  additionalClasses="text-2xl hover:bg-[#03a9f4] rounded-full p-1 hover:text-white"
                />
              }
            />
          </div>

          {/* Filter Options Section */}
          <div className="overflow-y-auto flex-grow">
            {/* Category Filters */}
            <div className="mb-6 flex flex-col items-start align-middle">
              <TypographyAtom
                type="h3"
                text="Category"
                additionalClasses="text-lg font-medium text-gray-700 mb-3"
              />

              {filterOptions.categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 py-1 hover:bg-gray-100 rounded-md px-2"
                >
                  <InputField
                    type="checkbox"
                    additionalClasses="w-5 h-5"
                    checked={filters.category.includes(category)}
                    onChange={() => handleCheckboxChange("category", category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            {/* Color Filters */}
            <div className="mb-6 flex flex-col items-start align-middle">
              <TypographyAtom
                type="h3"
                text="Color"
                additionalClasses="text-lg font-medium text-gray-700 mb-3"
              />

              {filterOptions.colors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 py-1 hover:bg-gray-100 rounded-md px-2"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={filters.color.includes(color)}
                    onChange={() => handleCheckboxChange("color", color)}
                  />
                  {color}
                </label>
              ))}
            </div>

            {/* Fabric Filters */}
            <div className="mb-6 flex flex-col items-start align-middle  ">
              <TypographyAtom
                type="h3"
                text="Fabric"
                additionalClasses="text-lg font-medium text-gray-700 mb-3"
              />

              {filterOptions.fabrics.map((fabric) => (
                <label
                  key={fabric}
                  className="flex items-center gap-2 py-1 text-nowrap  hover:bg-gray-100 rounded-md px-2 "
                >
                  <InputField
                    type="checkbox"
                    additionalClasses="w-5 h-5"
                    checked={filters.fabric.includes(fabric)}
                    onChange={() => handleCheckboxChange("fabric", fabric)}
                  />
                  {fabric}
                </label>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex gap-4">
            {/* Reset Button */}
            <Btn
              customStyles="w-1/2 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-200"
              onClick={handleResetFilters}
              text="Reset"
            />

            {/* Apply Button */}
            <Btn
              customStyles="w-1/2 py-2 bg-[#03a9f4] text-white rounded-md hover:bg-indigo-700"
              onClick={() => onFilter(filters)}
              text="Apply"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
