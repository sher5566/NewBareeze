"use client";

/**
 * @fileoverview ProductDetail component for displaying detailed product information and purchasing options
 * @requires react
 * @requires react-redux
 * @requires next/navigation
 * @requires ../../../../utils/helpers/index
 * @requires ../../../../components/global/buttons/Button
 * @requires ../../../../components/global/typography/Typography
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Helper } from "../../../utils/helpers/index";
import { Btn } from "../../../components/global/buttons/Button";
import TypographyAtom from "../../../components/global/typography/Typography";
import { addToCart } from "../../../redux/slices/cartslice/Cartslice";
import { toast, Toaster } from "react-hot-toast";
import { setProducts } from "../../../redux/slices/products/products";
import ProductService from "../../../api/ProductsService";

/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier for the product
 * @property {string} title - Product name/title
 * @property {string} Discount - Discount percentage (e.g., "10%", "0%")
 * @property {number} price - Base price for 2-piece variant
 * @property {number} ThreePprice - Price for 3-piece variant
 * @property {string} Season - Product season (e.g., "WINTER-24")
 * @property {string} Fabric - Product fabric type
 * @property {string} Color - Product color
 * @property {string} Category - Product category
 * @property {string[]} details - Array of product details and specifications
 * @property {string[]} images - Array of product image URLs
 * @property {boolean} free_shipping - Indicates if product has free shipping
 * @property {boolean} sold_out - Indicates if product is out of stock
 */

/**
 * ProductDetail component displays comprehensive product information including
 * images, pricing, size selection, quantity controls, and detailed specifications.
 *
 * @component
 * @example
 * return (
 *   <ProductDetail />
 * )
 */
