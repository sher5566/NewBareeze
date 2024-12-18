import PropTypes from "prop-types";
import React from "react";

/**
 * A globally reusable and configurable Checkbox component using Tailwind CSS.
 *
 * This component renders a checkbox with an optional label and supports
 * various customization options, including checked state, change handler,
 * label text, size, and color.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.checked - The checked state of the checkbox.
 * @param {function} props.onChange - The function to handle the change event.
 * @param {string} props.label - The label to display next to the checkbox.
 * @param {string} props.color - The Tailwind color class for the checkbox (default: "text-blue-600").
 * @param {string} props.size - The size of the checkbox (default: "medium").
 * @param {string} props.additionalClasses - Additional Tailwind CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered checkbox component.
 */
const Checkbox = ({
  checked = false,
  onChange,
  label = "",
  color = "text-blue-600",
  size = "medium",
  additionalClasses = "",
}) => {
  // Map size prop to Tailwind CSS classes
  const sizeClasses =
    {
      small: "h-4 w-4",
      medium: "h-5 w-5",
    }[size] || "h-5 w-5";

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`form-checkbox ${sizeClasses} ${color} ${additionalClasses}`}
        aria-label={label}
      />
      {label && <span className="text-gray-800">{label}</span>}
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  color: PropTypes.string, // Tailwind CSS color class
  size: PropTypes.oneOf(["small", "medium"]),
  additionalClasses: PropTypes.string, // Custom Tailwind CSS classes
};

export { Checkbox };
