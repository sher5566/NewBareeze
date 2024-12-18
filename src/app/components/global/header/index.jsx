"use client"; // Marks this as a Client Component in Next.js

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import DynamicIcon from "../icons/index";
import TypographyAtom from "../typography/Typography";
import CategorySidebar from "../../pages/categoryPage/categorySidebar/page";
import SearchBar from "../../pages/categoryPage/searchBar/searchBar";
import CartSidebar from "../../pages/categoryPage/categoryRightSidebar/RightSidebar";
import { Helper } from "../../../utils/helpers/index";

/**
 * @component CartIndicator
 * @description Renders a small red dot indicator for cart items
 * @param {Object} props - Component props
 * @param {number} props.count - Number of items in cart to determine visibility
 * @returns {JSX.Element|null} Returns the indicator element or null if count is 0
 */
const CartIndicator = ({ count }) => {
  if (!count) return null;
  return (
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
  );
};

/**
 * @component MobileNavItem
 * @description Renders a mobile navigation item with icon and optional indicator
 * @param {Object} props - Component props
 * @param {Object} props.item - Navigation item data
 * @param {string} props.item.icon - Icon name
 * @param {string} [props.item.href] - Link URL if item is a link
 * @param {Function} [props.item.action] - onClick handler if item is a button
 * @param {boolean} props.item.showIndicator - Whether to show the cart indicator
 * @param {number} props.item.badge - Badge count for cart items
 * @returns {JSX.Element} A button or link with icon and optional indicator
 */
const MobileNavItem = ({ item }) => {
  const content = (
    <div className="relative">
      <DynamicIcon name={item.icon} color="text-gray-800" size="text-2xl" />
      {item.showIndicator && <CartIndicator count={item.badge} />}
    </div>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="relative p-2 hover:bg-gray-100 rounded-full"
        aria-label={item.text}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={item.action}
      className="relative p-2 hover:bg-gray-100 rounded-full"
      aria-label={item.text}
    >
      {content}
    </button>
  );
};

/**
 * @component DesktopNavItem
 * @description Renders a desktop navigation item with text and optional indicator
 * @param {Object} props - Component props
 * @param {Object} props.item - Navigation item data
 * @param {string} props.item.text - Display text
 * @param {string} [props.item.href] - Link URL if item is a link
 * @param {Function} [props.item.action] - onClick handler if item is a button
 * @param {boolean} props.item.showIndicator - Whether to show the cart indicator
 * @param {number} props.item.badge - Badge count for cart items
 * @returns {JSX.Element} A button or link with text and optional indicator
 */
const DesktopNavItem = ({ item }) => {
  const content = (
    <div className="relative">
      <TypographyAtom
        text={item.text}
        size="text-sm"
        additionalClasses="font-medium tracking-wider"
      />
      {item.showIndicator && <CartIndicator count={item.badge} />}
    </div>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="hover:text-gray-600"
        aria-label={item.text}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={item.action}
      className="hover:text-gray-600"
      aria-label={item.text}
    >
      {content}
    </button>
  );
};

/**
 * @component Header
 * @description Main header component with responsive design, navigation items, and sidebars
 * @returns {JSX.Element} The complete header with navigation, logo, and sidebars
 */
const Header = () => {
  // State management for various UI elements
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.length;

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Navigation items configuration
   * Memoized to prevent unnecessary recalculations
   */
  const navItems = React.useMemo(() => {
    if (!mounted) return [];
    return [
      {
        text: "MENU",
        icon: "",
        action: () =>
          Helper.global.toggleSidebar(isSidebarOpen, setSidebarOpen),
      },
      {
        text: "SEARCH",
        icon: "search",
        action: () => Helper.global.toggleSidebar(isSearchOpen, setSearchOpen),
      },
      {
        text: "SHOPPING BAG",
        icon: "cart",
        action: () => Helper.global.toggleSidebar(isCartOpen, setCartOpen),
        badge: cartItemsCount,
        showIndicator: cartItemsCount > 0,
      },
    ];
  }, [mounted, cartItemsCount, isSidebarOpen, isSearchOpen, isCartOpen]);

  return (
    <header className="sticky top-0 z-50  bg-white shadow-md">
      {/* Main header container */}
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-12 md:h-16 lg:h-16">
          {/* Left Section - Menu button and Logo */}
          <div className="flex align-middle">
            <button
              onClick={() =>
                Helper.global.toggleSidebar(isSidebarOpen, setSidebarOpen)
              }
              className="p-2 rounded-md"
              aria-label="Menu"
            >
              <DynamicIcon name="bars" color="text-gray-800" size="text-2xl" />
            </button>

            <Link href="/" className="hidden lg:block">
              <Image
                src="/images/bareeze-logo-transparent.svg"
                alt="Bareezé Logo"
                width={140}
                height={45}
                priority
                className="h-7 md:h-14 w-auto"
              />
            </Link>
          </div>

          {/* Right Section - Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            {mounted &&
              navItems.map((item) => (
                <MobileNavItem key={item.text} item={item} />
              ))}
          </div>

          {/* Right Section - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {mounted &&
              navItems.map((item, index) => (
                <React.Fragment key={item.text}>
                  {index > 0 && <span className="text-gray-300">|</span>}
                  <DesktopNavItem item={item} />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      {/* Sidebar Components */}
      <CategorySidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          Helper.global.toggleSidebar(isSidebarOpen, setSidebarOpen)
        }
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => Helper.global.toggleSidebar(isCartOpen, setCartOpen)}
      />
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => Helper.global.toggleSidebar(isSearchOpen, setSearchOpen)}
      />

      {/* Backdrop for when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() =>
            Helper.global.toggleSidebar(isSidebarOpen, setSidebarOpen)
          }
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
