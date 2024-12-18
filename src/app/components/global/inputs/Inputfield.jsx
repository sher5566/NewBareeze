import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

/**
 * A reusable and flexible input component (atom) that supports multiple types of input.
 *
 * This component uses standard HTML input elements styled with Tailwind CSS.
 *
 * @component
 * @param {object} props - Component props.
 * @returns {JSX.Element} - The rendered input component.
 */
const InputField = ({
  type = "text",
  label = "",
  value,
  onChange,
  placeholder = "",
  required = true,
  disabled = false,
  fullWidth = true,
  validator,
  validateOn = "change", // ["change", "submit"]
  onBlur,
  onFocus,
  size = "small", // "small", "medium", "large"
  color = "primary", // Tailwind text color classes
  multiline = false,
  rows = 1,
  name,
  onMountValidate = false,
  valueType,
  validation = {
    isShowError: false,
    error: null,
  },
  additionalClasses = "",
  ...props
}) => {
  if (!valueType) valueType = type;

  const [validationState, setValidationState] = useState(validation);

  // Handle change event with optional validation
  const handleChange = (event) => {
    const newValue = event.target.value;

    if (validator && validateOn === "change") {
      const validationResult = validator(newValue, valueType);
      setValidationState(validationResult);
      if (onChange) onChange(event, validationResult);
    } else {
      if (onChange) onChange(event);
    }
  };

  const handleBlur = (event) => {
    const newValue = event.target.value;

    if (validator && validateOn === "submit") {
      const validationResult = validator(newValue, valueType);
      setValidationState(validationResult);
      if (onBlur) onBlur(event, validationResult);
    } else {
      if (onBlur) onBlur(event);
    }
  };

  useEffect(() => {
    if (!onMountValidate) return;

    const eventT = {
      target: {
        name: name,
        value: value,
      },
    };

    if (onChange) onChange(eventT);
  }, [onMountValidate, name, value, onChange]);

  // Dynamic size classes
  const sizeClasses = {
    small: "text-sm py-2 px-3",
    medium: "text-base py-3 px-4",
    large: "text-lg py-4 px-5",
  };

  // Dynamic border and text color based on validation state
  const borderClasses = validationState.isShowError
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-blue-500";

  return (
    <div className={`flex flex-col ${fullWidth ? "w-full" : "w-auto"}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 text-gray-700 ${sizeClasses[size]}`}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`resize-none border rounded-md focus:outline-none focus:ring-2 ${borderClasses} ${sizeClasses[size]} ${additionalClasses}`}
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`  ${sizeClasses[size]} ${additionalClasses}`}
          {...props}
        />
      )}
      {validationState.isShowError && (
        <span className="mt-1 text-sm text-red-500">
          {validationState.error}
        </span>
      )}
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "checkbox",
    "email",
    "password",
    "number",
    "search",
    "url",
    "tel",
    "date",
    "datetime-local",
    "month",
    "week",
    "time",
    "color",
  ]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  validator: PropTypes.func,
  validateOn: PropTypes.oneOf(["change", "submit"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMountValidate: PropTypes.bool,
  valueType: PropTypes.string,
  validation: PropTypes.object,
  additionalClasses: PropTypes.string, // Custom Tailwind CSS classes
};

export { InputField };
