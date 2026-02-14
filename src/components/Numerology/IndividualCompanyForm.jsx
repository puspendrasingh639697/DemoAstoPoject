import React from "react";
import FormField from "./FormField"; // Import the FormField component

export default function IndividualCompanyForm({ formData, handleInputChange }) {
  if (!formData?.individual || !formData?.company) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Individual</h3>
          <FormField
            label="Full Name"
            value={formData?.individual?.name}
            onChange={(value) => handleInputChange("individual", "name", value)}
            placeholder="Enter individual's name"
            tooltip="Enter complete name for analysis"
          />
          <FormField
            label="Date of Birth (Optional)"
            type="date"
            value={formData?.individual?.dob}
            onChange={(value) => handleInputChange("individual", "dob", value)}
            tooltip="Birth date for enhanced numerology analysis"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Company</h3>
          <FormField
            label="Company Name"
            value={formData.company.name}
            onChange={(value) => handleInputChange("company", "name", value)}
            placeholder="Enter company name"
            tooltip="Enter complete company name for vibration analysis"
          />
        </div>
      </div>
    </div>
  );
}
