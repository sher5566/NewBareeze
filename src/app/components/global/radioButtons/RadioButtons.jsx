import React from "react";
import PropTypes from "prop-types";

/**
 * A reusable radio button component styled with Tailwind CSS.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.label - The label to display next to the radio button.
 * @param {boolean} props.checked - Whether the radio button is checked.
 * @param {function} props.onChange - Function to handle change events for the radio button.
 * @param {string} props.value - The value of the radio button.
 * @param {string} [props.color="blue"] - The color of the radio button (default: "blue").
 * @param {string} [props.size="medium"] - The size of the radio button (small, medium, large).
 * @returns {JSX.Element} - The rendered radio button component.
 */
const RadioButton = ({
  label,
  checked,
  onChange,
  value,
  color = "blue",
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  const radioColor = checked ? `bg-${color}-500` : "bg-white border-gray-300";

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={`appearance-none ${sizeClasses[size]} rounded-full border-2 ${radioColor} focus:outline-none focus:ring-2 focus:ring-${color}-400`}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export { RadioButton };
