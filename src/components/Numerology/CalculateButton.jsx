import React from "react";

export default function CalculateButton({ loading, onClick }) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className={`w-60 h-16 rounded-full flex items-center justify-center gap-3 transition-all duration-[450ms] ease-in-out 
          ${
            loading
              ? "bg-green-400 cursor-not-allowed text-white opacity-60"
              : "bg-yellow-400 text-black hover:bg-gradient-to-t from-[#d43a3a] to-[#dcae19] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-4px_0_rgba(0,0,0,0.2),0_0_0_4px_rgba(255,255,255,0.2),0_0_180px_0_#9917FF] hover:-translate-y-0.5"
          }
        `}
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          className={`transition-all duration-700 ease-in-out ${
            loading
              ? "fill-white animate-spin"
              : "fill-[#AAAAAA] group-hover:fill-white group-hover:scale-110"
          }`}
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
        </svg>
        <span
          className={`font-semibold text-base ${
            loading ? "text-white" : "group-hover:text-white"
          }`}
        >
          {loading ? "Calculating..." : "Generate Numerology"}
        </span>
      </button>
    </div>
  );
}
