import React, { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";
import LoadingSpinner from "../../../components/pages/Loading/LoadingSpinner";

export async function generateStaticParams() {
  // Example: Replace this with your API to fetch IDs
  const productDetails = ["winter-collection", "summer-collection"];
  const productIds = ["1", "2", "3"];

  return productDetails.flatMap((detail) =>
    productIds.map((id) => ({ ProductDetail: detail, id }))
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div><LoadingSpinner/></div>}>
      <ProductDetailClient />
    </Suspense>
  );
}