const ProductDetail = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  /**
   * @typedef {Object} ComponentState
   * @property {string} selectedSize - Currently selected size ("2-PIECES" or "3-PIECES")
   * @property {number} quantity - Selected product quantity
   * @property {number} selectedImageIndex - Index of currently displayed image
   * @property {boolean} isProductDetailsOpen - Product details accordion state
   * @property {boolean} isShippingOpen - Shipping details accordion state
   */

  /** @type {[string, function]} Size selection state */
  const [selectedSize, setSelectedSize] = useState("2-PIECES");
  /** @type {[number, function]} Quantity selection state */
  const [quantity, setQuantity] = useState(1);
  /** @type {[number, function]} Selected image index state */
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  /** @type {[boolean, function]} Product details accordion state */
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(true);
  /** @type {[boolean, function]} Shipping info accordion state */
  const [isShippingOpen, setIsShippingOpen] = useState(true);
  const [toastId, setToastId] = useState(null); // State to track the current toast ID

  /**
   * Effect hook to fetch and initialize product data on component mount
   * Uses ProductService to get products and updates Redux store
   */
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getProducts();
      if (response.success) {
        dispatch(setProducts(response.data));
      }
    };
    fetchProducts();
  }, [dispatch]);

  const showToastMessage = (message) => {
    // Check if the toast with the same message is already displayed
    if (!toastId) {
      const id = toast.error(message, {
        id: message, // Set an ID for the toast to prevent duplicates
      });
      setToastId(id);

      // Reset the toastId after a brief delay (default toast duration)
      setTimeout(() => {
        setToastId(null);
      }, 4000);
    }
  };
  /**
   * Products list from Redux store
   * @type {Array<Product>}
   */
  const products = useSelector(
    (state) => state?.products?.productList?.Products || []
  );

  // Get cart items from Redux store to check if product is already in cart
  const cartItems = useSelector((state) => state.cart.items);

  /**
   * Currently selected product
   * @type {Product|undefined}
   */
  const product = products.find((p) => p.id === params.id);

  /**
   * Checks if the product is already in the shopping cart
   * @type {boolean}
   */
  const isInCart = cartItems.some((item) => item.productId === product.id);

  /**
   * Handles quantity changes with minimum limit of 1
   * @param {number} increment - Amount to increment/decrement (-1 or 1)
   * @returns {void}
   */
  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleAddToBag = (e) => {
    e.preventDefault();

    // Check if product is out of stock
    if (product.sold_out) {
      showToastMessage("Sorry, this product is currently out of stock");
      return;
    }

    // Generate SKU format from product details
    const sku = `${product.Category}-${product.id}`.toUpperCase();

    // Calculate the base price based on selected size
    const basePrice =
      selectedSize === "3-PIECES" ? product.ThreePprice : product.price;

    // Prepare cart item with required format
    const cartItem = {
      productId: product.id,
      title: product.title,
      color: product.Color,
      sku: sku,
      price: basePrice,
      quantity: quantity,
      image: product.images[0],
      size: selectedSize,
      discount: product.Discount, // Add the discount information
    };

    // Dispatch to Redux store
    dispatch(addToCart(cartItem));

    // Show success toast notification
    toast.success(`${product.title} successfully added to bag`);
  };

  /**
   * Navigates back to main products listing page
   * @returns {void}
   */
  const handleBackClick = () => {
    router.push(`/products?category=all`);
  };

  /**
   * Renders product not found state
   * @returns {JSX.Element} Not found message and return button
   */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <TypographyAtom
            text="Product not found"
            type="h2"
            additionalClasses="text-2xl text-gray-600"
          />
          <Btn
            onClick={handleBackClick}
            customStyles="text-black underline hover:no-underline"
            text="Return to Products"
          />
        </div>
      </div>
    );
  }

  /**
   * Current base price based on selected size variant
   * @type {number}
   */
  const currentPrice =
    selectedSize === "3-PIECES" ? product.ThreePprice : product.price;

  /**
   * Total price including quantity and applicable discounts
   * @type {number}
   */
  const totalPrice = Helper.global.calculateTotalPrice(
    product.price,
    quantity,
    selectedSize,
    product.ThreePprice,
    product.Discount
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="relative aspect-[3/4] bg-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <Btn
                customStyles="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md"
                onClick={() => router.back()}
                text="←"
              />
            </div>
            {/* Thumbnail Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <Btn
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  customStyles={`aspect-square overflow-hidden ${
                    selectedImageIndex === index ? "ring-2 ring-black" : ""
                  }`}
                  text={
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  }
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <TypographyAtom
                text={product.title}
                type="h1"
                additionalClasses="text-2xl font-medium"
              />
              {/* Price Display with Discount Handling */}
              <div className="flex items-center gap-2 mt-4">
                {product.Discount !== "0%" ? (
                  <>
                    <TypographyAtom
                      text={Helper.global.formatPrice(
                        Helper.global.calculateDiscountedPrice(
                          currentPrice,
                          product.Discount
                        ) * quantity
                      )}
                      type="h2"
                      additionalClasses="text-xl font-medium"
                    />
                    <TypographyAtom
                      text={Helper.global.formatPrice(currentPrice * quantity)}
                      type="h2"
                      additionalClasses="text-gray-500 line-through text-lg"
                    />
                    <span className="bg-[#03a9f4] text-sm">
                      ({product.Discount} OFF)
                    </span>
                  </>
                ) : (
                  <TypographyAtom
                    text={Helper.global.formatPrice(currentPrice * quantity)}
                    type="h2"
                    additionalClasses="text-xl font-medium"
                  />
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <p className="text-sm mb-2">
                Size: {selectedSize.split("-")[0]}-Pieces
              </p>
              <div className="flex gap-3">
                {Helper.product.getAvailableSizes().map((size) => (
                  <Btn
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    customStyles={`px-4 py-2 border ${
                      selectedSize === size
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black border-gray-300"
                    }`}
                    text={size}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selection and Add to Bag */}
            <div className="flex items-center gap-4">
              <div className="flex border border-gray-300">
                <Btn
                  onClick={() => handleQuantityChange(-1)}
                  customStyles="px-3 py-2 border-r hover:bg-gray-100"
                  text="-"
                />
                <TypographyAtom
                  text={quantity}
                  type="span"
                  additionalClasses="px-4 py-2 min-w-[40px] text-center"
                />
                <Btn
                  onClick={() => handleQuantityChange(1)}
                  customStyles="px-3 py-2 border-l hover:bg-gray-100"
                  text="+"
                />
              </div>
              {isInCart ? ( // Already in Cart Message
                <div className="w-full bg-[#03a9f4] text-white py-2 px-4 text-sm uppercase font-medium text-center">
                  Already in Cart
                </div>
              ) : (
                <Btn
                  onClick={handleAddToBag}
                  customStyles="flex-1 bg-black text-white py-2 px-4 hover:bg-gray-900"
                  text="ADD TO BAG"
                />
              )}
            </div>

            {/* Product Details Accordion */}
            <div className="border-t pt-4">
              <Btn
                onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}
                customStyles="flex justify-between items-center w-full py-2"
                text={`PRODUCT DETAILS  ${isProductDetailsOpen ? "−" : "+"}`}
              />

              {isProductDetailsOpen && (
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  {Helper.global
                    .formatProductDetails(product.details, selectedSize)
                    .map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                </div>
              )}
            </div>

            {/* Shipping Information Accordion */}
            <div className="border-t pt-4">
              <Btn
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                customStyles="flex justify-between items-center w-full py-2"
                text={`SHIPPING  ${isShippingOpen ? "-" : "+"}  `}
              />

              {isShippingOpen && (
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <TypographyAtom
                    text="• Standard delivery: 3-5 working days"
                    type="body1"
                  />
                  <TypographyAtom
                    text="• Express delivery: 1-2 working days (additional charges apply)"
                    type="body1"
                  />
                  <TypographyAtom
                    text="• Free shipping on orders above PKR 5,000"
                    type="body1"
                  />
                  <TypographyAtom
                    text="• Cash on delivery available"
                    type="body1"
                  />
                </div>
              )}
            </div>

            {/* Out of Stock Notice */}
            {product.sold_out && (
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <TypographyAtom
                  text="Currently out of stock"
                  type="body1"
                  additionalClasses="text-red-600 text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
