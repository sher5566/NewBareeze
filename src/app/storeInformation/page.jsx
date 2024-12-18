import React from "react";
import DynamicIcon from "../components/global/icons/index";

const StoreInformation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Store Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        newBareeze Store Information
      </h2>

      {/* Location Section */}
      <div className="mb-8 bg-blue-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="home" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Store Location
            </h3>
            <p className="text-gray-600">Rabi Center, Murry Road</p>
            <p className="text-gray-600">Rawalpindi, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Store Details */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="star" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              About Our Store
            </h3>
            <p className="text-gray-600">
              We offer a comprehensive collection of high-quality fabrics. Our
              store features a wide range of textiles suitable for all your
              needs, from casual wear to formal attire.
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Policy */}
      <div className="mb-8 bg-blue-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="truck" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Shipping Policy
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Free shipping on orders above PKR 5,000</li>
              <li>• Delivery within 3-5 business days</li>
              <li>• Nationwide delivery service available</li>
              <li>• Secure packaging for safe delivery</li>
              <li>• Track your order through our system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <DynamicIcon name="phone" color="text-blue-600" size="text-2xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Phone
              </h3>
              <a
                href="tel:03033157000"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                0303 3157000
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <DynamicIcon
              name="whatsapp"
              color="text-blue-600"
              size="text-2xl"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                WhatsApp
              </h3>
              <a
                href="https://wa.me/923033157000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                0303 3157000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 flex justify-center space-x-6">
        <DynamicIcon
          name="facebook"
          color="text-blue-600"
          size="text-3xl"
          additionalClasses="hover:text-blue-800 transition-colors cursor-pointer"
        />
        <DynamicIcon
          name="instagram"
          color="text-blue-600"
          size="text-3xl"
          additionalClasses="hover:text-blue-800 transition-colors cursor-pointer"
        />
        <DynamicIcon
          name="twitter"
          color="text-blue-600"
          size="text-3xl"
          additionalClasses="hover:text-blue-800 transition-colors cursor-pointer"
        />
      </div>
    </div>
  );
};

export default StoreInformation;
