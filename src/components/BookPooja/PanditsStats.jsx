import React from "react";
import Smile from "../../assets/flagsicon/Smile.png";
import Check from "../../assets/flagsicon/Check.png";
import Groups from "../../assets/flagsicon/Groups.png";
import bgImage from "../../assets/image/Rectangle7.png";

const ServiceStats = () => {
  const stats = [
    {
      icon: Check,
      value: "15,324+",
      label: "Total Booking",
    },
    {
      icon: Groups,
      value: "120 Pandits Available",
      label: "Pandits Available",
    },
    {
      icon: Smile,
      value: "92%",
      label: "Customer Satisfaction",
    },
  ];

  return (
    <div
      className="py-12"
      style={{
        backgroundImage: `url(${bgImage})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire div
        backgroundPosition: "center", // Center the background image
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <img
                  src={stat.icon}
                  alt={stat.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-white text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceStats;
