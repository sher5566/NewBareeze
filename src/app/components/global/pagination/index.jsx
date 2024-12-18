import React from "react";
import PropTypes from "prop-types";

/**
 * PaginationAtom - A flexible and reusable atom component for pagination
 *
 * @param {object} props - The component props.
 * @param {number} props.count - Total number of pages.
 * @param {number} props.page - The current page.
 * @param {function} props.onChange - Function to handle page changes.
 * @param {string} [props.color="blue"] - The color of the active page.
 * @param {boolean} [props.disabled=false] - Disables the pagination if set to true.
 * @param {string} [props.size="medium"] - The size of the pagination buttons (small, medium, large).
 * @returns {JSX.Element} - The Pagination atom component.
 */
const PaginationAtom = ({
  count = 10,
  page = 1,
  onChange,
  color = "blue",
  disabled = false,
  size = "medium",
}) => {
  const buttonSizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-3 py-2",
    large: "px-4 py-3 text-lg",
  };

  const handlePageChange = (newPage) => {
    if (!disabled && onChange) {
      onChange(newPage);
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {[...Array(count)].map((_, index) => {
        const pageIndex = index + 1;
        const isActive = pageIndex === page;

        return (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex)}
            disabled={disabled}
            className={`${
              buttonSizeClasses[size]
            } rounded border border-gray-300 ${
              isActive
                ? `bg-${color}-500 text-white`
                : "bg-white text-gray-700 hover:bg-gray-100"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {pageIndex}
          </button>
        );
      })}
    </div>
  );
};

// Define PropTypes for type-checking and documentation
PaginationAtom.propTypes = {
  count: PropTypes.number, // Total number of pages
  page: PropTypes.number, // Current active page
  onChange: PropTypes.func, // Function to call when page changes
  color: PropTypes.string, // Color of the active page
  disabled: PropTypes.bool, // Disable the pagination control
  size: PropTypes.oneOf(["small", "medium", "large"]), // Size of the pagination buttons
};

export default PaginationAtom;
