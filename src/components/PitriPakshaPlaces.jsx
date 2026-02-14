import React, { useState, useEffect } from "react";
import { Sparkles, MapPin, Crown, Star, Circle } from "lucide-react";

const PitriPakshaPlaces = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedRows, setAnimatedRows] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Stagger row animations
    const timer = setTimeout(() => {
      setAnimatedRows([0, 1, 2, 3, 4]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const tableData = [
    {
      factor: "Primary Ritual",
      gaya: "Pind Daan (under Vishnupad Temple & Akshay Vat)",
      kashi: "Tarpan, Shradh, Asthi Visarjan in Ganga",
      //   icon: <Temple className="w-5 h-5" />,
      color: "emerald",
    },
    {
      factor: "Deity",
      gaya: "Lord Vishnu",
      kashi: "Lord Shiva, Ganga Devi",
      icon: <Crown className="w-5 h-5" />,
      color: "purple",
    },
    {
      factor: "Belief",
      gaya: "Guarantees Moksha to departed souls",
      kashi: "Assures both soul liberation and spiritual upliftment",
      icon: <Star className="w-5 h-5" />,
      color: "blue",
    },
    {
      factor: "Scriptural Backing",
      gaya: "Mentioned in Garuda, Vayu Purana",
      kashi: "Mentioned in Skanda, Shiva Purana",
      icon: <Circle className="w-5 h-5" />,
      color: "orange",
    },
    {
      factor: "Ritual Continuity",
      gaya: "Rama's example; 108 pind daan spots",
      kashi: "Eternal flame at ghats; city of death and rebirth",
      icon: <MapPin className="w-5 h-5" />,
      color: "rose",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: "from-emerald-50 to-green-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        accent: "bg-emerald-400",
      },
      purple: {
        bg: "from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-700",
        accent: "bg-purple-400",
      },
      blue: {
        bg: "from-blue-50 to-cyan-50",
        border: "border-blue-200",
        text: "text-blue-700",
        accent: "bg-blue-400",
      },
      orange: {
        bg: "from-orange-50 to-amber-50",
        border: "border-orange-200",
        text: "text-orange-700",
        accent: "bg-orange-400",
      },
      rose: {
        bg: "from-rose-50 to-pink-50",
        border: "border-rose-200",
        text: "text-rose-700",
        accent: "bg-rose-400",
      },
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <section className="relative max-w-7xl mx-auto bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles
            className="w-6 h-6 text-white animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>

        <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-pulse"></div>

        {/* Enhanced Header */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent blur-sm opacity-50"></div>
            <span className="relative flex items-center justify-center gap-4">
              <MapPin className="w-12 h-12 text-amber-600 animate-pulse" />
              Gaya Ji vs. Varanasi
              {/* <Temple className="w-12 h-12 text-orange-600 animate-pulse" /> */}
            </span>
          </h2>
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"></div>
            <div className="w-4 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 font-medium">
            Sacred Destinations for Pitri Paksha
          </p>
        </div>

        {/* Enhanced Table */}
        <div
          className={`overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              {/* Table Header */}
              <thead>
                <tr className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  {[
                    "Factor",
                    "Gaya Ji (Bihar)",
                    "Varanasi (Uttar Pradesh)",
                  ].map((title, i) => (
                    <th
                      key={i}
                      className="p-6 text-left font-bold text-lg tracking-wide relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        {i === 0 && <Star className="w-5 h-5" />}
                        {/* {i === 1 && <Temple className="w-5 h-5" />} */}
                        {i === 2 && <MapPin className="w-5 h-5" />}
                        {title}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {tableData.map((item, idx) => {
                  const colors = getColorClasses(item.color);
                  const isAnimated = animatedRows.includes(idx);
                  const isHovered = hoveredRow === idx;

                  return (
                    <tr
                      key={idx}
                      className={`group transition-all duration-500 border-b border-gray-100 hover:shadow-lg cursor-pointer ${
                        isAnimated
                          ? "translate-x-0 opacity-100"
                          : "translate-x-10 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${idx * 150}ms`,
                        backgroundColor: isHovered ? "#FEF3C7" : "transparent",
                      }}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* Factor Column */}
                      <td className="p-6 relative">
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 ${colors.accent} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center`}
                        ></div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} transform group-hover:scale-110 transition-transform duration-300`}
                          >
                            {item.icon}
                          </div>
                          <span className="font-bold text-gray-800 text-lg group-hover:text-gray-900 transition-colors duration-300">
                            {item.factor}
                          </span>
                        </div>
                      </td>

                      {/* Gaya Column */}
                      <td className="p-6 relative">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-300 transform group-hover:scale-[1.02]">
                          <div className="flex items-start gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                              {item.gaya}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Kashi Column */}
                      <td className="p-6 relative">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300 transform group-hover:scale-[1.02]">
                          <div className="flex items-start gap-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                              {item.kashi}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-8 gap-3">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default PitriPakshaPlaces;
