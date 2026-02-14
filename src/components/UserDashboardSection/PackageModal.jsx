"use client";

import { useEffect } from "react";

export default function PackageDetailsModal({ packageDetails, onClose }) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    // Prevent scrolling of the body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Format price to INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle click on the backdrop to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Package Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4 space-y-4">
          {packageDetails && packageDetails.poojaPackages ? (
            <>
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {packageDetails.poojaPackages.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {packageDetails.poojaPackages.subtitle}
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-yellow-400">
                  {formatPrice(packageDetails.poojaPackages.price)}
                </p>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                <p className="text-gray-700">
                  {packageDetails.poojaPackages.CustomDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">
                    Materials Included
                  </h5>
                  <p className="text-gray-700 capitalize">
                    {packageDetails.poojaPackages.materialIncluded}
                  </p>
                </div>
                {/* <div>
                  <h5 className="font-medium text-gray-900 mb-1">Status</h5>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      packageDetails.poojaPackages.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {packageDetails.poojaPackages.status}
                  </span>
                </div> */}
              </div>

              {/* <div>
                <h5 className="font-medium text-gray-900 mb-1">Created On</h5>
                <p className="text-gray-700">
                  {formatDate(packageDetails.poojaPackages.createdAt)}
                </p>
              </div> */}
            </>
          ) : (
            <p className="text-gray-700">No package details available.</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
