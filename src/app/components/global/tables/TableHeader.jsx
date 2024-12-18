import PropTypes from "prop-types";
import React from "react";

/**
 * A customizable table header component using Tailwind CSS.
 *
 * @component
 * @param {node} children - The content to display inside the header cell.
 * @param {string} align - The alignment of the header cell content (default: "left").
 * @param {string} additionalClasses - Additional Tailwind CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered table header cell.
 */
const TableHeader = ({ children, align = "left", additionalClasses = "" }) => {
  // Map alignment prop to Tailwind classes
  const alignmentClasses =
    {
      inherit: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align] || "text-left";

  return (
    <th
      className={`px-4 py-2 font-bold bg-gray-100 border-b border-gray-300 ${alignmentClasses} ${additionalClasses}`}
    >
      {children}
    </th>
  );
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["inherit", "left", "center", "right"]),
  additionalClasses: PropTypes.string, // Custom Tailwind CSS classes
};

export { TableHeader };
