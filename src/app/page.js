"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/slices/products/products";
import ProductService from "./api/ProductsService";
import ProductGrid from "./products/ProductGrid";

export default function Page() {
  // Initialize Redux dispatch
  const dispatch = useDispatch();

  /**
   * Effect hook to fetch and initialize product data on component mount
   * Uses ProductService to get products and updates Redux store
   */
  useEffect(() => {
    const response = ProductService.getProducts();
    if (response.success) {
      dispatch(setProducts(response.data));
    }
  }, [dispatch]); // Re-run if dispatch changes
  return (
    <main>
      {/* Banner Section */}
      <section>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[720px] flex flex-col items-center justify-center text-center bg-[#03a9f4] text-white -top-10 relative">
          {/* Styled Text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
            EXCLUSIVE FRIDAY
          </h1>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none drop-shadow-lg">
            SALE
          </h2>
        </div>
      </section>

      {/* Products Grid Section */}
      <section>
        <ProductGrid />
      </section>
    </main>
  );
}
