import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slices/global/confirmation";

let status = {
  id: "",
  isDeletedConfirmed: false,
};

// Store for callbacks since we can't store functions in Redux
const confirmationCallbacks = new Map();

export const registerConfirmation = (callback) => {
  const id = Math.random().toString(36).substr(2, 9);
  confirmationCallbacks.set(id, callback);
  return id;
};

export const openConfirmationDialog = (params) => (dispatch) => {
  dispatch({
    type: "OPEN_DIALOG",
    payload: params,
  });
};

/**
 * A reusable confirmation dialog component that displays a title, content, and two buttons.
 *
 * The component will call the `onConfirm` callback when the confirm button is clicked
 * and the `onClose` callback when the dialog is closed.
 *
 * @param {object} props - Component props.
 */
const ConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, title, message, confirmationId } = useSelector(
    (state) => state.confirmDialog
  );

  const handleConfirm = () => {
    if (confirmationId && confirmationCallbacks.has(confirmationId)) {
      confirmationCallbacks.get(confirmationId)(true);
      confirmationCallbacks.delete(confirmationId);
    }
    dispatch(closeDialog());
  };

  const handleCancel = () => {
    if (confirmationId && confirmationCallbacks.has(confirmationId)) {
      confirmationCallbacks.get(confirmationId)(false);
      confirmationCallbacks.delete(confirmationId);
    }
    dispatch(closeDialog());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end p-4 border-t space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
