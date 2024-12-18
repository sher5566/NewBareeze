import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

/**
 * DatePickerAtom component for reusable date picking across the application.
 * Can be used in both controlled and uncontrolled modes.
 *
 * @component
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the date picker.
 * @param {boolean} props.controlled - Flag to indicate if the picker is controlled.
 * @param {any} props.value - The current value of the date (used in controlled mode).
 * @param {function} props.onChange - Function to handle date changes (used in controlled mode).
 * @param {any} props.defaultValue - The default date (used in uncontrolled mode).
 * @param {boolean} props.disableFuture - Option to disable future dates.
 * @param {boolean} props.disablePast - Option to disable past dates.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.format - The format of the date string.
 * @param {object} props.validation - The validation object for the input field.
 * @param {boolean} props.validation.isShowError - Flag to show error message.
 * @param {string} props.validation.error - The error message to display.
 * @param {boolean} props.required - Flag to indicate if the input is required.
 * @returns {JSX.Element} The rendered date picker component.
 */
const DatePickerAtom = ({
  label,
  controlled = true,
  value = dayjs().format("YYYY-MM-DD"),
  onChange,
  defaultValue = null,
  disableFuture = false,
  disablePast = false,
  name = null,
  format = "YYYY-MM-DD",
  validation = { isShowError: false, error: null },
  required = false,
}) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState(
    defaultValue || dayjs().format(format)
  );

  // Handle date change
  const handleDateChange = (e) => {
    const newValue = e.target.value;
    if (controlled && onChange) {
      onChange(newValue, name);
    } else {
      setInternalValue(newValue);
    }
  };

  // Set min and max dates for past/future restrictions
  const minDate = disablePast ? dayjs().format("YYYY-MM-DD") : null;
  const maxDate = disableFuture ? dayjs().format("YYYY-MM-DD") : null;

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <input
        type="date"
        name={name}
        value={controlled ? value : internalValue}
        onChange={handleDateChange}
        required={required}
        min={minDate}
        max={maxDate}
        className={`w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          validation.isShowError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {validation.isShowError && (
        <span className="text-red-500 text-sm">{validation.error}</span>
      )}
    </div>
  );
};

// PropTypes for validation
DatePickerAtom.propTypes = {
  label: PropTypes.string.isRequired,
  controlled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  name: PropTypes.string,
  format: PropTypes.string,
  validation: PropTypes.shape({
    isShowError: PropTypes.bool,
    error: PropTypes.string,
  }),
  required: PropTypes.bool,
};

export default DatePickerAtom;
