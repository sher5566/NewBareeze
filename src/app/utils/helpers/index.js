/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier for the product
 * @property {string} title - Product name/title
 * @property {string} Category - Product category
 * @property {string} Color - Product color
 * @property {string} Fabric - Product fabric type
 * @property {number} price - Product price
 * @property {string} [discount] - Discount percentage if applicable (e.g., "10%")
 * @property {string[]} details - Array of product details/features
 */

/**
 * @typedef {Object} FilterOptions
 * @property {string[]} categories - Available category filters
 * @property {string[]} colors - Available color filters
 * @property {string[]} fabrics - Available fabric filters
 */

/**
 * @typedef {Object} ActiveFilters
 * @property {string[]} category - Selected category filters
 * @property {string[]} color - Selected color filters
 * @property {string[]} fabric - Selected fabric filters
 */

/**
 * @typedef {Object} FilterParams
 * @property {string} categoryName - Category name to filter by
 * @property {string} searchQuery - Search query string
 * @property {ActiveFilters} activeFilters - Currently active filters
 */

/**
 * @typedef {Object} NavItem
 * @property {string} text - Display text for the navigation item
 * @property {string} icon - Icon identifier
 * @property {Function} [action] - Click handler function
 * @property {string} [href] - Navigation URL if applicable
 * @property {number} [badge] - Badge count if applicable
 */

/**
 * @typedef {Object} FooterLink
 * @property {string} text - Link text
 * @property {string} href - Link URL
 */

/**
 * Helper utilities for e-commerce functionality
 * @namespace
 */

