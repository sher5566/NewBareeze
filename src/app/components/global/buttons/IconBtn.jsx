import PropTypes from "prop-types";
import React from "react";

/**
 * A flexible IconButton component that wraps any passed icon or component with Tailwind CSS styling.
 *
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.icon - The icon or component to display inside the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.color = "default"] - The color of the button (primary, secondary, etc.).
 * @param {string} [props.size = "medium"] - The size of the button (small, medium, large).
 * @param {string} [props.additionalClasses = ""] - Additional Tailwind classes for custom styling.
 * @returns {JSX.Element} - A customized IconButton component.
 */
export const IconBtnAtom = ({
  icon,
  onClick,
  color = "default",
  size = "medium",
  additionalClasses = "",
  ...rest
}) => {
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-base",
    large: "w-12 h-12 text-lg",
  };

  const colorClasses = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    error: "bg-red-500 hover:bg-red-600 text-white",
    inherit: "",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex justify-center items-center rounded-full 
        ${sizeClasses[size]} ${colorClasses[color]} 
        ${additionalClasses}
      `}
      {...rest}
    >
      {icon}
    </button>
  );
};

// Prop types for better type checking and documentation
IconBtnAtom.propTypes = {
  icon: PropTypes.element.isRequired, // The icon or component to display inside the button
  onClick: PropTypes.func, // Function to execute on click
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "error",
    "inherit",
  ]), // Button color
  size: PropTypes.oneOf(["small", "medium", "large"]), // Button size
  additionalClasses: PropTypes.string, // Custom Tailwind classes
};
