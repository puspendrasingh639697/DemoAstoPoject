// src/components/Numerology/CategoryTabs.jsx
import React from "react";
import { User, Building, Star } from "lucide-react";

export default function CategoryTabs({
  activeCategory,
  setActiveCategory,
  setError,
}) {
  return (
    <div className="flex justify-center px-4 mb-8 mt-10">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-3xl bg-white rounded-xl p-4 shadow-lg">
        {/* Personal Numerology Tab */}
        <button
          onClick={() => {
            setActiveCategory("personal");
            setError(null);
          }}
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 py-3 border border-yellow-400 rounded-lg font-medium transition-all w-full sm:w-auto ${
            activeCategory === "personal"
              ? "bg-yellow-400 text-gray-900 shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <User size={20} />
          <span className="text-sm sm:text-base">Personal Numerology</span>
        </button>

        {/* Professional Numerology Tab */}
        <button
          onClick={() => {
            setActiveCategory("professional");
            setError(null);
          }}
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 py-3 border border-yellow-400 rounded-lg font-medium transition-all w-full sm:w-auto ${
            activeCategory === "professional"
              ? "bg-yellow-400 text-gray-900 shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Building size={20} />
          <span className="text-sm sm:text-base">Professional Numerology</span>
        </button>

        {/* Divine Naming Tab */}
        <button
          onClick={() => {
            setActiveCategory("divine-naming");
            setError(null);
          }}
          className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 py-3 border border-yellow-400 rounded-lg font-medium transition-all w-full sm:w-auto ${
            activeCategory === "divine-naming"
              ? "bg-yellow-400 text-gray-900 shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Star size={20} />
          <span className="text-sm sm:text-base">Divine Naming</span>
        </button>
      </div>
    </div>
  );
}
