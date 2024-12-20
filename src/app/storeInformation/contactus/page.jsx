"use client";

import TypographyAtom from "../../components/global/typography/Typography";
import DynamicIcon from "../../components/global/icons/index";
import { InputField } from "../../components/global/inputs/Inputfield";
import { useState } from "react";

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setFormStatus("success");
    // Reset form
    e.target.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Contact Us
      </h2>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <DynamicIcon name="phone" color="text-blue-600" size="text-2xl" />
            <div>
              <TypographyAtom
                additionalClasses="text-xl font-semibold text-gray-800 mb-2"
                text=" Phone & WhatsApp"
                type="h3"
              />

              <p className="text-gray-600">
                Call or message us at:
                <br />
                <a
                  href="tel:03033157000"
                  className="text-blue-600 hover:text-blue-800"
                >
                  0303 3157000
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <DynamicIcon name="map-pin" color="text-blue-600" size="text-2xl" />
            <div>
              <TypographyAtom
                additionalClasses="text-xl font-semibold text-gray-800 mb-2"
                text="Visit Us"
                type="h3"
              />

              <p className="text-gray-600">
                Rabi Center, Murry Road
                <br />
                Rawalpindi, Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-3 mb-6">
          <DynamicIcon name="mail" color="text-blue-600" size="text-2xl" />
          <TypographyAtom
            additionalClasses="text-xl font-semibold text-gray-800"
            text="Send us a Message"
            type="h3"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <InputField
                type="text"
                id="name"
                required
                additionalClasses="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>

        {formStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}
      </div>

      {/* Social Media */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Follow Us
        </h3>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-blue-800 transition-colors">
            <DynamicIcon
              name="facebook"
              color="text-blue-600"
              size="text-3xl"
            />
          </a>
          <a href="#" className="hover:text-blue-800 transition-colors">
            <DynamicIcon
              name="instagram"
              color="text-blue-600"
              size="text-3xl"
            />
          </a>
          <a href="#" className="hover:text-blue-800 transition-colors">
            <DynamicIcon name="twitter" color="text-blue-600" size="text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
