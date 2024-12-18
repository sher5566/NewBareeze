"use client";

import React from "react";
import Link from "next/link";
import { TypographyAtom } from "../../global/typography/Typography";
import DynamicIcon from "../../global/icons/index";

/**
 * @typedef {Object} FooterLink
 * @property {string} [href] - Internal link URL
 * @property {string} [url] - External link URL
 * @property {string} [text] - Link text content
 * @property {string} [icon] - Icon name for the link
 * @property {string} [platform] - Social media platform name
 */

/**
 * @typedef {Object} FooterSectionProps
 * @property {string} title - Section title
 * @property {FooterLink[]} links - Array of links to display in the section
 * @property {boolean} isOpen - Whether the section is expanded (for mobile)
 * @property {(section: string) => void} toggleSection - Function to toggle section visibility
 */

/**
 * FooterSection component displays a collapsible section of footer links.
 * Handles both regular links and social media links with icons.
 * Responsive design with collapsible behavior on mobile.
 *
 * @component
 * @param {FooterSectionProps} props - Component properties
 * @returns {JSX.Element} Footer section with title and links
 *
 * @example
 * const links = [
 *   { text: "About Us", href: "/about" },
 *   { platform: "facebook", url: "https://facebook.com" }
 * ];
 *
 * <FooterSection
 *   title="COMPANY"
 *   links={links}
 *   isOpen={true}
 *   toggleSection={() => {}}
 * />
 */
export const FooterSection = ({ title, links, isOpen, toggleSection }) => {
  return (
    <div className="border-b md:border-b-0 pb-2 md:pb-0">
      {/* Section Header with Toggle Button */}
      <button
        onClick={() => toggleSection(title.toLowerCase())}
        className="flex justify-between items-center w-full md:cursor-default md:pointer-events-none"
      >
        {/* Section Title */}
        <TypographyAtom
          text={title}
          type="heading"
          variant="h5"
          additionalClasses="text-sm font-medium mb-2 md:mb-4"
        />
        {/* Toggle Icon (mobile only) */}
        <DynamicIcon
          name={isOpen ? "chevronUp" : "chevronDown"}
          color="text-gray-600"
          size="text-l"
          additionalClasses="md:hidden"
        />
      </button>

      {/* Links Container - Collapsible on mobile */}
      <div className={`${isOpen ? "block" : "hidden"} md:block space-y-2`}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href || link.url || "#"}
            className="block text-sm text-gray-600 hover:text-gray-900 py-1 md:py-0"
            {...(link.url && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {/* Link with Custom Icon */}
            {link.icon && (
              <span className="flex items-center space-x-2">
                <DynamicIcon
                  name={link.icon}
                  color="text-gray-600"
                  size="text-l"
                />
                <span>{link.text}</span>
              </span>
            )}

            {/* Social Media Link with Platform Icon */}
            {!link.icon && link.platform && (
              <span className="flex items-center space-x-2">
                <DynamicIcon
                  name={link.platform}
                  color="text-gray-600"
                  size="text-l"
                />
                <TypographyAtom
                  text={
                    link.platform.charAt(0).toUpperCase() +
                    link.platform.slice(1)
                  }
                  additionalClasses="text-sm"
                  color="text-gray-600"
                  type="paragraph"
                  variant="p"
                />
              </span>
            )}

            {/* Regular Text Link */}
            {!link.icon && !link.platform && link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
