import React from "react";

export default function DivineNamingForm({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.divine?.dob || ""}
          onChange={(e) => handleInputChange("divine", "dob", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Place of Birth
        </label>
        <input
          type="text"
          value={formData.divine?.place || ""}
          onChange={(e) => handleInputChange("divine", "time", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Time of Birth
        </label>
        <input
          type="time"
          value={formData.divine?.time || ""}
          onChange={(e) => handleInputChange("divine", "time", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    </div>
  );
}
