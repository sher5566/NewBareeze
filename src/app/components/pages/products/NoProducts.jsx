"use client";

import React from "react";
import TypographyAtom from "../../global/typography/Typography";
import { Btn } from "../../global/buttons/Button";

const NoProducts = ({ searchQuery, clearSearch }) => {
  return (
    <div className="text-center py-12">
      {searchQuery ? (
        <>
          <TypographyAtom
            additionalClasses="text-gray-600 mb-2"
            variant="body1"
            text={`No results found for "${searchQuery}"`}
          />
          <Btn
            onClick={clearSearch}
            customStyles="text-blue-600 hover:underline"
            text="Clear search"
          />
        </>
      ) : (
        <TypographyAtom
          additionalClasses="text-xl text-gray-600"
          variant="h2"
          text="No products match your filters."
        />
      )}
    </div>
  );
};

export default NoProducts;
