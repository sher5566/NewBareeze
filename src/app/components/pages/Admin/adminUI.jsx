"use client";

import React, { useState, useEffect } from "react";
import DiscountService from "../../../api/DiscountService";
import { AlertCircle, Copy, Check } from "lucide-react";

const DiscountAdmin = () => {
  const [discount, setDiscount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [updatedCode, setUpdatedCode] = useState("");

  useEffect(() => {
    const currentDiscount = DiscountService.getCurrentDiscount();
    setDiscount(currentDiscount);
  }, []);

  const handleApplyDiscount = () => {
    if (DiscountService.setGlobalDiscount(discount)) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Generate updated code
      const updatedProducts = DiscountService.getDiscountedProducts();
      const code = `export const productsApi = ${JSON.stringify(
        updatedProducts,
        null,
        2
      )};`;
      setUpdatedCode(code);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(updatedCode);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Discount Management</h1>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-32 p-2 border rounded-md"
            />
            <span className="text-lg">%</span>
            <button
              onClick={handleApplyDiscount}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply Global Discount
            </button>
          </div>

          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
              <Check size={16} />
              <span>Discount applied successfully!</span>
            </div>
          )}
        </div>
      </div>

      {updatedCode && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Updated Product Data</h2>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              {showCopySuccess ? <Check size={16} /> : <Copy size={16} />}
              {showCopySuccess ? "Copied!" : "Copy Code"}
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-2">
              To make this discount permanent, copy this code and replace your
              existing products data:
            </p>
            <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
              {updatedCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountAdmin;
