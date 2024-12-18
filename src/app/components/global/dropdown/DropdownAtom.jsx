import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { registerConfirmation } from "../dialog/Index";
import { openDialog } from "../../../redux/slices/global/confirmation";

/**
 * A reusable dropdown (select) component using Tailwind CSS.
 *
 * @component
 * @param {object} props - The component props.
 * @returns {JSX.Element} - The rendered dropdown component.
 */
const DropdownAtom = ({
  label = "",
  selectedItem = null,
  onChange,
  options,
  required = false,
  disabled = false,
  name = "",
  validation = { isShowError: false, error: null },
  isDialogShowBeforeChange = false,
  dialog = {
    title: "Change Item",
    message: "Do you want to change the item?",
  },
}) => {
  const [localSelectedItem, setLocalSelectedItem] = useState(
    selectedItem?.value || ""
  );
  const dispatch = useDispatch();

  // Handle selection changes
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;

    if (isDialogShowBeforeChange) {
      const confirmationId = registerConfirmation((confirmed) => {
        if (confirmed) {
          setLocalSelectedItem(selectedValue);
          onChange(name, selectedValue);
        }
      });

      dispatch(
        openDialog({
          ...dialog,
          confirmationId,
        })
      );
      return;
    }

    setLocalSelectedItem(selectedValue);
    onChange(name, selectedValue);
  };

  useEffect(() => {
    setLocalSelectedItem(selectedItem?.value || "");
  }, [selectedItem]);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={`${name}-dropdown`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={`${name}-dropdown`}
        name={name}
        value={localSelectedItem}
        onChange={handleDropdownChange}
        disabled={disabled}
        className={`block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
          validation.isShowError ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        required={required}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {validation.isShowError && (
        <p className="text-red-500 text-sm mt-1">{validation.error}</p>
      )}
    </div>
  );
};

DropdownAtom.propTypes = {
  label: PropTypes.string,
  selectedItem: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  validation: PropTypes.shape({
    isShowError: PropTypes.bool,
    error: PropTypes.string,
  }),
  isDialogShowBeforeChange: PropTypes.bool,
  dialog: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default DropdownAtom;
