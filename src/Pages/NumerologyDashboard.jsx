import { useState, useEffect, useContext } from "react";
import { Star, Calendar, Palette, Gem, Users, Shield, Sun } from "lucide-react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import HeroSection from "../components/NumerologyDashboard/HeroSection";
import NumerologyData from "../components/NumerologyDashboard/NumerologyData";
import CallTalkBanner from "../components/NumerologyDashboard/CallTalkBanner";
import { kundaliContext } from "../context/KundaliContext";
import { NumerologyContext } from "../context/NumerologyContext";

// Custom Components (these are good, no changes needed)
const CustomCard = ({ children, className = "", onClick }) => (
  <div
    className={`bg-white rounded-xl border shadow-lg transition-all duration-300 ${className} ${
      onClick ? "cursor-pointer" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </div>
);

const CustomCardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CustomCardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const CustomCardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CustomBadge = ({ children, variant = "default", className = "" }) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105";
  const variantClasses = {
    default: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

const CustomSeparator = ({ className = "" }) => (
  <div
    className={`h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent ${className}`}
  />
);

export default function NumerologyDashboard() {
  const { language } = useContext(kundaliContext);
  const { individualData } = useContext(NumerologyContext);
  // console.log("individualData==", individualData);
  const navigate = useNavigate();

  const location = useLocation();
  const [data, setData] = useState(individualData || null);
  const [numdata, setnumdata] = useState(null);
  if (!individualData) {
    return <Navigate to="/numerology-calculator" />;
  }
  useEffect(() => {
    console.log("individualData==", individualData);
    setnumdata(individualData);
    if (language === "hi") {
      individualData.description.Hindi["Lucky No."];
      setData(individualData.description.Hindi);
    } else {
      setData(individualData.description.English);

      // console.log(individualData.description.English);
    }
  }, [individualData, language]);

  // const [language, setLanguage] = useState("English");
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedItems, setAnimatedItems] = useState(new Set());

  useEffect(() => {
    setIsLoaded(true);
    // Stagger animation for items
    const timer = setTimeout(() => {
      const newAnimatedItems = new Set();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          newAnimatedItems.add(i);
          setAnimatedItems(new Set(newAnimatedItems));
        }, i * 100);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset animations when language changes
    setAnimatedItems(new Set());
    const timer = setTimeout(() => {
      const newAnimatedItems = new Set();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          newAnimatedItems.add(i);
          setAnimatedItems(new Set(newAnimatedItems));
        }, i * 50);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [language]);

  if (numdata && data) {
    return (
      <div className=" mx-auto ">
        {<HeroSection />}
        <div className="relative z-10 container mx-auto max-w-5xl px-5">
          <div className="space-y-10 mx-auto">
            {/* Key Information Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
              {/* Radical Number Card */}
              <div className="neon-card">
                <div className="content">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Radical Number
                  </h3>
                  <p className="text-5xl font-extrabold text-yellow-400">
                    {numdata.radicalNumber}
                  </p>
                  <p className="text-white mt-2 text-sm">
                    Your core essence and inner self.
                  </p>
                </div>
              </div>

              {/* Lucky Number Card */}
              <div className="neon-card">
                <div className="content">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Lucky Number
                  </h3>
                  <p className="text-5xl font-extrabold text-yellow-400">
                    {numdata.luckyNumber}
                  </p>
                  <p className="text-white mt-2 text-sm">
                    Numbers that bring you fortune and opportunities.
                  </p>
                </div>
              </div>

              {/* Name Number Card */}
              <div className="neon-card">
                <div className="content">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Name Number
                  </h3>
                  <p className="text-5xl font-extrabold text-yellow-400">
                    {numdata.nameNumber}
                  </p>
                  <p className="text-white mt-2 text-sm">
                    The vibration of your name and its influence.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className={`card-animate transition-all duration-500 ${
                  animatedItems.has(1)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <CustomCard className="card-hover  min-h-[200px] bg-white border-yellow-200 border-2 hover:border-yellow-300">
                  <CustomCardHeader className="pb-3">
                    <CustomCardTitle className="flex items-center gap-3 text-yellow-800">
                      <div className="p-2 bg-green-200 rounded-lg">
                        <Users className="w-6 h-6 text-green-700" />
                      </div>
                      {language === "en" ? "Friendly Numbers" : "मित्र संख्या"}
                    </CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="flex flex-wrap gap-2">
                      {data["Friendly No."].split(", ").map((num, index) => (
                        <CustomBadge
                          key={index}
                          variant="success"
                          className="text-base font-bold px-4 py-2 hover:scale-110 cursor-pointer hover:shadow-lg"
                        >
                          {num}
                        </CustomBadge>
                      ))}
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </div>
              <div
                className={`card-animate transition-all duration-500 ${
                  animatedItems.has(2)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <CustomCard className="card-hover  min-h-[200px] bg-white border-yellow-200 border-2 hover:border-yellow-300">
                  <CustomCardHeader className="pb-3">
                    <CustomCardTitle className="flex items-center gap-3 text-yellow-800">
                      <div className="p-2 bg-red-200 rounded-lg">
                        <Shield className="w-6 h-6 text-red-700" />
                      </div>
                      {language === "en" ? "Enemy Numbers" : "शत्रु संख्या"}
                    </CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="flex flex-wrap gap-2">
                      {data["Enemy No."].split(",").map((num, index) => (
                        <CustomBadge
                          key={index}
                          variant="danger"
                          className="text-base font-bold px-4 py-2 hover:scale-110 cursor-pointer hover:shadow-lg"
                        >
                          {num}
                        </CustomBadge>
                      ))}
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </div>
              <div
                className={`card-animate transition-all duration-500 ${
                  animatedItems.has(3)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <CustomCard className="card-hover  min-h-[200px] bg-white border-yellow-200 border-2 hover:border-yellow-300">
                  <CustomCardHeader className="pb-3">
                    <CustomCardTitle className="flex items-center gap-3 text-yellow-800">
                      <div className="p-2 bg-orange-200 rounded-lg">
                        <Sun className="w-6 h-6 text-orange-700" />
                      </div>
                      {language === "en" ? "Favorable Days" : "अनुकूल दिन"}
                    </CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="text-base text-yellow-700 font-semibold bg-gradient-to-r from-yellow-200 to-amber-200 p-4 rounded-xl text-center">
                      {data["Favourable Days"]}
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </div>
            </div>
            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`card-animate transition-all duration-500 ${
                  animatedItems.has(4)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <CustomCard className="card-hover bg-white border-yellow-200 border-2 hover:border-yellow-300">
                  <CustomCardHeader>
                    <CustomCardTitle className="flex items-center gap-3 text-yellow-800 text-xl">
                      <div className="p-3 bg-blue-200 rounded-lg">
                        <Calendar className="w-7 h-7 text-blue-700" />
                      </div>
                      {language === "en"
                        ? "Years & Timeline"
                        : "वर्ष और समयरेखा"}
                    </CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-green-700 mb-3 text-lg">
                        {language === "en" ? "Favourable Years" : "अनुकूल वर्ष"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {data["Favourable Years"]
                          .split(", ")
                          .map((year, index) => (
                            <CustomBadge
                              key={index}
                              variant="success"
                              className="text-base font-bold px-4 py-2 hover:scale-105 cursor-pointer hover:shadow-md"
                            >
                              {year}
                            </CustomBadge>
                          ))}
                      </div>
                    </div>
                    <CustomSeparator className="my-4" />
                    <div>
                      <h4 className="font-bold text-red-700 mb-3 text-lg">
                        {language === "en"
                          ? "Unfavourable Years"
                          : "प्रतिकूल वर्ष"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {data["Unfavourable Years"]
                          .split(", ")
                          .map((year, index) => (
                            <CustomBadge
                              key={index}
                              variant="danger"
                              className="text-base font-bold px-4 py-2 hover:scale-105 cursor-pointer hover:shadow-md"
                            >
                              {year}
                            </CustomBadge>
                          ))}
                      </div>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </div>
              <div
                className={`card-animate transition-all duration-500 ${
                  animatedItems.has(5)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <CustomCard className="card-hover bg-white border-2 hover:border-yellow-300">
                  <CustomCardHeader>
                    <CustomCardTitle className="flex items-center gap-3 text-yellow-800 text-xl">
                      <div className="p-3 bg-purple-200 rounded-lg">
                        <Palette className="w-7 h-7 text-purple-700" />
                      </div>
                      {language === "en" ? "Colors & Stones" : "रंग और रत्न"}
                    </CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-green-700 mb-3 text-lg">
                        {language === "en" ? "Favourable" : "अनुकूल"}
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <span className="font-semibold text-green-800">
                            {language === "en" ? "Colors:" : "रंग:"}{" "}
                          </span>
                          <span className="text-green-700">
                            {data["Favourable Colour"]}
                          </span>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <span className="font-semibold text-green-800">
                            {language === "en" ? "Stones:" : "रत्न:"}{" "}
                          </span>
                          <span className="text-green-700">
                            {data["Favourable Stone"]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CustomSeparator className="my-4" />
                    <div>
                      <h4 className="font-bold text-red-700 mb-3 text-lg">
                        {language === "en" ? "Unfavourable" : "प्रतिकूल"}
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <span className="font-semibold text-red-800">
                            {language === "en" ? "Colors:" : "रंग:"}{" "}
                          </span>
                          <span className="text-red-700">
                            {data["Unfavourable Colour"]}
                          </span>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <span className="font-semibold text-red-800">
                            {language === "en" ? "Stones:" : "रत्न:"}{" "}
                          </span>
                          <span className="text-red-700">
                            {data["Unfavourable Stone"]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </div>
            </div>
            {<CallTalkBanner />}
            {/* Characteristics */}
            <div
              className={`card-animate transition-all duration-500 ${
                animatedItems.has(6)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <CustomCard className="card-hover mx-auto bg-white border-yellow-200 border-2 hover:border-yellow-300">
                <CustomCardHeader>
                  <CustomCardTitle className="flex items-center gap-3 text-yellow-800 text-2xl">
                    <div className="p-3 bg-pink-200 rounded-lg">
                      <Gem className="w-8 h-8 text-pink-700" />
                    </div>
                    {language === "en"
                      ? "Personality Characteristics"
                      : "व्यक्तित्व की विशेषताएं"}
                  </CustomCardTitle>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="grid gap-2 ">
                    {data.Characteristics.map((characteristic, index) => (
                      <CustomCard
                        key={index}
                        className="characteristic-card p-2 bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-110 hover:bg-yellow-100 hover:border-yellow-400"
                      >
                        <div className="flex items-start gap-2">
                          <div className="characteristic-number w-9 h-9 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 mt-1 transition-all duration-300 hover:rotate-360 shadow-lg">
                            {index + 1}
                          </div>
                          <p
                            className={`text-black leading-relaxed text-base font-medium ${
                              language === "Hindi" ? "" : ""
                            }`}
                          >
                            {characteristic}
                          </p>
                        </div>
                      </CustomCard>
                    ))}
                  </div>
                </CustomCardContent>
              </CustomCard>
            </div>
          </div>
        </div>
        {<NumerologyData />}
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
