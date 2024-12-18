import PropTypes from "prop-types";
import React from "react";

/**
 * A customizable table row component using Tailwind CSS.
 *
 * @component
 * @param {node} children - The content to display inside the row.
 * @param {boolean} hover - Whether the row should have a hover effect (default: false).
 * @param {string} additionalClasses - Additional Tailwind CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered table row.
 */
const TableRow = ({ children, hover = false, additionalClasses = "" }) => {
  return (
    <tr
      className={`${
        hover ? "hover:bg-gray-100" : ""
      } border-b border-gray-300 ${additionalClasses}`}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  hover: PropTypes.bool,
  additionalClasses: PropTypes.string, // Custom Tailwind CSS classes
};

export { TableRow };
