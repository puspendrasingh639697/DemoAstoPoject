import React from "react";

const TabButton = ({ id, icon: Icon, children, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-yellow-400 text-gray-900 shadow-md"
        : "bg-white text-gray-600 hover:bg-yellow-50 hover:text-gray-900"
    }`}
  >
    <Icon size={18} />
    <span className="font-medium">{children}</span>
  </button>
);

export default function SubTabs({
  currentTabs,
  activeTab,
  setActiveTab,
  setError,
}) {
  return (
    <div className="flex flex-wrap bg-yellow-200 shadow-xl p-3 justify-center gap-4 mb-8">
      {currentTabs.map((tab) => (
        <TabButton
          key={tab.id}
          id={tab.id}
          icon={tab.icon}
          isActive={activeTab === tab.id}
          onClick={(id) => {
            setActiveTab(id);
            setError(null); // Clear errors on tab change
          }}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
}
