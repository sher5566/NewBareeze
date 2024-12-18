import React from "react";
import PropTypes from "prop-types";
import DynamicIcon from "../icons/index"; // Assume this dynamically renders icons based on name

/**
 * Reusable ActionMenu component using Tailwind CSS
 * @param {object} props - Component props
 * @param {Array} props.menuItems - Array of menu items with optional icon and label.
 * @param {object} props.anchorEl - The element to anchor the menu to.
 * @param {boolean} props.open - Whether the menu is open.
 * @param {function} props.onClose - Function to close the menu.
 * @param {function} props.onMenuItemClick - Callback function for menu item click event.
 * @param {string} props.menuClasses - Custom Tailwind classes for the menu container.
 * @param {string} props.menuItemClasses - Custom Tailwind classes for the menu items.
 * @param {string} props.iconClasses - Custom Tailwind classes for the icons.
 * @param {string} props.labelClasses - Custom Tailwind classes for the menu item labels.
 * @returns {JSX.Element} Rendered ActionMenu component.
 */
const ActionMenuAtom = ({
  menuItems,
  anchorEl,
  open,
  onClose,
  onMenuItemClick,
  menuClasses = "",
  menuItemClasses = "",
  iconClasses = "",
  labelClasses = "",
}) => {
  // Handle menu item click and pass the clicked item to the callback function
  const handleMenuItemClick = (value) => {
    onMenuItemClick(value);
    onClose(); // Close the menu after click
  };

  // Calculate position of the menu
  const menuPosition = anchorEl
    ? {
        top: `${anchorEl.offsetTop + anchorEl.offsetHeight}px`,
        left: `${anchorEl.offsetLeft}px`,
      }
    : {};

  return (
    open && (
      <div
        className={`absolute z-50 bg-white shadow-lg rounded-md py-2 ${menuClasses}`}
        style={menuPosition}
        role="menu"
        aria-labelledby="action-button"
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${menuItemClasses}`}
            onClick={() => handleMenuItemClick(item.value)}
            role="menuitem"
          >
            {item.icon && (
              <div className={`mr-2 ${iconClasses}`}>
                <DynamicIcon iconName={item.icon} />
              </div>
            )}
            <span className={`text-sm ${labelClasses}`}>{item.label}</span>
          </div>
        ))}
      </div>
    )
  );
};

ActionMenuAtom.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string, // Icon name as a string for dynamic rendering
      label: PropTypes.string.isRequired, // Text for the menu item
      value: PropTypes.string.isRequired, // Value for the menu item
    })
  ).isRequired,
  anchorEl: PropTypes.object, // The anchor element to which the menu is attached
  open: PropTypes.bool.isRequired, // Whether the menu is open or not
  onClose: PropTypes.func.isRequired, // Function to close the menu
  onMenuItemClick: PropTypes.func.isRequired, // Function to call on menu item click
  menuClasses: PropTypes.string, // Custom Tailwind classes for the menu container
  menuItemClasses: PropTypes.string, // Custom Tailwind classes for the menu items
  iconClasses: PropTypes.string, // Custom Tailwind classes for the icons
  labelClasses: PropTypes.string, // Custom Tailwind classes for the menu item labels
};

export default ActionMenuAtom;
