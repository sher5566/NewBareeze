import React from "react";
import PropTypes from "prop-types";

/**
 * A customizable select component with optional loading state
 * @component
 * @param {Object} props
 * @param {Array} props.options - Array of options with value and label
 * @param {string} props.value - Currently selected value
 * @param {function} props.onChange - Handler for selection change
 * @param {string} [props.label] - Label text for the select
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.isLoading] - Loading state
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.error] - Error message
 * @param {string} [props.size] - Select size (small/medium/large)
 * @param {string} [props.customStyles] - Custom Tailwind classes
 */
const Select = ({
  options = [],
  value,
  onChange,
  label,
  placeholder = "Select an option",
  isLoading = false,
  disabled = false,
  error,
  size = "medium",
  customStyles = "",
}) => {
  const sizeStyles = {
    small: "py-1 px-2 text-sm",
    medium: "py-2 px-3",
    large: "py-3 px-4 text-lg",
  };

  const baseStyles = `
    w-full rounded-md border
    focus:outline-none focus:ring-2 focus:ring-blue-500
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? "border-red-500" : "border-gray-300"}
    ${sizeStyles[size]}
    ${customStyles}
  `;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select
        value={value}
        onChange={onChange}
        disabled={disabled || isLoading}
        className={baseStyles}
      >
        {placeholder && (
          <option value="" disabled>
            {isLoading ? "Loading..." : placeholder}
          </option>
        )}

        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  customStyles: PropTypes.string,
};

export { Select };
