import React from "react";
import Smile from "../../assets/flagsicon/Smile.png";
import Check from "../../assets/flagsicon/Check.png";
import Groups from "../../assets/flagsicon/Groups.png";
import VastuStatsLft from "../../assets/flagsicon/VastuStatsLft.png";
import VastuStatsRght from "../../assets/flagsicon/VastuStatsRght.png";

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
    <div className="relative bg-gradient-to-b from-[#FBFF00] to-[#FFA600] p-16">
      <div className="flex flex-col md:flex-row text-center justify-between gap-20 md:gap-0">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-30 h-16 mb-4">
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-5xl font-bold text-white">{stat.value}</div>
            <div className="text-white text-2xl">{stat.label}</div>
          </div>
        ))}
      </div>
      <img
        className="absolute top-3 right-5"
        src={VastuStatsLft}
        alt="LeftIcon"
      />
      <img
        className="absolute top-3 left-5"
        src={VastuStatsRght}
        alt="RightIcon"
      />
    </div>
  );
};

export default ServiceStats;
