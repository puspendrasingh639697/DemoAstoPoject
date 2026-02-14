// src/components/Numerology/InfoTooltip.jsx
import React from "react";
import { Info } from "lucide-react";

export default function InfoTooltip({ text }) {
  return (
    <div className="group relative">
      <Info
        size={16}
        className="text-gray-400 hover:text-yellow-600 cursor-help"
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {text}
      </div>
    </div>
  );
}
