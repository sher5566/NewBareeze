"use client";

import React from "react";
import { Btn } from "../../global/buttons/Button";
import DynamicIcon from "../../global/icons/index";

/**
 * @component WhatsAppButton
 * @description A fixed-position WhatsApp contact button that appears in the bottom-right corner
 * of the viewport. Opens WhatsApp chat in a new tab when clicked.
 *
 * @returns {JSX.Element} A circular button with WhatsApp icon
 */
export const WhatsAppButton = () => (
  <Btn
    onClick={() => window.open("https://wa.me/923033157000", "_blank")}
    customStyles="fixed right-4 bottom-4 md:right-5 md:bottom-5 bg-[#25D366]  rounded-full shadow-lg z-50 hover:bg-[#20bd5a] transition-colors duration-300"
    text={
      <DynamicIcon
        name="whatsapp"
        size="text-5xl"
        color="white"
        additionalClasses="text-white p-1"
      />
    }
  />
);
