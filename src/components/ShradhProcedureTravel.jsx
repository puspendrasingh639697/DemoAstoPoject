import React, { useState } from "react";
import {
  ScrollText,
  Home,
  Handshake,
  CalendarDays,
  Car,
  Utensils,
  CheckCircle,
  MapPin,
  Clock,
} from "lucide-react";

const CustomCard = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

const ShradhProcedureTravel = () => {
  const [activeTab, setActiveTab] = useState("procedure");

  const shradhItems = [
    { text: "Pind Daan (offering rice balls to ancestors)", icon: "🕉️" },
    { text: "Tarpan (water rituals with sesame)", icon: "💧" },
    { text: "Brahmin Bhojan and Dakshina", icon: "🙏" },
    { text: "River rituals (Ganga, Phalgu)", icon: "🌊" },
    { text: "Gotra invocation and chanting of Pitru mantras", icon: "📿" },
    { text: "Personalized puja by experienced priests", icon: "🔥" },
  ];

  const travelItems = [
    {
      category: "Accommodation",
      icon: <CalendarDays className="w-5 h-5" />,
      items: [
        "AC & Non-AC stay options near temples in Gaya Ji and Varanasi",
        "Accommodation with prayer room and Ganga-view available",
      ],
    },
    {
      category: "Transportation",
      icon: <Car className="w-5 h-5" />,
      items: [
        "Airport/Railway pickup from Gaya, Patna, or Varanasi",
        "Local transport to ghats and temples",
      ],
    },
    {
      category: "Meals",
      icon: <Utensils className="w-5 h-5" />,
      items: [
        "All packages include Satvik Bhojan (Pure Veg Food) prepared by Brahmin chefs",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-full p-2 shadow-lg border">
          <button
            onClick={() => setActiveTab("procedure")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "procedure"
                ? "bg-orange-500 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            <ScrollText className="w-5 h-5 inline mr-2" />
            Shradh Procedure
          </button>
          <button
            onClick={() => setActiveTab("travel")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "travel"
                ? "bg-blue-500 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            <Home className="w-5 h-5 inline mr-2" />
            Travel & Stay
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative overflow-hidden">
        {/* Shradh Procedure Tab */}
        <div
          className={`transition-all duration-500 ${
            activeTab === "procedure"
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform translate-x-full absolute inset-0"
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-5xl font-light text-gray-800 mb-4">
              Sacred Rituals
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">
              Traditional procedures performed with devotion
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {shradhItems.map((item, index) => (
              <CustomCard
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">
                        Step {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                </div>
              </CustomCard>
            ))}
          </div>
        </div>

        {/* Travel & Accommodation Tab */}
        <div
          className={`transition-all duration-500 ${
            activeTab === "travel"
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform -translate-x-full absolute inset-0"
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-5xl font-light text-gray-800 mb-4">
              Complete Care
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">
              Comfortable journey and blessed accommodation
            </p>
          </div>

          <div className="space-y-8">
            {travelItems.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {section.category}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {section.items.map((item, itemIndex) => (
                    <CustomCard
                      key={itemIndex}
                      className="group flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-100"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-gray-700 flex-1 group-hover:text-gray-900 transition-colors duration-300">
                        {item}
                      </p>
                      <MapPin className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </CustomCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Timeline Indicator */}
      <div className="flex justify-center mt-12">
        <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg border">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            Complete spiritual journey • Trusted by thousands
          </span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShradhProcedureTravel;
