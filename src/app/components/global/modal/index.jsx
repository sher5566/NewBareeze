import React from "react";
import PropTypes from "prop-types";
import { TypographyAtom } from "../typography/Typography";

/**
 * A reusable Tailwind CSS Modal component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {JSX.Element} props.content - The content of the modal.
 * @param {boolean} props.open - Whether the modal is open. Defaults to true.
 * @param {function} props.onClose - The callback to call when the modal is closed.
 * @param {object} props.modalStyles - Additional styles for the modal.
 * @param {object} props.boxStyles - Additional styles for the main content box.
 * @returns {JSX.Element} The rendered Modal component.
 */
const ModalAtom = ({
  title,
  content,
  open = true,
  onClose,
  modalStyles = "",
  boxStyles = "",
}) => {
  if (!open) return null;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${modalStyles}`}
    >
      <div
        className={`bg-white w-11/12 max-w-md rounded-lg shadow-lg p-6 transform transition-all ${boxStyles}`}
      >
        <TypographyAtom
          text={title}
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        />

        <div className="mt-4">{content}</div>

        <button
          onClick={handleClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// PropTypes for type checking
ModalAtom.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  modalStyles: PropTypes.string,
  boxStyles: PropTypes.string,
};

export default ModalAtom;
