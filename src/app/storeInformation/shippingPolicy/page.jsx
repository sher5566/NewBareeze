"use client";

import DynamicIcon from "../../components/global/icons/index";

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Shipping Policy
      </h2>

      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="truck" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Delivery Information
            </h3>
            <div className="space-y-4">
              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Shipping Rates
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Free shipping on orders above PKR 5,000</li>
                  <li>
                    • Standard shipping fee: PKR 200 for orders below PKR 5,000
                  </li>
                  <li>• Express delivery available at additional cost</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Delivery Timeline
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery: 1-2 business days</li>
                  <li>• Order processing time: 24-48 hours</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-gray-800 mb-2">Tracking</h4>
                <p className="text-gray-600">
                  Track your order through our system using the tracking number
                  provided in your shipping confirmation email.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShippingPolicy