"use client";

import React, { useState, useEffect } from "react";
import { Newsletter } from "../../pages/Footer/Newsletter";
import { FooterSection } from "../../pages/Footer/FooterSection";
import { FooterBottom } from "../../pages/Footer/FooterBottom";
import { WhatsAppButton } from "../../pages/Footer/WhatsAppButton";
import { Helper } from "../../../utils/helpers/index";

/**
 * @typedef {Object} MobileMenuState
 * @property {boolean} information - State for information section visibility
 * @property {boolean} company - State for company section visibility
 * @property {boolean} help - State for help section visibility
 * @property {boolean} connect - State for connect section visibility
 */

/**
 * Footer component for the application's main layout.
 * Includes newsletter subscription, navigation sections, and social links.
 * Responsive design with collapsible sections on mobile devices.
 *
 * @component
 * @returns {JSX.Element} Complete footer with all sections
 *
 * @example
 * // Basic usage
 * <Footer />
 */
export default function Footer() {
  /**
   * State for newsletter email input
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [email, setEmail] = useState("");

  /**
   * State for mobile menu sections visibility
   * Default to true for all sections
   * @type {[MobileMenuState, React.Dispatch<React.SetStateAction<MobileMenuState>>]}
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState({
    information: true,
    company: true,
    help: true,
    connect: true,
  });

  /**
   * Effect to handle responsive behavior of footer sections
   * Opens all sections on desktop view (>= 768px)
   */
  useEffect(() => {
    /**
     * Updates mobile menu state based on window width
     * @function
     */
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // For desktop, ensure all sections are open
        setIsMobileMenuOpen({
          information: true,
          company: true,
          help: true,
          connect: true,
        });
      }
    };

    // Initial check on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Toggles visibility of footer sections on mobile
   * Only works on mobile viewport (<768px)
   *
   * @param {keyof MobileMenuState} section - Section identifier to toggle
   */
  const toggleSection = (section) => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen((current) =>
        Helper.global.toggleMobileMenu(section, current)
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <footer className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Newsletter Subscription Section */}
          <Newsletter email={email} setEmail={setEmail} />

          {/* Footer Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
            {/* Information Section */}
            <FooterSection
              title="INFORMATION"
              links={Helper.global.footerLinks.information}
              isOpen={isMobileMenuOpen.information}
              toggleSection={() => toggleSection("information")}
            />

            {/* Company Section */}
            <FooterSection
              title="COMPANY"
              links={Helper.global.footerLinks.company}
              isOpen={isMobileMenuOpen.company}
              toggleSection={() => toggleSection("company")}
            />

            {/* Help Section */}
            <FooterSection
              title="HELP"
              links={Helper.global.contactInfo}
              isOpen={isMobileMenuOpen.help}
              toggleSection={() => toggleSection("help")}
            />

            {/* Connect Section (Social Links) */}
            <FooterSection
              title="CONNECT"
              links={Helper.global.socialLinks}
              isOpen={isMobileMenuOpen.connect}
              toggleSection={() => toggleSection("connect")}
            />
          </div>

          {/* Footer Bottom Section (Copyright, etc.) */}
          <FooterBottom />
        </div>

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
       
      </footer>
    </div>
  );
}
