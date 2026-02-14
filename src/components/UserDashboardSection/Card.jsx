import React, { useState } from "react";
import PackageDetailsModal from "./PackageModal";

export default function BookingCard({
  id,
  status,
  poojaName,
  panditName,
  date,
  time,
  packages,
  packageDetails,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status badge styles
  const getStatusClass = () => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 ring-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 ring-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 ring-red-300";
      default:
        return "bg-gray-100 text-gray-700 ring-gray-300";
    }
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto rounded-xl border border-yellow-300 shadow-sm hover:shadow-md transition-shadow bg-white">
        {/* Header */}
        <div className="flex items-center justify-between bg-yellow-50 px-5 py-3 border-b">
          <div className="text-sm font-medium text-gray-600">
            Booking ID: <span className="text-gray-800">{id}</span>
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ring-1 ${getStatusClass()}`}
          >
            {status}
          </span>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-sm sm:text-base">
          {/* Pooja Name */}
          <div className="text-xl font-semibold text-gray-800">{poojaName}</div>

          {/* Pandit */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Pandit:</span>
            <span className="font-medium">{panditName}</span>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📅 Date:</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🕒 Time:</span>
              <span>{time}</span>
            </div>
          </div>

          {/* Packages */}
          <div className="flex items-start gap-2">
            <span className="text-gray-500 mt-0.5">📦</span>
            <div>
              <p className="text-gray-500">Packages:</p>
              <p className="mt-1 text-gray-800">{packages}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end bg-yellow-50 px-5 py-3 border-t">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PackageDetailsModal
          packageDetails={packageDetails}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
