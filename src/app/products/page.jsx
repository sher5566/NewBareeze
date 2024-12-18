/**
 * @file Products page component that displays a grid of products
 * @module app/pages/products
 */

import { Suspense } from "react";
import ProductGrid from "./ProductGrid";
import LoadingSpinner from "../components/pages/Loading/LoadingSpinner";


/**
 * Products page component that renders a grid of products with loading fallback
 *
 * @component
 * @description
 * This component serves as the main products page, implementing React Suspense
 * for loading states. It wraps the ProductGrid component to handle data fetching
 * and display a loading fallback while content is being loaded.
 *
 * @example
 * // Basic usage in app router:
 * // app/products/page.js
 * <ProductsPage />
 *
 * @returns {JSX.Element} Rendered products page with Suspense boundary
 */
export default function ProductsPage() {
 
  // @todo: Place the loading spiinner in th fallback element
  return (
    // Wrap ProductGrid in Suspense to handle loading states
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <ProductGrid />
    </Suspense>
  );
}
