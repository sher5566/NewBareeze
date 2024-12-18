import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicIcon from "../../../global/icons/index";
import { Btn } from "../../../global/buttons/Button";
import { InputField } from "../../../global/inputs/Inputfield";

/**
 * @component SearchBar
 * @description A slide-down search bar component for searching products.
 *
 * @param {boolean} isOpen - Controls visibility of the search bar.
 * @param {Function} onClose - Function to handle closing of the search bar.
 */
const SearchBar = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const executeSearch = () => {
    if (searchText.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const handleClose = () => {
    setSearchText("");
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 h-16">
        <div className="flex items-center w-3/4 max-w-lg mx-auto ">
          <InputField
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            additionalClasses="w-full border rounded-full px-4 py-2 text-gray-700 "
            aria-label="Search for products"
          />
          <Btn
            onClick={executeSearch}
            aria-label="Search"
            customStyles="ml-2 text-gray-500 hover:text-black mt-1"
            text={<DynamicIcon name="search" additionalClasses="text-xl" />}
          />
        </div>
        <Btn
          onClick={handleClose}
          aria-label="Close"
          customStyles="text-gray-600 hover:text-black"
          text={
            <DynamicIcon
              name="fix"
              additionalClasses="text-2xl hover:bg-[#03a9f4] rounded-full p-1 hover:text-white"
            />
          }
        />
      </div>
    </div>
  );
};

export default SearchBar;
