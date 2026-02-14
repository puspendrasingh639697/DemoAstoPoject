import React from "react";
import FormField from "./FormField";

export default function PersonToPersonForm({ formData, handleInputChange }) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto ">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Person 1</h3>
          <FormField
            label="Name"
            type="text"
            value={formData.person1.name}
            onChange={(value) => handleInputChange("person1", "name", value)}
          />
          <FormField
            label="Date of Birth"
            type="date"
            value={formData.person1.dob}
            onChange={(value) => handleInputChange("person1", "dob", value)}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Person 2</h3>
          <FormField
            label="Name"
            type="text"
            value={formData.person2.name}
            onChange={(value) => handleInputChange("person2", "name", value)}
          />
          <FormField
            label="Date of Birth"
            type="date"
            value={formData.person2.dob}
            onChange={(value) => handleInputChange("person2", "dob", value)}
          />
        </div>
      </div>
    </div>
  );
}
