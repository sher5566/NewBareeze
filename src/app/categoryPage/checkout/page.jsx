"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import CheckoutForm from "../../components/pages/Checkout/CheckoutForm";
import CartSummary from "../../components/pages/Checkout/CartSummary";
import EmptyCart from "../../components/pages/Checkout/EmptyCart";
import { Helper } from "../../utils/helpers/index";
import { z } from "zod";
import { CitiesData } from "../../utils/data/PakistanDistricts";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/slices/products/products";
import ProductService from "../../api/ProductsService";

/**
 * WhatsApp contact number for store owner communications
 * Used for sending order details via WhatsApp
 * @constant {string}
 */
const STORE_OWNER_WHATSAPP = "923033157000";

/**
 * Checkout Page Component
 * Handles the complete checkout process including form validation, order processing,
 * and WhatsApp integration for order communication
 *
 * @component
 * @returns {JSX.Element} Rendered checkout page with form and cart summary
 */
const CheckoutPage = () => {
  const router = useRouter();
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  /**
   * State Management
   * @state {boolean} isClient - Controls client-side rendering
   * @state {Array} provinces - List of available provinces
   * @state {Array} filteredCities - Cities filtered by selected province
   * @state {string} postalCode - Selected area postal code
   */
  const [isClient, setIsClient] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");

  /**
   * Form data state containing customer and shipping information
   * @state {Object} formData - Customer form data
   * @property {string} email - Customer email address
   * @property {string} fullName - Customer full name
   * @property {string} address - Shipping address
   * @property {string} province - Selected province
   * @property {string} city - Selected city
   * @property {string} postalCode - Area postal code
   * @property {string} phone - Contact phone number
   */
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const dispatch = useDispatch();

  /**
   * Fetches product data on component mount and updates Redux store
   * @effect
   */
  useEffect(() => {
    const response = ProductService.getProducts();
    if (response.success) {
      dispatch(setProducts(response.data));
    }
  }, [dispatch]);

  /**
   * Zod validation schema for form data
   * Defines validation rules and error messages for each form field
   * @constant {z.ZodObject}
   */
  const validationSchema = z.object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters long")
      .regex(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    province: z.string().min(1, "Province is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z
      .string()
      .regex(/^\d{5}$/, "Postal Code must be exactly 5 digits"),
    phone: z
      .string()
      .regex(
        /^03\d{9}$/,
        "Phone number must start with 03 and be exactly 11 digits long"
      ),
  });

  /**
   * Initializes provinces data and enables client-side rendering
   * @effect
   */
  useEffect(() => {
    setProvinces(
      Object.keys(CitiesData).map((key) => ({ value: key, label: key }))
    );
    setIsClient(true);
  }, []);

  /**
   * Handles form input changes and updates related dependent fields
   * @param {string} name - Field name
   * @param {string} value - New field value
   */
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle province selection and update cities
    if (name === "province") {
      setFilteredCities(
        CitiesData[value]?.map((city) => ({
          value: city.name,
          label: city.name,
        })) || []
      );
      setFormData((prev) => ({
        ...prev,
        city: "",
        postalCode: "",
      }));
      setPostalCode("");
    }

    // Handle city selection and update postal code
    if (name === "city") {
      const selectedCity = filteredCities.find((city) => city.value === value);
      setPostalCode(selectedCity?.postalCode || "");
      setFormData((prev) => ({
        ...prev,
        postalCode: selectedCity?.postalCode || "",
      }));
    }
  };

  /**
   * Creates formatted WhatsApp message with order details
   * @returns {string} Encoded WhatsApp message URL
   */
  const createWhatsAppMessage = () => {
    const formattedItems = cartItems
      .map(
        (item) =>
          `• ${item.title} (${item.quantity}x)\n
          ID: ${item.id}
           Color: ${item.color}
            Price: ${Helper.global.formatPrice(
              Helper.global.calculateItemTotal(item)
            )}`
      )
      .join("\n");

    const message = `
🛍️ New Order!

Customer Details:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: +92${formData.phone}

Shipping Address:
${formData.address}
${formData.city}, ${formData.province}
${formData.postalCode}

Order Details:
${formattedItems}

Summary:
Subtotal: ${Helper.global.formatPrice(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    )}
shipments: 300     
Total: ${Helper.global.formatPrice(finalTotal)}`;

    return encodeURIComponent(message);
  };

  /**
   * Handles form submission, validates data, and redirects to WhatsApp
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validationSchema.parse(formData);
      const whatsappURL = `https://wa.me/${STORE_OWNER_WHATSAPP}?text=${createWhatsAppMessage()}`;
      window.open(whatsappURL, "_blank");
      toast.success("Order successfully created And navigating to WhatsApp");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  // Handle client-side rendering
  if (!isClient) {
    return <div className="min-h-screen bg-white py-8"></div>;
  }

  // Show empty cart component if no items in cart
  if (!cartItems?.length) {
    return <EmptyCart router={router} />;
  }

  /**
   * Calculate order totals
   * @constant {number} subtotal - Sum of all items prices
   * @constant {number} totalDiscount - Sum of all discounts
   * @constant {number} shipping - Fixed shipping cost
   * @constant {number} finalTotal - Final order total including shipping
   */
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total +
      (item.discount
        ? item.price * (parseFloat(item.discount) / 100) * item.quantity
        : 0),
    0
  );
  const shipping = 300;
  const finalTotal = subtotal - totalDiscount + shipping;

  return (
    <div className="min-h-screen bg-white py-8">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <CheckoutForm
              formData={formData}
              provinces={provinces}
              cities={filteredCities}
              postalCode={postalCode}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              validationSchema={validationSchema}
            />
          </div>
          <div className="lg:col-span-5">
            <CartSummary
              cartItems={cartItems}
              subtotal={subtotal}
              totalDiscount={totalDiscount}
              shipping={shipping}
              finalTotal={finalTotal}
              Helper={Helper}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
