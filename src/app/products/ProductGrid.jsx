"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { Helper } from "../utils/helpers/index";
import Filter from "../components/pages/products/productFilter/page";
import TypographyAtom from "../components/global/typography/Typography";
import ProductCard from "../components/pages/products/ProductCard";
import PaginationControls from "../components/pages/Pagination/PaginationControle";
import NoProducts from "../components/pages/products/NoProducts";
import ProductControls from "../components/pages/products/ProductControls";
import { setProducts } from "../redux/slices/products/products";
import ProductService from "../api/ProductsService";
import LoadingSpinner from "../components/pages/Loading/LoadingSpinner";

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(
    Helper.global.resetFilters()
  );

  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  const products = useSelector(
    (state) => state?.products?.productList?.Products || []
  );

  const isLoading = useSelector(
    (state) => state?.products?.isLoadingProductList
  );

  const dispatch = useDispatch();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getProducts();
      if (response.success) {
        dispatch(setProducts(response.data));
      }
    };
    fetchProducts();
  }, [dispatch]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return Helper.global.processProducts(products, {
      categoryName,
      searchQuery,
      activeFilters,
    });
  }, [products, categoryName, searchQuery, activeFilters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return Helper.global.sortProducts(filteredProducts, sortType);
  }, [filteredProducts, sortType]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName, searchQuery, activeFilters, sortType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterApply = (filters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setActiveFilters(Helper.global.resetFilters());
    setIsFilterOpen(false);
  };
  const clearSearch = () => {
    router.push(`/products?category=All`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 mt-0 pt-0">
      {/* Page Heading */}
      <TypographyAtom
        additionalClasses="text-2xl font-medium text-center mb-6"
        variant="h1"
        text={Helper.global.getDisplayTitle(categoryName, searchQuery)}
      />

      {/* Product Controls */}
      <ProductControls
        setIsFilterOpen={setIsFilterOpen}
        searchQuery={searchQuery}
        sortType={sortType}
        setSortType={setSortType}
        clearSearch={clearSearch}
        simpleOptions={[
          { value: "newest", label: "Newest" },
          { value: "price-low-high", label: "Price: Low to High" },
          { value: "price-high-low", label: "Price: High to Low" },
        ]}
      />

      {/* Filter Sidebar */}
      {isFilterOpen && (
        <div className="z-50 fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex justify-start">
          <Filter
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onFilter={handleFilterApply}
          />
        </div>
      )}

      {/* No Products Found */}
      {!sortedProducts.length ? (
        <div className="text-center mt-8">
          <NoProducts />
          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleResetFilters}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
              Reset Filters
            </button>
            {/* Optional: Open filter panel */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="text-blue-500 underline hover:text-blue-600"
            >
              Change Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