export const Helper = {
  global: {
    /**
     * Filters products by category name
     * @param {Array<Object>} products - Array of product objects
     * @param {string} categoryName - Category name to filter by
     * @returns {Array<Object>} Filtered products array
     */
    getFilteredProducts: (products, categoryName) => {
      if (!categoryName) return products;
      return products.filter((product) => product.Category === categoryName);
    },

    /**
     * Processes products with all filters
     * @param {Array<Object>} products - Products array
     * @param {Object} filters - Active filters
     * @returns {Array<Object>} Filtered products array
     */
    applyFilters: (products, filters) => {
      return products.filter((product) => {
        const categoryMatch =
          filters.category.length === 0 ||
          filters.category.includes(product.Category);
        const colorMatch =
          filters.color.length === 0 || filters.color.includes(product.Color);
        const fabricMatch =
          filters.fabric.length === 0 ||
          filters.fabric.includes(product.Fabric);

        return categoryMatch && colorMatch && fabricMatch;
      });
    },

    /**
     * Formats price in PKR currency format
     * @param {number} price - Price to format
     * @returns {string} Formatted price with PKR currency
     */
    formatPrice: (price) => {
      return `PKR ${price.toLocaleString()}`;
    },

    /**
     * Generates a random discounted price for testing
     * @returns {number} Random price between 0 and 25000
     */
    getRandomDiscountedPrice: () => {
      return Math.floor(Math.random() * 25000);
    },

    /**
     * Gets all available filter options for products
     * @returns {FilterOptions} Object containing arrays of filter options
     */
    getFilterOptions: () => ({
      categories: ["Casuals", "Formals", "Prints", "Shawls"] || [],
      colors:
        [
          "Aqua",
          "Beige",
          "Black",
          "Blue",
          "Brown",
          "Cream",
          "D-Blue",
          "Green",
        ] || [],
      fabrics:
        ["Karandi", "Karandi Lawn", "Khaddar", "Khaddi", "Lawn", "Organza"] ||
        [],
    }),

    /**
     * Handles filter value toggling
     * @param {Object} prevFilters - Previous filter state
     * @param {string} type - Filter type (category, color, fabric)
     * @param {string} value - Value to toggle
     * @returns {Object} Updated filters
     */
    handleFilterChange: (prevFilters, type, value) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }),

    /**
     * Resets all filters
     * @returns {Object} Reset filter object
     */
    resetFilters: () => ({
      category: [],
      color: [],
      fabric: [],
    }),

    /**
     * Calculates final price after applying discount
     * @param {number} price - Original price
     * @param {string} discount - Discount percentage (e.g. "10%")
     * @returns {number} Final price after discount
     */
    calculateDiscountedPrice: (price, discount) => {
      if (!discount || discount === "0%") return price;
      const discountPercentage = parseFloat(discount.replace("%", "")) / 100;
      return price * (1 - discountPercentage);
    },

    /**
     * Calculates total price based on quantity, size and applicable discounts
     * @param {number} basePrice - Base price of the product
     * @param {number} quantity - Quantity of items being purchased
     * @param {string} selectedSize - Selected size ("2-PIECES" or "3-PIECES")
     * @param {number} threePiecePrice - Price for 3-piece variant
     * @param {string} discount - Discount percentage (e.g. "10%")
     * @returns {number} Total price after applying all calculations
     */
    calculateTotalPrice: (
      basePrice,
      quantity,
      selectedSize,
      threePiecePrice,
      discount
    ) => {
      // Determine base price based on selected size
      const pricePerUnit =
        selectedSize === "3-PIECES" ? threePiecePrice : basePrice;

      // Apply any applicable discounts
      const discountedPrice = Helper.global.calculateDiscountedPrice(
        pricePerUnit,
        discount
      );

      // Calculate final price based on quantity
      return discountedPrice * quantity;
    },

    /**
     * Formats product details based on selected size
     * @param {string[]} details - Array of product detail strings
     * @param {string} selectedSize - Selected size ("2-PIECES" or "3-PIECES")
     * @returns {string[]} Filtered array of relevant product details
     * @description
     * - For 2-PIECES: Returns first 2 details (index 0-1)
     * - For 3-PIECES: Returns last 3 details (index 2-4)
     */
    formatProductDetails: (details, selectedSize) => {
      if (!details) return [];

      // Set array slice range based on selected size
      const startIndex = selectedSize === "3-PIECES" ? 2 : 0;
      const endIndex = selectedSize === "3-PIECES" ? 5 : 2;

      // Return relevant subset of details
      return details.slice(startIndex, endIndex);
    },

    /**
     * Calculates original price before discount
     * @param {number} price - Current price
     * @param {string} discount - Discount percentage (e.g. "10%")
     * @returns {number} Original price before discount was applied
     * @example
     * // Returns 100 (original price) for price=90 and discount="10%"
     * calculateOriginalPrice(90, "10%")
     */
    calculateOriginalPrice: (price, discount) => {
      // Return same price if no discount
      if (!discount || discount === "0%") return price;

      // Convert discount percentage to decimal
      const discountPercentage = parseFloat(discount.replace("%", "")) / 100;

      // Calculate and return original price
      return price / (1 - discountPercentage);
    },

    /**
     * Gets unique categories from products array with generated IDs
     *
     * @param {Array<Object>} product - Array of product objects
     * @returns {Array<Object>} Array of unique categories with IDs
     */
    getCategoryAll: (products) => {
      if (!products || !products.length) return [];

      // Get unique categories
      const uniqueCategories = [
        ...new Set(products.map((item) => item.Category)),
      ];

      // Map categories to category objects
      const categoryObjects = uniqueCategories.map((categoryName) => ({
        name: categoryName,
        id: categoryName.toLowerCase().replace(/\s+/g, "-"),
      }));

      // Add the "All" category as the first option
      return [{ name: "All", id: "all" }, ...categoryObjects];
    },

    /**
     * Sorts products based on type
     * @param {Array<Object>} products - Products array
     * @param {string} sortType - Sorting type
     * @returns {Array<Object>} Sorted products array
     */
    sortProducts: (products, sortType) => {
      const sorted = [...products];
      switch (sortType) {
        case "price-low-high":
          return sorted.sort((a, b) => a.price - b.price);
        case "price-high-low":
          return sorted.sort((a, b) => b.price - a.price);
        default:
          return sorted;
      }
    },
    /**
     * Searches products based on query string
     * @param {Array<Object>} products - Array of product objects
     * @param {string} query - Search query
     * @returns {Array<Object>} Filtered products array
     */
    searchProducts: (products, query) => {
      if (!query) return products;

      const lowercaseQuery = query.toLowerCase();
      return products.filter(
        (product) =>
          product.Category?.toLowerCase().includes(lowercaseQuery) ||
          product.Fabric?.toLowerCase().includes(lowercaseQuery) ||
          product.title?.toLowerCase().includes(lowercaseQuery)
      );
    },

    /**
     * Gets display title based on category and search query
     * @param {string} categoryName - Category name
     * @param {string} searchQuery - Search query
     * @returns {string} Display title
     */
    getDisplayTitle: (categoryName, searchQuery) => {
      if (searchQuery) return `Search Results for "${searchQuery}"`;
      return categoryName || "All Products";
    },

    /**
     * Processes products with all filters
     * @param {Array<Object>} products - Products array
     * @param {Object} params - Filter parameters
     * @param {string} params.categoryName - Category filter
     * @param {string} params.searchQuery - Search query
     * @param {Object} params.activeFilters - Active filters object
     * @returns {Array<Object>} Processed products array
     */
    processProducts: (
      products,
      { categoryName, searchQuery, activeFilters }
    ) => {
      if (!products || !products.length) return [];

      let filtered = products;

      // Filter by category (case-insensitive)
      if (categoryName && categoryName !== "All") {
        filtered = filtered.filter(
          (product) =>
            product?.Category &&
            product.Category.toLowerCase() === categoryName.toLowerCase()
        );
      }

      // Search query filter
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product?.Category?.toLowerCase().includes(
              searchQuery.toLowerCase()
            ) ||
            product?.Color?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product?.Fabric?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply active filters (category, color, fabric)
      if (activeFilters) {
        filtered = filtered.filter((product) => {
          const categoryMatch =
            activeFilters.category.length === 0 ||
            activeFilters.category.includes(product.Category);

          const colorMatch =
            activeFilters.color.length === 0 ||
            activeFilters.color.includes(product.Color);

          const fabricMatch =
            activeFilters.fabric.length === 0 ||
            activeFilters.fabric.includes(product.Fabric);

          return categoryMatch && colorMatch && fabricMatch; // Match all active filters
        });
      }

      return filtered;
    },

    /**
     * Toggles mobile menu sections open/closed state
     * @param {string} section - Section identifier to toggle
     * @param {Object} currentState - Current menu open/closed state
     * @returns {Object} Updated menu state object
     */
    toggleMobileMenu: (section, currentState) => ({
      ...currentState,
      [section]: !currentState[section],
    }),

    /**
     * Handles newsletter subscription form submission
     * @param {string} email - User's email address
     * @returns {Promise<NewsletterResponse>} Response indicating success/failure
     */
    handleNewsletterSubmit: async (email) => {
      try {
        // Add newsletter API call logic here
        return { success: true, message: "Successfully subscribed" };
      } catch (error) {
        return { success: false, message: "Subscription failed" };
      }
    },

    /**
     * Footer navigation links grouped by section
     * @type {Object<string, FooterLink[]>}
     */
    footerLinks: {
      information: [
        { text: "FAQs", href: "/storeInformation" },
        { text: "Privacy Policy", href: "/storeInformation" },
        { text: "Exchange Policy", href: "/storeInformation" },
        { text: "Shipping Policy", href: "/storeInformation" },
        { text: "Store Locator", href: "/storeInformation" },
      ],
      company: [
        { text: "About Us", href: "/storeInformation" },
        { text: "Contact Us", href: "/storeInformation" },
        { text: "Look Book", href: "/storeInformation" },
      ],
    },

    /**
     * Contact information with icons
     * @type {ContactInfo[]}
     */
    contactInfo: [
      { icon: "phone", text: "+92 303 3157000" },
      { icon: "email", text: "customercare@newbareeze.com" },
      { icon: "clock", text: "Mon-Sat, (09:00 AM To 10:00 PM PST)" },
    ],

    /**
     * Social media profile links
     * @type {SocialLink[]}
     */
    socialLinks: [
      { platform: "facebook", url: "/" },
      { platform: "instagram", url: "/" },
    ],

    /**
     * Initialize navigation items with their configurations
     * @param {Object} params - Parameters for creating nav items
     * @param {Function} params.setSearchOpen - Search sidebar state setter
     * @param {Function} params.setCartOpen - Cart sidebar state setter
     * @param {number} params.cartItemsCount - Number of items in cart
     * @returns {NavItem[]} Array of navigation items
     */
    initializeNavItems: ({ setSearchOpen, setCartOpen, cartItemsCount }) => [
      {
        text: "SEARCH",
        icon: "search",
        action: () => setSearchOpen(true),
      },
      {
        text: "TRACK ORDER",
        icon: "truck",
        href: "#",
      },
      {
        text: "SHOPPING BAG",
        icon: "cart",
        action: () => setCartOpen(true),
        badge: cartItemsCount,
      },
    ],

    /**
     * Handles sidebar toggle
     * @param {boolean} currentState - Current sidebar state
     * @param {Function} setState - State setter function
     */
    toggleSidebar: (currentState, setState) => {
      setState(!currentState);
    },

    /**
     * Creates aria label for navigation items
     * @param {string} text - Item text
     * @param {number} [badge] - Optional badge count
     * @returns {string} Formatted aria label
     */
    getAriaLabel: (text, badge) => {
      return badge ? `${text} (${badge} items)` : text;
    },

    /**
     * Calculates total price for a single cart item including quantity and any discounts
     * @param {Object} item - Cart item object
     * @param {number} item.price - Unit price of the item
     * @param {number} item.quantity - Quantity of item in cart
     * @param {string} [item.discount] - Discount percentage if applicable (e.g. "10%")
     * @returns {number} Total price for the item after applying quantity and discount
     * @example
     * // Returns 90 for item with price=50, quantity=2, discount="10%"
     * calculateItemTotal({price: 50, quantity: 2, discount: "10%"})
     */
    calculateItemTotal: (item) => {
      // If no discount, simply multiply price by quantity
      if (!item.discount || item.discount === "0%") {
        return item.price * item.quantity;
      }

      // Calculate total with discount applied
      return Helper.global.calculateDiscountedPrice(
        item.price * item.quantity,
        item.discount
      );
    },

    /**
     * Calculates subtotal for entire cart before shipping and additional fees
     * @param {Object[]} items - Array of cart items
     * @param {number} items[].price - Unit price of each item
     * @param {number} items[].quantity - Quantity of each item
     * @param {string} [items[].discount] - Discount percentage if applicable
     * @returns {number} Cart subtotal including all items and their discounts
     */
    calculateCartSubtotal: (items) => {
      // Sum up total price of all items
      return items.reduce(
        (total, item) => total + Helper.global.calculateItemTotal(item),
        0
      );
    },

    /**
     * Calculates total discount amount applied across all cart items
     * @param {Object[]} items - Array of cart items
     * @param {number} items[].price - Unit price of each item
     * @param {number} items[].quantity - Quantity of each item
     * @param {string} [items[].discount] - Discount percentage if applicable
     * @returns {number} Total amount saved through discounts
     * @description
     * Calculates difference between original and discounted prices
     * for all items that have discounts applied
     */
    calculateTotalDiscount: (items) => {
      return items.reduce((total, item) => {
        // Only calculate discount if item has one
        if (item.discount && item.discount !== "0%") {
          // Calculate price before and after discount
          const originalPrice = item.price * item.quantity;
          const discountedPrice = Helper.global.calculateItemTotal(item);
          // Add difference to total discount amount
          return total + (originalPrice - discountedPrice);
        }
        return total;
      }, 0);
    },

    /**
     * Calculates final cart total including subtotal, shipping and additional fees
     * @param {number} subtotal - Cart subtotal after all item discounts
     * @param {number} [shipping=0] - Shipping cost if applicable
     * @param {number} [additionalFees=0] - Any additional fees (tax, handling, etc)
     * @returns {number} Final total including all costs
     * @example
     * // Returns 110 for subtotal=100, shipping=10, no additional fees
     * calculateFinalTotal(100, 10)
     */
    calculateFinalTotal: (subtotal, shipping = 0, additionalFees = 0) => {
      // Sum all components of final total
      return subtotal + shipping + additionalFees;
    },
  },

  product: {
    // Gets available sizes for product
    // @returns {string[]} Array of available sizes
    getAvailableSizes: () => {
      return ["2-PIECES", "3-PIECES"];
    },
  },
};
