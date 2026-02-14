"use client";

import { useEffect } from "react";

export default function PoojaPackageDetailsModal({ matchedPackage, onClose }) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const poojaPackage = matchedPackage?.poojaPackages;
  console.log(poojaPackage, "poojadetails2222======");

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
          {poojaPackage ? (
            <>
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {poojaPackage.title}
                </h4>
                <p className="text-sm text-gray-600">{poojaPackage.subtitle}</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-yellow-500">
                  {formatPrice(poojaPackage.price)}
                </p>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                <p className="text-gray-700">
                  {poojaPackage.CustomDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">
                    Materials Included
                  </h5>
                  <p className="text-gray-700 capitalize">
                    {poojaPackage.materialIncluded}
                  </p>
                </div>
              </div>
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
