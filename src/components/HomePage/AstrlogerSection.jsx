import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import sun from "../../assets/image/Sunimg.png";
import { useNavigate } from "react-router-dom";
import vector from "../../assets/vector1.png";
import PanditImage2 from "../../assets/image/PanditImage2.jpeg";
import PanditImage3 from "../../assets/image/PanditImage3.jpeg";
import PanditImage4 from "../../assets/image/PanditImage4.jpeg";
import PanditImage5 from "../../assets/image/PanditImage5.jpeg";
import PanditImage6 from "../../assets/image/PanditImage6.jpeg";
import PanditImage7 from "../../assets/image/PanditImage7.jpeg";
import ButtonAnimation from "../ButtonAnimation";
import { motion } from "framer-motion";
const AstrologerCard = ({
  image,
  firstName,
  languages,
  experience,
  Skills,
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg text-center relative border border-gray-100 my-10">
    <div className="w-32 h-32 mb-4 relative flex items-center justify-center mx-auto">
      <img
        src={vector}
        className="absolute inset-0 w-full h-full object-contain z-0"
        alt="vector"
      />
      <img
        src={image}
        alt={firstName}
        className="rounded-full w-20 h-20 object-cover z-10"
      />
    </div>
    <h3 className="font-bold text-lg mb-1 line-clamp-1">{firstName}</h3>
    <div className="text-left">
      <p className="text-yellow-500 text-sm mb-1">
        Language: <span className="text-gray-600">{languages}</span>
      </p>
      <p className="text-yellow-500 text-sm mb-2 line-clamp-1">
        Experience: <span className="text-gray-600">{experience}</span>
      </p>
      <p className="text-yellow-500 text-sm mb-2 line-clamp-1">
        Expertise: <span className="text-gray-600">{Skills}</span>
      </p>
      <div className="flex justify-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    </div>
  </div>
);

const Astrologers = () => {
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  const navigate = useNavigate();
  const MotionButtonAnimation = motion(ButtonAnimation);
  const astrologer = [
    {
      image: PanditImage7,
      firstName: "Acharya Dhruv",
      languages: "Hindi, English",
      experience: "17 years",
      Skills: "Vedic",
    },
    {
      image: PanditImage6,
      firstName: "Acharya Uma Shankar",
      languages: "Hindi",
      experience: "10 years",
      Skills: "Vedic Astrology",
    },
    {
      image: PanditImage2,
      firstName: "Acharya Shradha",
      languages: "English",
      experience: "15 years",
      Skills: "Vedic Astrology",
    },
    {
      image: PanditImage3,
      firstName: "pt. Sanjay Sati",
      languages: "Hindi, Sanskrit",
      experience: "22 years",
      Skills: "Vedic Astrology, Vedic Pujan",
    },
    {
      image: PanditImage7,
      firstName: "pt. Raghav Mishra",
      languages: "English, Hindi",
      experience: "7 years",
      Skills: "Vedic Astrology, Vedic Pujan",
    },
    {
      image: PanditImage5,
      firstName: "Acharya Nakul",
      languages: "Hindi, Sanskrit",
      experience: "9 years",
      Skills: "Vedic Astrology",
    },
    {
      image: PanditImage4,
      firstName: "Acharya Sheetal",
      languages: "English, Hindi",
      experience: "6 years",
      Skills: "Vedic Astrology, Tarot",
    },
  ];
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const totalDots = 4;

  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 450) return 2;
      return 1;
    }
    return 1;
  };

  const getCurrentDot = () => {
    const segmentSize = astrologer.length / totalDots;
    return Math.floor(currentIndex / segmentSize);
  };

  const handleDotClick = (dotIndex) => {
    const segmentSize = Math.ceil(astrologer.length / totalDots);
    setCurrentIndex(dotIndex * segmentSize);
  };

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        const visibleSlides = getVisibleSlides();
        const maxIndex = astrologer.length - visibleSlides;
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  return (
    <div className="relative py-6 px-4 h-1/2 overflow-x-hidden ">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-between items-center">
          <div className="text-2xl sm:text-4xl font-semibold text-center flex-1">
            Our Astrologers
          </div>
          <motion.span
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MotionButtonAnimation
              className="relative overflow-hidden border-2 border-yellow-400 py-2 px-6 rounded-md text-black font-semibold group"
              onClick={() => navigate("/astro-page")}
            >
              View All
            </MotionButtonAnimation>
          </motion.span>
        </div>
        <motion.div
          className="text-center sm:mx-20 mt-3 text-gray-600 text-md"
          initial={fadeInUp.hidden}
          whileInView={fadeInUp.visible}
          viewport={{ once: true }}
        >
          "Get expert online astrology consultations from top Vedic astrologers
          skilled in kundli analysis, numerology, and Vastu remedies. Find
          clarity in love, career, finance, and health with Astro Captain’s
          trusted guides."
        </motion.div>

        {/* Slider */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / getVisibleSlides())
              }%)`,
            }}
          >
            {astrologer.map((astro, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-4"
              >
                <AstrologerCard {...astro} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center  space-x-2">
          {Array.from({ length: totalDots }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => handleDotClick(dotIndex)}
              className={`h-3 rounded-full transition-all duration-300 ${
                getCurrentDot() === dotIndex
                  ? "bg-yellow-400 w-6"
                  : "bg-gray-300 hover:bg-gray-400 w-3"
              }`}
              aria-label={`Go to section ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Astrologers;
