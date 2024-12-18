import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * CategoryDropdown component for displaying categories with a custom input field.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<{ category: string, options: Array<{ label: string, value: string }> }>} props.categories - Array of categories with options.
 * @param {string} props.label - The label for the dropdown.
 * @param {function} props.onChange - Callback for when the value changes.
 * @param {string} [props.value] - The current value of the dropdown.
 * @param {boolean} [props.required] - Whether the field is required.
 * @param {string} [props.category] - The category of the dropdown.
 * @param {string} [props.name] - The name of the dropdown.
 * @param {boolean} [props.isCustomInputDisabled] - Whether the custom input is disabled.
 * @returns {JSX.Element} The rendered dropdown component.
 */
const CategoryDropdown = ({
  categories,
  label,
  onChange,
  value = "",
  required = false,
  category = "custom",
  name,
  isCustomInputDisabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [openMenu, setOpenMenu] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    if (onChange) {
      onChange(name, inputValue);
    }
    setTimeout(() => setOpenMenu(false), 200);
  };

  const handleOptionClick = (value, category) => {
    setInputValue(value);
    onChange(name, value);
    setOpenMenu(false);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={isCustomInputDisabled ? null : handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => setOpenMenu(true)}
        required={required}
        className={`block w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
          required && !inputValue ? "border-red-500" : "border-gray-300"
        }`}
      />
      {openMenu && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto z-10">
          {categories.map((categoryItem) => (
            <div key={categoryItem.category}>
              <div className="px-4 py-2 bg-gray-100 font-bold text-sm text-gray-700">
                {categoryItem.category}
              </div>
              {categoryItem.options.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-200 ${
                    categoryItem.category === category && option.value === value
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() =>
                    handleOptionClick(option.value, categoryItem.category)
                  }
                >
                  <span className="text-gray-700">{option.label}</span>
                  {categoryItem.category === category &&
                    option.value === value && (
                      <span className="text-blue-500">✔</span>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  category: PropTypes.string,
  name: PropTypes.string,
  isCustomInputDisabled: PropTypes.bool,
};

export default CategoryDropdown;
