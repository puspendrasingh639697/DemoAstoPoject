import React from "react";
import CountUp from "../CountUp";
import poojaicon from "../../assets/image/poojaicon.png";
import minuteicon from "../../assets/image/counter.png";
import usericon from "../../assets/image/usericon.png";
import bgImage from "../../assets/image/astrostats.png";

const StatsCounter = () => {
  const stats = [
    {
      icon: poojaicon,
      value: 22758,
      suffix: "+",
      label: "Total Pooja",
    },
    {
      icon: minuteicon,
      value: 711,
      suffix: " Million Minutes",
      label: "Total Minutes of Live Pooja",
    },
    {
      icon: usericon,
      value: 46,
      suffix: " Million",
      label: "Total Customers",
    },
  ];

  return (
    <div
      className="py-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-12">
        <div className="max-w-screen-lg flex flex-col sm:flex-row mx-auto justify-between gap-8 text-center py-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 text-white mb-2">
                <img
                  src={stat.icon}
                  alt={stat.label}
                  className="h-14 object-cover"
                />
              </div>

              <h3 className="text-3xl font-semibold text-white mb-2 font-mono">
                {/* Wrap CountUp + suffix together in fixed-width container */}
                <span className="inline-block min-w-[10ch] text-white">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    duration={1.8}
                    className="inline"
                  />
                  {stat.suffix}
                </span>
              </h3>

              <p className="text-xl text-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
