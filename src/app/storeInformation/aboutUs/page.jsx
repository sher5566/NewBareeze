"use client"

import React from "react";
import DynamicIcon from "../../components/global/icons/index";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        About newBareeze
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="star" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 mb-4">
              Welcome to newBareeze, your premier destination for high-quality
              fabrics and textiles. Established with a vision to provide
              exceptional quality materials, we have grown to become one of
              Pakistan s leading fabric retailers.
            </p>
            <p className="text-gray-600 mb-4">
              Our extensive collection features a wide range of fabrics suitable
              for all occasions, from casual wear to formal attire. We take
              pride in offering:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Premium quality fabrics from renowned manufacturers</li>
              <li>• Diverse selection of patterns and designs</li>
              <li>• Competitive pricing and regular promotions</li>
              <li>• Expert customer service and fabric consultation</li>
              <li>• Regular new arrivals and seasonal collections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs