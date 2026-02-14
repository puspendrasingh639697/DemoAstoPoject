import React from "react";
import FormField from "./FormField";

export default function MaleFemaleForm({ formData, handleInputChange }) {
  if (!formData?.male || !formData?.female) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Male</h3>
          <FormField
            label="Full Name"
            value={formData.male.name}
            onChange={(value) => handleInputChange("male", "name", value)}
            placeholder="Enter full name"
            tooltip="Enter complete name"
          />
          <FormField
            label="Date of Birth"
            type="date"
            value={formData.male.dob}
            onChange={(value) => handleInputChange("male", "dob", value)}
            tooltip="Enter male partner's birth date"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Female</h3>
          <FormField
            label="Full Name"
            value={formData.female.name}
            onChange={(value) => handleInputChange("female", "name", value)}
            placeholder="Enter full name"
            tooltip="Enter complete name"
          />
          <FormField
            label="Date of Birth"
            type="date"
            value={formData.female.dob}
            onChange={(value) => handleInputChange("female", "dob", value)}
            tooltip="Enter female partner's birth date"
          />
        </div>
      </div>
    </div>
  );
}
