import React from "react";
import PropTypes from "prop-types";

/**
 * A loading spinner component that displays a circular loader using Tailwind CSS.
 *
 * This component renders a circular loading spinner with a customizable size.
 * It defaults to a size of `24px` if no size is provided.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} [props.size=24] - The size of the loading spinner. Defaults to 24.
 * @returns {JSX.Element} - The rendered loading spinner component.
 */
const LoadingSpinner = ({ size = 24 }) => (
  <div
    className={`animate-spin rounded-full border-2 border-t-white border-gray-300`}
    style={{ width: `${size}px`, height: `${size}px` }}
  />
);

LoadingSpinner.propTypes = {
  size: PropTypes.number,
};

/**
 * A customizable button component that supports loading states.
 *
 * This component renders a Tailwind-styled button with an optional loading spinner
 * when `isLoading` is true. It supports various customization options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to display inside the button.
 * @param {function} props.onClick - Function to handle the button click event.
 * @param {string} [props.color] - Button text color (default: "text-white").
 * @param {boolean} [props.fullWidth] - Whether the button should take the full width of its container.
 * @param {string} [props.variant] - Button style variant ("contained", "outlined", "text").
 * @param {boolean} [props.isLoading] - Whether the button should show a loading spinner.
 * @param {string} [props.type] - Button type (default: "button").
 * @param {string} [props.size] - Button size (default: "medium").
 * @param {object} [props.customStyles] - Custom Tailwind classes for the button.
 * @returns {JSX.Element} - The rendered button component.
 */
const Btn = ({
  text,
  onClick,
  color = "text-white",
  fullWidth = true, 
  variant = "",
  isLoading = false,
  type = "button",
  size = "small",
  customStyles = "",
}) => {
  const baseStyles = `
    flex items-center justify-center
    rounded-full px-6 py-2 font-medium text-sm
    ${fullWidth ? "w-full" : "w-auto"}
    ${size === "small" ? "text-xs py-1 px-3" : ""}
    ${size === "large" ? "text-lg py-3 px-8" : ""}
  `;

  const variantStyles = {
    contained: "bg-blue-500 hover:bg-blue-600 text-white",
    outlined: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    text: "bg-transparent text-blue-500 hover:underline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${customStyles} ${variantStyles[variant]} ${
        isLoading ? "opacity-60 cursor-not-allowed" : ""
      } ${customStyles}`}
    >
      {isLoading ? <LoadingSpinner size={24} /> : text}
    </button>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  customStyles: PropTypes.string,
};

export { Btn };
