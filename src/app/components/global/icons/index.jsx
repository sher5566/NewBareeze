"use client";
import React from "react";
import PropTypes from "prop-types";
import {
  FaBars,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaUser,
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaComment,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheck,
  FaExclamationCircle,
  FaInfoCircle,
  FaQuestionCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaClock,
  FaTrash,
  FaWhatsapp,
  FaTruck,
  
  
} from "react-icons/fa";

import { FiX ,FiWhatsApp } from "react-icons/fi";
// Map of icon names to their components
const iconMap = {
  // Navigation & UI
  bars: FaBars,
  menu: FaBars, // alias for bars
  close: FaTimes,
  search: FaSearch,
  clock: FaClock,
  fix: FiX,
  trash: FaTrash,
  truck: FaTruck,
  
  
  

  // Basic UI elements
  chevronDown: FaChevronDown,
  chevronUp: FaChevronUp,
  chevronLeft: FaChevronLeft,
  chevronRight: FaChevronRight,

  // Contact & Communication
  phone: FaPhone,
  email: FaEnvelope,
  comment: FaComment,
  bell: FaBell,

  // User related
  user: FaUser,
  signIn: FaSignInAlt,
  signOut: FaSignOutAlt,
  register: FaUserPlus,

  // Navigation & Location
  home: FaHome,

  // E-commerce
  cart: FaShoppingCart,
  heart: FaHeart,
  star: FaStar,

  // Settings & System
  settings: FaCog,

  // Status & Feedback
  check: FaCheck,
  error: FaExclamationCircle,
  info: FaInfoCircle,
  question: FaQuestionCircle,

  // Social Media
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
};

/**
 * DynamicIcon Component - Renders a Font Awesome icon dynamically.
 *
 * @param {object} props - Component props
 * @param {string} props.name - The name of the icon (e.g., "bars", "search")
 * @param {string} [props.color] - Tailwind CSS color class (e.g., "text-blue-500")
 * @param {string} [props.size] - Tailwind CSS size class (e.g., "text-2xl")
 * @param {string} [props.additionalClasses] - Additional Tailwind CSS classes
 * @param {string} [props.title] - Accessible title for the icon
 * @param {function} [props.onClick] - Click handler for the icon
 * @returns {JSX.Element|null} The rendered icon component
 */
const DynamicIcon = ({
  name,
  color = "text-gray-500",
  size = "text-xl",
  additionalClasses = "",
  title = "Icon",
  onClick,
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in the icon map.`);
    return null;
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${color} ${size} ${additionalClasses} ${
        onClick ? "cursor-pointer" : ""
      }`}
      role="img"
      aria-label={title}
      onClick={onClick}
    >
      <IconComponent />
    </div>
  );
};

DynamicIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  additionalClasses: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default DynamicIcon;
