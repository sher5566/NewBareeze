"use client";

import React from "react";
import Image from "next/image";
import { TypographyAtom } from "../../global/typography/Typography";
import { InputField } from "../../global/inputs/Inputfield";
import { Btn } from "../../global/buttons/Button";
import { Helper } from "../../../utils/helpers/index";

/**
 * @typedef {Object} NewsletterProps
 * @property {string} email - Current value of the email input
 * @property {(email: string) => void} setEmail - Function to update the email state
 */

/**
 * Newsletter subscription component for the footer.
 * Displays company logo, subscription form, and handles email submissions.
 *
 * @component
 * @param {NewsletterProps} props - Component properties
 * @returns {JSX.Element} Newsletter subscription section
 *
 * @example
 * const [email, setEmail] = useState("");
 *
 * <Newsletter
 *   email={email}
 *   setEmail={setEmail}
 * />
 */
export const Newsletter = ({ email, setEmail }) => {
  /**
   * Handles the newsletter form submission.
   * Prevents default form behavior, submits email through helper function,
   * and clears the input on successful submission.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Helper.global.handleNewsletterSubmit(email);
    if (result.success) {
      setEmail("");
    }
  };

  return (
    <div className="text-center mb-8 md:mb-16">
      {/* Company Logo */}
      <Image
        src="/images/bareeze-logo-transparent.svg"
        alt="New Bareeze"
        width={200}
        height={60}
        className="mx-auto mb-4 md:mb-6 w-32 h-16 md:w-auto"
      />

      {/* Newsletter Heading */}
      <TypographyAtom
        text="Signup for our newsletter"
        type="paragraph"
        variant="body1"
        additionalClasses="mb-4 md:mb-6 text-gray-700 text-lg md:text-2xl font-bolder"
      />

      {/* Subscription Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row max-w-md mx-auto gap-2 md:gap-0"
      >
        {/* Email Input Field */}
        <InputField
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          additionalClasses="rounded-md md:rounded-r-none w-full border border-gray-400"
        />

        {/* Subscribe Button */}
        <Btn
          type="submit"
          text="Subscribe"
          customStyles="bg-gray-900 text-white px-6 py-2 rounded-md md:rounded-l-none hover:bg-gray-800"
        />
      </form>
    </div>
  );
};
