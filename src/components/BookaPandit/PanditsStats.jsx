import React from "react";
import Smile from "../../assets/flagsicon/Smile.png";
import Check from "../../assets/flagsicon/Check.png";
import Groups from "../../assets/flagsicon/Groups.png";
import CountUp from "../CountUp"; // Adjust path if needed

const StatisticsSection = () => {
  const stats = [
    {
      icon: Check,
      value: 1532,
      suffix: "+",
      label: "Total Booking",
    },
    {
      icon: Groups,
      value: 120,
      suffix: "+",
      label: "Pandits Available",
    },
    {
      icon: Smile,
      value: 92,
      suffix: "%",
      label: "Customer Satisfaction",
    },
  ];

  return (
    <div className="py-8 bg-gradient-to-b from-[#FBFF00] to-[#FFA600]">
      <div className="max-w-screen-lg flex flex-col sm:flex-row md:flex mx-auto justify-between gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-4xl font-bold text-white">
              {/* Reserve space using inline-block and min width */}
              <span className="inline-block min-w-[5ch]">
                <CountUp
                  from={0}
                  to={stat.value}
                  separator=","
                  duration={1.5}
                />
              </span>
              {stat.suffix}
            </div>
            <div className="mt-2 text-lg text-white">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
