import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { Btn } from "../../global/buttons/Button";

const CheckoutForm = ({
  formData,
  provinces,
  cities,
  handleInputChange,
  handleSubmit,
  validationSchema,
}) => {
  const [currentField, setCurrentField] = useState("fullName");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastId, setToastId] = useState(null); // State to track the current toast ID

  const showToastMessage = (message) => {
    // Check if the toast with the same message is already displayed
    if (!toastId) {
      const id = toast.error(message, {
        id: message, // Set an ID for the toast to prevent duplicates
      });
      setToastId(id);

      // Reset the toastId after a brief delay (default toast duration)
      setTimeout(() => {
        setToastId(null);
      }, 4000);
    }
  };

  const validateField = (field, value) => {
    if (!formSubmitted) return true;
    try {
      validationSchema.shape[field].parse(value);
      return true;
    } catch (error) {
      if (error.errors?.length > 0) {
        showToastMessage(error.errors[0].message);
      }
      return false;
    }
  };

  const validateAndMoveNext = (field, value) => {
    if (validateField(field, value)) {
      const fieldsOrder = [
        "fullName",
        "email",
        "address",
        "province",
        "city",
        "postalCode",
        "phone",
      ];
      const nextField = fieldsOrder[fieldsOrder.indexOf(field) + 1];
      setCurrentField(nextField);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const fields = [
      "fullName",
      "email",
      "address",
      "province",
      "city",
      "postalCode",
      "phone",
    ];

    let isValid = true;
    for (const field of fields) {
      if (!validateField(field, formData[field])) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      handleSubmit(e);
    }
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      borderColor:
        currentField === "province" || currentField === "city"
          ? "black"
          : base.borderColor,
      borderWidth: "1px",
      borderRadius: "0.375rem",
      minHeight: "42px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <div className="text-green-600 font-medium mb-2">
          Available In Pakistan
        </div>
        <h2 className="text-xl font-semibold">Shipment Information</h2>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
        <div>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => {
              handleInputChange("fullName", e.target.value);
              if (currentField === "fullName")
                validateAndMoveNext("fullName", e.target.value);
            }}
            className={`w-full p-2 border ${
              currentField === "fullName"
                ? "border-blue-500"
                : "border-gray-300"
            } rounded-md`}
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              handleInputChange("email", e.target.value);
              if (currentField === "email")
                validateAndMoveNext("email", e.target.value);
            }}
            className={`w-full p-2 border ${
              currentField === "email" ? "border-blue-500" : "border-gray-300"
            } rounded-md`}
          />
        </div>

        <div>
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => {
              handleInputChange("address", e.target.value);
              if (currentField === "address")
                validateAndMoveNext("address", e.target.value);
            }}
            className={`w-full p-2 border ${
              currentField === "address" ? "border-blue-500" : "border-gray-300"
            } rounded-md`}
          />
        </div>

        <div>
          <Select
            options={provinces}
            value={provinces.find((p) => p.value === formData.province)}
            onChange={(selected) => {
              handleInputChange("province", selected.value);
              if (currentField === "province")
                validateAndMoveNext("province", selected.value);
            }}
            placeholder="Select Province"
            styles={customSelectStyles}
          />
        </div>

        <div>
          <Select
            options={cities}
            value={cities.find((c) => c.value === formData.city)}
            onChange={(selected) => {
              handleInputChange("city", selected.value);
              if (currentField === "city")
                validateAndMoveNext("city", selected.value);
            }}
            placeholder="Select City"
            styles={customSelectStyles}
          />
        </div>

        <div>
          <input
            name="postalCode"
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) => {
              handleInputChange("postalCode", e.target.value);
              if (currentField === "postalCode")
                validateAndMoveNext("postalCode", e.target.value);
            }}
            className={`w-full p-2 border ${
              currentField === "postalCode"
                ? "border-blue-500"
                : "border-gray-300"
            } rounded-md`}
          />
        </div>

        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number (e.g., 03123456789)"
            value={formData.phone}
            onBlur={(e) => {
              if (formSubmitted) validateField("phone", e.target.value);
            }}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`border ${
              currentField === "phone" ? "border-blue-500" : "border-gray-300"
            } w-full p-2 rounded-md`}
          />
        </div>

        <div>
          <Btn
            type="submit"
            customStyles="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            text="Order On WhatsApp"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
