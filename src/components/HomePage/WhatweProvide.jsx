import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Clock10,
  Star,
  Award,
  CheckCircle,
} from "lucide-react";
import logo from "../../assets/image/logoSquare.svg";

const FeauturedSection = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      id: 0,
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career Growth Guidance",
      subtitle: "15+ Years of Vedic Insight",
      detailTitle: "Astrological Career Growth Strategy",
      description:
        "With over 15 years of astrological expertise, we provide personalized career guidance rooted in Vedic principles, helping individuals navigate challenges and unlock success through favorable planetary alignments.",
      features: [
        "Personalized career predictions",
        "Dasha & transit-based strategy",
        "Job change & promotion analysis",
        "Remedies for professional growth",
      ],
      stats: [
        { label: "Success Rate", value: "92%" },
        { label: "Clients Guided", value: "10,000+" },
        { label: "Years Experience", value: "15+" },
      ],
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: 1,
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Negative Energy Protection",
      subtitle: "100% Spiritual Shield",
      detailTitle: "Astrological Risk & Energy Management",
      description:
        "Our expert astrologers use ancient rituals and planetary remedies to shield you from negative energies, doshas, and karmic blocks that may hinder your success or well-being.",
      features: [
        "Manglik & Kaal Sarp Dosha analysis",
        "Gemstone & yantra recommendations",
        "Personalized puja & mantra remedies",
        "Aura & planetary protection rituals",
      ],
      stats: [
        { label: "Protection Accuracy", value: "99.8%" },
        { label: "Dosha Remedies", value: "5000+" },
        { label: "Spiritual Satisfaction", value: "100%" },
      ],
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: 2,
      icon: <Clock10 className="w-6 h-6" />,
      title: "24x7 Astrologer Access",
      subtitle: "50+ Expert Astrologers",
      detailTitle: "Comprehensive Astrological Services",
      description:
        "Connect with certified astrologers anytime for love, career, marriage, or health guidance. Our platform ensures quick access and tailored predictions via chat or call.",
      features: [
        "Experienced Vedic astrologers",
        "Daily & monthly horoscopes",
        "Live Kundli & compatibility reports",
        "Phone & chat consultations",
      ],
      stats: [
        { label: "Astrologers Onboard", value: "50+" },
        { label: "Avg. Experience", value: "20+ Yrs" },
        { label: "Clients Served", value: "1L+" },
      ],
      color: "from-yellow-400 to-amber-500",
    },
  ];

  const getCardPosition = (index) => {
    const angle = index * 120 - 60;
    const radius = 140;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <section className=" max-w-7xl mx-auto bg-yellow-50  py-4  px-12 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative ">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="my-4 text-2xl sm:text-4xl  font-semibold text-black">
            Why Choose Astro Captain
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Beyond Predictions: Your Holistic Path to Empowerment
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Details */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-yellow-300 shadow-xl border border-yellow-100 min-h-[600px]">
              <div className="space-y-6" key={selectedCard}>
                {/* Header */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${cards[selectedCard].color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  >
                    {cards[selectedCard].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {cards[selectedCard].detailTitle}
                    </h3>
                    <p className="text-yellow-600 font-semibold">
                      {cards[selectedCard].subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed">
                  {cards[selectedCard].description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Key Features
                  </h4>
                  <div className="space-y-3">
                    {cards[selectedCard].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Circular Cards */}
          <div
            className={`relative flex justify-center items-center transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative w-96 h-96">
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px)",
                      backgroundSize: "20px 20px",
                    }}
                  ></div>
                </div>
                <div className="relative z-10 text-center text-white">
                  {/* <Award className="w-16 h-16 mx-auto mb-4" /> */}
                  <img src={logo} alt="astro captain" className="w-28 mx-5" />
                  <h3 className="text-xl font-bold">Astro Captain</h3>
                  {/* <p className="text-sm opacity-90">
                    Your Holistic Path to Empowerment
                  </p> */}
                </div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin"
                  style={{ animationDuration: "10s" }}
                ></div>
              </div>

              {/* Orbiting Cards */}
              {cards.map((card, index) => {
                const { x, y } = getCardPosition(index);
                const isSelected = selectedCard === index;

                return (
                  <div
                    key={card.id}
                    className="absolute cursor-pointer transform transition-all duration-500 hover:scale-110 z-10"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: `translate(-50%, -50%) ${
                        isSelected ? "scale(1.2)" : "scale(1)"
                      }`,
                    }}
                    onMouseEnter={() => setSelectedCard(index)}
                  >
                    <div
                      className={`w-24 h-24 bg-white rounded-2xl shadow-xl border-4 p-4 flex flex-col items-center justify-center group transition-all duration-300 ${
                        isSelected
                          ? "border-yellow-400 shadow-2xl bg-yellow-50"
                          : "border-gray-200 hover:border-yellow-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center text-white mb-2 transition-transform duration-300 group-hover:scale-110`}
                      >
                        {card.icon}
                      </div>
                      <div className="text-xs font-semibold text-gray-800 text-center leading-tight">
                        {card.title}
                      </div>
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Decorative Orbit Dots */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 opacity-60"></div>
                <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full transform -translate-x-1/2 opacity-40"></div>
                <div className="absolute top-1/2 right-0 w-1 h-1 bg-yellow-300 rounded-full transform -translate-y-1/2 opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeauturedSection;
