import React, { Suspense } from "react";
import CategorySidebarClient from "./CategorySidebarClient";
import LoadingSpinner from "../../Loading/LoadingSpinner";

const CategorySidebar = ({ isOpen, onClose }) => {
  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <CategorySidebarClient isOpen={isOpen} onClose={onClose} />
    </Suspense>
  );
};

export default CategorySidebar;
