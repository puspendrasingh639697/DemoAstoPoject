import React, { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Basics", path: "/astrology-details" },
    { label: "Kundali", path: "/astrology-details/kundali" },
    { label: "KP", path: "/astrology-details/kp" },
    { label: "Ashtakvarga", path: "/astrology-details/ashtakvarga" },
    { label: "Charts", path: "/astrology-details/charts" },
    { label: "Dasha", path: "/astrology-details/dasha" },
    { label: "Free Report", path: "/astrology-details/free-report" },
  ];

  const [activeComponent, setActiveComponent] = useState(() => {
    const matchingTab = tabs.find((tab) => tab.path === location.pathname);
    return matchingTab ? matchingTab.label : "Basics";
  });

  const handleTabClick = (label, path) => {
    setActiveComponent(label);
    navigate(path);
  };

  return (
    <div className="w-full px-4 md:px-8 bg-white py-6">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-4">
        Kundali Report
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 p-2 rounded-lg border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label, tab.path)}
            className={`text-sm md:text-base px-5 py-1.5 rounded-full transition-all duration-200 ${
              activeComponent === tab.label
                ? "bg-yellow-400 text-black shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Outlet */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Topbar;
