import PropTypes from "prop-types";
import React from "react";

/**
 * A customizable table cell component using Tailwind CSS.
 *
 * @component
 * @param {node} children - The content to display inside the cell.
 * @param {string} align - The alignment of the cell content (default: "left").
 * @param {string} additionalClasses - Additional Tailwind CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered table cell.
 */
const TableCell = ({ children, align = "left", additionalClasses = "" }) => {
  // Map alignment prop to Tailwind classes
  const alignmentClasses =
    {
      inherit: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align] || "text-left";

  return (
    <td className={`px-4 py-2 ${alignmentClasses} ${additionalClasses}`}>
      {children}
    </td>
  );
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["inherit", "left", "center", "right"]),
  additionalClasses: PropTypes.string, // Custom Tailwind CSS classes
};

export { TableCell };
