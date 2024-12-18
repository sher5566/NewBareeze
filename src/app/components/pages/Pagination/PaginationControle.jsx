"use client";

import React, { useEffect, useState } from "react";
import { Btn } from "../../global/buttons/Button";
import DynamicIcon from "../../global/icons";

/**
 * Pagination controls component for navigating through product pages
 * @component
 * @param {Object} props - Component properties
 * @param {number} props.currentPage - Current active page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback function when page changes
 * @returns {JSX.Element} Rendered pagination controls
 */
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Default to 5 pages

  // Adjust visible page count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(3); // Mobile screens
      } else {
        setVisibleCount(5); // Tablet and desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Calculates which page numbers should be visible in pagination
   * @returns {Array<number>} Array of page numbers to display
   */
  const getVisiblePages = () => {
    const half = Math.floor(visibleCount / 2);

    if (totalPages <= visibleCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= half + 1) {
      return Array.from({ length: visibleCount }, (_, i) => i + 1);
    }

    if (currentPage >= totalPages - half) {
      return Array.from(
        { length: visibleCount },
        (_, i) => totalPages - visibleCount + 1 + i
      );
    }

    return Array.from(
      { length: visibleCount },
      (_, i) => currentPage - half + i
    );
  };

  const visiblePages = getVisiblePages();

  // Check if navigation buttons should be disabled
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Previous Button */}
      <Btn
        variant="outline"
        onClick={() => !isPreviousDisabled && onPageChange(currentPage - 1)}
        disabled={isPreviousDisabled}
        customStyles={`px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm lg:text-base rounded-lg ${
          isPreviousDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        text={
          <DynamicIcon
            name="chevronLeft"
            color="text-white"
            additionalClasses="rounded-full p-2 sm:p-3 bg-[#03a9f4] hover:bg-blue-500"
          />
        }
      />

      {/* Visible Pages */}
      {visiblePages.map((page) => (
        <Btn
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          customStyles={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm lg:text-base ${
            currentPage === page
              ? "bg-[#03a9f4] text-white"
              : "text-gray-600 hover:bg-blue-500 hover:text-white"
          }`}
          text={page.toString()}
        />
      ))}

      {/* Next Button */}
      <Btn
        variant="outline"
        onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        customStyles={`px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm lg:text-base rounded-lg ${
          isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        text={
          <DynamicIcon
            name="chevronRight"
            color="text-white"
            additionalClasses="rounded-full p-2 sm:p-3 bg-[#03a9f4] hover:bg-blue-500"
          />
        }
      />
    </div>
  );
};

export default PaginationControls;
