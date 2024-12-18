import PropTypes from "prop-types";
import React from "react";

/**
 * A reusable typography component for headings and paragraphs.
 *
 * This component uses standard HTML tags styled with Tailwind CSS
 * and supports various options for customization, including text type,
 * alignment, color, and additional styling.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display (required).
 * @param {string} [props.type = "heading"] - The type of text ("heading" or "paragraph") (default: "heading").
 * @param {string} [props.variant = "h6"] - The variant of the typography (default: "h6").
 * @param {string} [props.align = "inherit"] - The text alignment (default: "inherit").
 * @param {string} [props.color = "text-gray-800"] - The Tailwind color class for the text (default: "text-gray-800").
 * @param {string} [props.additionalClasses = ""] - Additional Tailwind CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered typography component.
 */
export const TypographyAtom = ({
  text,
  type = "heading",
  variant = type === "heading" ? "h6" : "body1",
  align = "inherit",
  color = "text-gray-800",
  additionalClasses = "",
  ...rest
}) => {
  // Map variants to corresponding HTML tags
  const Tag =
    {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      subtitle1: "h6",
      subtitle2: "h6",
      body1: "p",
      body2: "p",
      caption: "span",
      overline: "span",
      button: "span",
    }[variant] || "p";

  // Alignment classes
  const alignmentClasses =
    {
      inherit: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    }[align] || "";

  return (
    <Tag
      className={`${
        type === "heading" ? "font-bold" : "font-normal"
      } ${alignmentClasses} ${color} ${additionalClasses}`}
      {...rest}
    >
      {text}
    </Tag>
  );
};

TypographyAtom.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["heading", "paragraph"]),
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "overline",
    "button",
  ]),
  align: PropTypes.oneOf(["inherit", "left", "center", "right", "justify"]),
  color: PropTypes.string, // Tailwind CSS color class
  additionalClasses: PropTypes.string, // Custom Tailwind classes
};

export default TypographyAtom;
