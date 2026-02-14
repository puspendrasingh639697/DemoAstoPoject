import React from "react";
import FormField from "./FormField";

export default function IndividualAnalysisForm({
  formData,
  handleInputChange,
}) {
  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Individual Numerology Analysis
        </h3>

        <FormField
          label="Full Name"
          type="text"
          value={formData.individual.name}
          onChange={(value) => handleInputChange("individual", "name", value)}
          placeholder="Enter your full name"
        />
        <FormField
          label="Date of Birth"
          type="date"
          value={formData.individual.dob}
          onChange={(value) => handleInputChange("individual", "dob", value)}
        />
      </div>
    </div>
  );
}
