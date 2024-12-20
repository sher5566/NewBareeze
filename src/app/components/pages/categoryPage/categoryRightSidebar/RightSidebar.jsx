"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  updateOrderNote,
} from "../../../../redux/slices/cartslice/Cartslice";
import TypographyAtom from "../../../global/typography/Typography";
import { Btn } from "../../../global/buttons/Button";
import DynamicIcon from "../../../global/icons/index";
import { InputField } from "../../../global/inputs/Inputfield";
import { Helper } from "../../../../utils/helpers/index";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";

const CartSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const orderNote = useSelector((state) => state.cart.orderNote);

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => {
      // Calculate discounted price using the helper function
      const itemTotal =
        item.discount && item.discount !== "0%"
          ? Helper.global.calculateDiscountedPrice(item.price, item.discount) *
            item.quantity
          : item.price * item.quantity; // Original price if no discount

      return total + itemTotal;
    }, 0);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuantityUpdate = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));

    // Show Remove toast notification
    toast.success("Successfully removed from the bag");
  };

  const calculateItemTotal = (item) => {
    if (item.discount && item.discount !== "0%") {
      return Helper.global.calculateDiscountedPrice(
        item.price * item.quantity,
        item.discount
      );
    }
    return item.price * item.quantity;
  };

  const handleCheckout = () => {
    onClose();
    router.push("/categoryPage/checkout");
  };

  return (
    <>
      {/* Main sidebar container with responsive width */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full md:w-[400px] bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header Section */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b">
          <TypographyAtom
            text="CART"
            type="h2"
            additionalClasses="text-lg md:text-xl font-medium"
          />
          <Btn
            onClick={onClose}
            customStyles="p-2"
            text={<DynamicIcon name="fix" />}
          />
        </div>

        {/* Scrollable Cart Items Section with adjusted height for mobile */}
        <div className="h-[calc(100vh-230px)] md:h-[calc(100vh-250px)] overflow-y-auto p-3 md:p-4">
          {mounted && cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <DynamicIcon
                name="shoppingBag"
                size="text-3xl md:text-4xl"
                color="text-gray-400"
              />
              <TypographyAtom
                text="Your cart is empty"
                type="p"
                additionalClasses="text-gray-500"
              />
            </div>
          ) : (
            mounted && (
              <div className="space-y-4 md:space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 md:gap-4 border-b pb-4"
                  >
                    {/* Product Image with responsive sizing */}
                    <div className="relative w-20 h-28 md:w-24 md:h-32">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Product Details with responsive text */}
                    <div className="flex-1 min-w-0">
                      <TypographyAtom
                        text={item.title}
                        type="h3"
                        additionalClasses="font-medium text-sm md:text-base truncate"
                      />
                      <TypographyAtom
                        text={`SKU: ${item.sku}`}
                        type="p"
                        additionalClasses="text-xs md:text-sm text-gray-500 mt-1"
                      />
                      {/* Price Display with responsive layout */}
                      <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-2">
                        <TypographyAtom
                          text={`PKR ${calculateItemTotal(
                            item
                          ).toLocaleString()}`}
                          type="p"
                          additionalClasses={`text-sm md:text-base ${
                            item.discount && item.discount !== "0%"
                              ? "font-medium"
                              : ""
                          }`}
                        />
                        {item.discount && item.discount !== "0%" && (
                          <>
                            <TypographyAtom
                              text={`PKR ${(
                                item.price * item.quantity
                              ).toLocaleString()}`}
                              type="p"
                              additionalClasses="text-xs md:text-sm text-gray-500 line-through"
                            />
                            <span className="text-red-600 text-xs md:text-sm">
                              ({item.discount} OFF)
                            </span>
                          </>
                        )}
                      </div>
                      {/* Quantity Controls with responsive spacing */}
                      <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3">
                        <Btn
                          onClick={() =>
                            handleQuantityUpdate(item.id, item.quantity - 1)
                          }
                          customStyles="w-7 h-7 md:w-8 md:h-8 border flex items-center justify-center text-sm md:text-base"
                          text="−"
                        />
                        <TypographyAtom
                          additionalClasses="w-6 md:w-8 text-center text-sm md:text-base"
                          text={item.quantity.toString()}
                        />
                        <Btn
                          onClick={() =>
                            handleQuantityUpdate(item.id, item.quantity + 1)
                          }
                          customStyles="w-7 h-7 md:w-8 md:h-8 border flex items-center justify-center text-sm md:text-base"
                          text="+"
                        />
                        <Btn
                          onClick={() => handleRemoveItem(item.id)}
                          customStyles="ml-auto text-red-500"
                          text={
                            <DynamicIcon
                              name="trash"
                              size="text-lg md:text-xl"
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Order Note Section with responsive padding */}
        {mounted && (
          <div className="p-3 md:p-4 border-t">
            <TypographyAtom
              text="ADD ORDER NOTE"
              type="h3"
              additionalClasses="text-xs md:text-sm font-medium mb-2"
            />
            <InputField
              value={orderNote}
              onChange={(e) => dispatch(updateOrderNote(e.target.value))}
              placeholder="Add any instructions that we might need..."
              additionalClasses="w-full p-2 border text-xs md:text-sm resize-none h-16 md:h-20"
            />
          </div>
        )}

        {/* Cart Footer with responsive spacing */}
        {mounted && cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-3 md:p-4">
            <div className="flex justify-between mb-3 md:mb-4">
              <TypographyAtom
                text="SUB TOTAL:"
                type="p"
                additionalClasses="font-medium text-sm md:text-base"
              />
              <TypographyAtom
                text={`PKR ${calculateSubTotal().toLocaleString()}`}
                type="p"
                additionalClasses="font-medium text-sm md:text-base"
              />
            </div>
            <TypographyAtom
              text="Tax included. Shipping calculated at checkout."
              type="p"
              additionalClasses="text-xs md:text-sm text-gray-500 mb-3 md:mb-4"
            />
            <Btn
              text="CHECKOUT"
              customStyles="w-full bg-black text-white py-2.5 md:py-3 text-sm md:text-base hover:bg-gray-800"
              onClick={handleCheckout}
            />
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default CartSidebar;
