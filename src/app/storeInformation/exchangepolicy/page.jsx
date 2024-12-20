"use client";

import DynamicIcon from "../../components/global/icons/index";

const ExchangePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Exchange Policy
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="refresh" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Exchange Guidelines
            </h3>
            <div className="space-y-4">
              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Exchange Eligibility
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Items must be unused and in original condition</li>
                  <li>• Exchange request within 7 days of delivery</li>
                  <li>• Original receipt required for all exchanges</li>
                  <li>• Items must be in original packaging</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Exchange Process
                </h4>
                <ol className="text-gray-600 space-y-2 list-decimal ml-4">
                  <li>Contact our customer service</li>
                  <li>Get exchange authorization</li>
                  <li>Return the item to our store</li>
                  <li>Choose your replacement item</li>
                </ol>
              </section>

              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Non-Exchangeable Items
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Cut pieces or altered fabrics</li>
                  <li>• Sale or clearance items</li>
                  <li>• Custom-ordered materials</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExchangePolicy;
