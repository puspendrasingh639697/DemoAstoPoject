import React, { useEffect, useState } from "react";

const ServicesSection = () => {
  const [inView, setInView] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Free Kundli",
      description:
        "Generate your personalized birth chart instantly and discover your planetary positions with detailed analysis.",
      icon: "🌟",
      image: "https://media.vyaparify.com/vcards/blogs/100110/Lagna-Kundli.jpg",
      fallbackImage:
        "https://via.placeholder.com/400x300/FFD700/FFFFFF?text=🌟+Kundli",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      shadowColor: "rgba(255, 215, 0, 0.4)",
    },
    {
      id: 2,
      title: "Kundli Matching",
      description:
        "Check marriage compatibility with detailed analysis of 36 gunas and planetary alignments for perfect union.",
      icon: "💫",
      image: "https://helloastro.in/wp-content/uploads/2023/07/horoscope.jpg",
      fallbackImage:
        "https://via.placeholder.com/400x300/FFE135/FFFFFF?text=💫+Match",
      gradient: "linear-gradient(135deg, #FFE135 0%, #FFC107 100%)",
      shadowColor: "rgba(255, 193, 7, 0.4)",
    },
    {
      id: 3,
      title: "E-Pooja",
      description:
        "Book sacred online pooja services with experienced pandits from holy temples across India.",
      icon: "🕉️",
      image:
        "https://lightup-temples.s3.ap-south-1.amazonaws.com/wp-content/uploads/WhatsApp-Image-2023-11-14-at-6.07.37-PM.jpeg",
      fallbackImage:
        "https://via.placeholder.com/400x300/F9C23C/FFFFFF?text=🕉️+E-Pooja",
      gradient: "linear-gradient(135deg, #F9C23C 0%, #F39C12 100%)",
      shadowColor: "rgba(243, 156, 18, 0.4)",
    },
    {
      id: 4,
      title: "Book Pandit",
      description:
        "Arrange traditional offline pooja ceremonies at your home with our certified and experienced pandits.",
      icon: "🙏",
      image:
        "https://i.pinimg.com/1200x/1c/50/72/1c5072dbfd50ce766a31546193ea1f08.jpg",
      fallbackImage:
        "https://via.placeholder.com/400x300/FFB347/FFFFFF?text=🙏+Pandit",
      gradient: "linear-gradient(135deg, #FFB347 0%, #FF8C00 100%)",
      shadowColor: "rgba(255, 140, 0, 0.4)",
    },
  ];

  const replayAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Animation Controls
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3">
        <button
          onClick={replayAnimation}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ✨ Replay
        </button>
      </div> */}

      {/* Services Section */}
      <section
        key={animationKey}
        className="relative pt-8 pb-20 overflow-hidden min-h-screen bg-white"
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                background: `linear-gradient(45deg, #FFD700, #FFA500)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 ">
          {/* Section Header */}
          <div
            className="text-center mb-16"
            style={{
              animation: "headerFadeIn 1.2s ease-out",
            }}
          >
            <div className="inline-block mb-4">
              <span className="text-6xl animate-pulse">✨</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6">
              Divine Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Connect with cosmic energies through our sacred services and
              discover the wisdom of ancient traditions
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4"
                style={{
                  animation: `cardSlideUp 0.8s ease-out ${
                    index * 0.2 + 0.5
                  }s both`,
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = service.fallbackImage;
                    }}
                    loading="lazy"
                  />

                  {/* Floating Icon */}
                  <div
                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      animation:
                        hoveredCard === service.id
                          ? "iconSpin 1s ease-in-out"
                          : "iconFloat 3s ease-in-out infinite",
                    }}
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </div>

                  {/* Ripple Effect */}
                  {hoveredCard === service.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{ animation: "ripple 1s ease-out" }}
                      />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <button
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden"
                    style={{ background: service.gradient }}
                  >
                    <span className="relative z-10">Explore Now</span>
                    <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Decoration */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 text-yellow-600">
              <span className="text-2xl animate-bounce">🌟</span>
              <span className="text-lg font-medium">
                Trusted by thousands of devotees
              </span>
              <span
                className="text-2xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                🌟
              </span>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes headerFadeIn {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cardSlideUp {
            from {
              opacity: 0;
              transform: translateY(60px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes iconFloat {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(5deg);
            }
          }

          @keyframes iconSpin {
            0% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.2) rotate(180deg);
            }
            100% {
              transform: scale(1) rotate(360deg);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(-10px);
            }
            75% {
              transform: translateY(-30px) translateX(5px);
            }
          }

          @keyframes ripple {
            0% {
              width: 0;
              height: 0;
              opacity: 1;
            }
            100% {
              width: 300px;
              height: 300px;
              opacity: 0;
            }
          }

          @keyframes bounce {
            0%,
            20%,
            53%,
            80%,
            100% {
              transform: translate3d(0, 0, 0);
            }
            40%,
            43% {
              transform: translate3d(0, -8px, 0);
            }
            70% {
              transform: translate3d(0, -4px, 0);
            }
            90% {
              transform: translate3d(0, -2px, 0);
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ServicesSection;
