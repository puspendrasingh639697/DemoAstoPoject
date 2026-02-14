import React, { useState } from "react";
import PoojaPackageDetailsModal from "./PoojaPackageDetailsModal";

export default function PoojaCard({
  poojaName,
  dateOfPooja,
  price,
  templeName,
  status,
  bookingId,
  matchedPackage,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClass = () => {
    switch (status) {
      case "confirmed":
      case "booked":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl border border-yellow-400 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all mx-auto">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-yellow-50 border-b p-4 gap-2">
        <div className="font-medium text-sm sm:text-base">
          Booking ID: <span className="text-gray-500">{bookingId}</span>
        </div>
        <div
          className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass()}`}
        >
          {status}
        </div>
      </div>

      {/* Card Body */}
      <div className="space-y-4 p-4 text-sm sm:text-base">
        <div className="text-lg font-semibold">{poojaName}</div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500">📅 Date:</span>
          <span>{dateOfPooja}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500">💰 Price:</span>
          <span>₹{price}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500">🛕 Temple:</span>
          <span>{templeName}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-yellow-50 px-4 py-3 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#FFD700] text-white text-sm rounded-md hover:bg-yellow-400 transition-colors"
        >
          View Details
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PoojaPackageDetailsModal
          matchedPackage={matchedPackage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
