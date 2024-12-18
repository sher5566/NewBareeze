import React, { useState } from "react";
import PropTypes from "prop-types";
import { Btn as BtnAtom } from "../buttons/Button";
import DynamicIcon from "../icons/Index";
import { InputField } from "../inputFields/InputField";
import { TypographyAtom } from "../typography/Typography";

/**
 * EnumManager component for managing and displaying a list of enum values.
 * Provides the ability to add, view, and delete values from the list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<string>} props.values - Initial list of enum values to display.
 * @param {function} props.onAddNewValue - Callback to handle the addition of a new enum value.
 * @param {function} props.onDeleteValue - Callback to handle the deletion of an enum value.
 * @param {string} [props.mainHeading="Enum Values"] - The heading text displayed at the top of the component.
 * @returns {JSX.Element} The rendered EnumManager component.
 */
const EnumManager = ({
  values = [],
  onAddNewValue,
  onDeleteValue,
  mainHeading = "Enum Values",
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleAddNew = () => {
    if (newValue.trim()) {
      onAddNewValue(newValue.trim());
      setNewValue("");
      setIsAdding(false);
    }
  };

  const handleDelete = (indexToDelete) => {
    onDeleteValue(indexToDelete);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <TypographyAtom
          text={mainHeading}
          variant="h6"
          sx={{ fontWeight: "bold" }}
        />
        {!isAdding && (
          <BtnAtom
            text="Add New"
            onClick={() => setIsAdding(true)}
            sx={{
              backgroundColor: "bg-blue-500",
              color: "white",
              ":hover": { backgroundColor: "bg-blue-600" },
            }}
          />
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-bold">Value</th>
              <th className="px-4 py-2 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr>
                <td className="px-4 py-2">
                  <InputField
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddNew()}
                    placeholder="Enter new value"
                    fullWidth
                  />
                </td>
                <td className="px-4 py-2 text-right flex justify-end space-x-2">
                  <BtnAtom
                    text="Save"
                    onClick={handleAddNew}
                    disabled={!newValue.trim()}
                    sx={{
                      backgroundColor: "bg-green-500",
                      color: "white",
                      ":hover": { backgroundColor: "bg-green-600" },
                    }}
                  />
                  <BtnAtom
                    text="Cancel"
                    onClick={() => {
                      setIsAdding(false);
                      setNewValue("");
                    }}
                    sx={{
                      backgroundColor: "bg-red-500",
                      color: "white",
                      ":hover": { backgroundColor: "bg-red-600" },
                    }}
                  />
                </td>
              </tr>
            )}
            {values.map((value, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 border-b last:border-none"
              >
                <td className="px-4 py-2">{value}</td>
                <td className="px-4 py-2 text-right">
                  <BtnAtom
                    text={<DynamicIcon iconName="Delete" />}
                    onClick={() => handleDelete(index)}
                    sx={{
                      backgroundColor: "bg-red-500",
                      color: "white",
                      ":hover": { backgroundColor: "bg-red-600" },
                      padding: "4px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {values.length === 0 && !isAdding && (
        <TypographyAtom
          text="No enum values added yet. Click 'Add New' to start."
          sx={{ textAlign: "center", py: 4, color: "grey.500" }}
        />
      )}
    </div>
  );
};

// Define PropTypes for the EnumManager component
EnumManager.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
  onAddNewValue: PropTypes.func.isRequired,
  onDeleteValue: PropTypes.func.isRequired,
  mainHeading: PropTypes.string,
};

export default EnumManager;
