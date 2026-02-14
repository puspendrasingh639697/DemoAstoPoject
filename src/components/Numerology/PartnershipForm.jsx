// src/components/Numerology/PartnershipForm.jsx
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import FormField from "./FormField"; // Import the FormField component

export default function PartnershipForm({
  partners,
  handleAddPartner,
  handleRemovePartner,
  handlePartnerChange,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Partners Information
        </h3>
        <button
          onClick={handleAddPartner}
          disabled={partners.length >= 10}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Add Partner
        </button>
      </div>

      <div className="space-y-4">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-end gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <FormField
                label={`Partner ${index + 1} Name`}
                value={partner.name}
                onChange={(value) => handlePartnerChange(index, "name", value)}
                placeholder="Enter partner name"
              />
            </div>
            <div className="flex-1">
              <FormField
                label="Date of Birth (Optional)"
                type="date"
                value={partner.dob}
                onChange={(value) => handlePartnerChange(index, "dob", value)}
              />
            </div>
            {partners.length > 1 && (
              <button
                onClick={() => handleRemovePartner(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
