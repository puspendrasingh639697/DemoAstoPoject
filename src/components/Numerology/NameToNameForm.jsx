// src/components/Numerology/NameToNameForm.jsx
import React from "react";
import FormField from "./FormField"; // Import the FormField component

export default function NameToNameForm({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Person 1</h3>
          <FormField
            label="Full Name"
            value={formData?.person1?.name}
            onChange={(value) => handleInputChange("person1", "name", value)}
            placeholder="Enter full name"
            tooltip="Enter complete name for name vibration analysis"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Person 2</h3>
          <FormField
            label="Full Name"
            value={formData?.person2?.name}
            onChange={(value) => handleInputChange("person2", "name", value)}
            placeholder="Enter full name"
            tooltip="Enter complete name for name vibration analysis"
          />
        </div>
      </div>
    </div>
  );
}
