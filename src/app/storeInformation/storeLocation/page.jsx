"use client";

import DynamicIcon from "../../components/global/icons/index";

const StoreLocation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Visit Our Store
      </h2>

      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <DynamicIcon name="home" color="text-blue-600" size="text-2xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Main Branch
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600">
                <strong>Address:</strong>
                <br />
                Rabi Center, Murry Road
                <br />
                Rawalpindi, Pakistan
              </p>
              <p className="text-gray-600">
                <strong>Business Hours:</strong>
                <br />
                Monday - Saturday: 10:00 AM - 9:00 PM
                <br />
                Sunday: 11:00 AM - 7:00 PM
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong>
                <br />
                Phone:{" "}
                <a
                  href="tel:03033157000"
                  className="text-blue-600 hover:text-blue-800"
                >
                  0303 3157000
                </a>
                <br />
                WhatsApp:{" "}
                <a
                  href="https://wa.me/923033157000"
                  className="text-blue-600 hover:text-blue-800"
                >
                  0303 3157000
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreLocation;
