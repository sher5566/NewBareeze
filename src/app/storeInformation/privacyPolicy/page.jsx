"use client";

import DynamicIcon from "../../components/global/icons/index";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Privacy Policy
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="shield" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Your Privacy Matters
            </h3>
            <div className="space-y-4">
              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Information Collection
                </h4>
                <p className="text-gray-600">
                  We collect only necessary information required for order
                  processing and delivery. This includes your name, contact
                  details, and delivery address.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Data Security
                </h4>
                <p className="text-gray-600">
                  Your personal information is encrypted and securely stored. We
                  never share your data with third parties without your consent.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Cookie Policy
                </h4>
                <p className="text-gray-600">
                  We use cookies to enhance your shopping experience and provide
                  personalized service. You can manage cookie preferences
                  through your browser settings.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
