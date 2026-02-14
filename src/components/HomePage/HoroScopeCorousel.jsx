import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import BlurText from "../BlurText";
import Aries from "../../assets/image/Aries.png";
import Aquarius from "../../assets/image/Aquarius.png";
import Cancer from "../../assets/image/cancer.png";
import Capricorn from "../../assets/image/capricorn.png";
import Gemini from "../../assets/image/gemini.png";
import leo from "../../assets/image/leo.png";
import Libra from "../../assets/image/libra.png";
import pisces from "../../assets/image/pisces.png";
import scorpio from "../../assets/image/scorpio.png";
import tauras from "../../assets/image/tauras.png";
import virgo from "../../assets/image/virgo.png";
import Sagittarius from "../../assets/image/Sagittauris.png";

const HoroscopeCarousel = () => {
  const horoscopeData = [
    {
      id: 1,
      title: "ARIES",
      image: Aries,
      date: "MAR 21 - APR 19",
      description: "Aries is the first astrological sign in the zodiac.",
    },
    {
      id: 2,
      title: "TAURUS",
      image: tauras,
      date: "APR 20 - MAY 20",
      description: "Taurus is an earth sign represented by the bull.",
    },
    {
      id: 3,
      title: "GEMINI",
      image: Gemini,
      date: "MAY 21 - JUN 20",
      description: "Gemini is an air sign associated with communication.",
    },
    {
      id: 4,
      title: "CANCER",
      image: Cancer,
      date: "JUN 21 - JUL 22",
      description: "Cancer is a water sign ruled by the moon.",
    },
    {
      id: 5,
      title: "LEO",
      image: leo,
      date: "JUL 23 - AUG 22",
      description: "Leo is a fire sign ruled by the sun.",
    },
    {
      id: 6,
      title: "VIRGO",
      image: virgo,
      date: "AUG 23 - SEP 22",
      description: "Virgo is an earth sign known for its attention to detail.",
    },
    {
      id: 7,
      title: "LIBRA",
      image: Libra,
      date: "SEP 23 - OCT 22",
      description: "Libra is an air sign associated with balance and harmony.",
    },
    {
      id: 8,
      title: "SCORPIO",
      image: scorpio,
      date: "OCT 23 - NOV 21",
      description: "Scorpio is a water sign known for its intensity.",
    },
    {
      id: 9,
      title: "SAGITTARIUS",
      image: Sagittarius,
      date: "NOV 22 - DEC 21",
      description:
        "Sagittarius is a fire sign known for its adventurous spirit.",
    },
    {
      id: 10,
      title: "CAPRICORN",
      image: Capricorn,
      date: "DEC 22 - JAN 19",
      description: "Capricorn is an earth sign associated with ambition.",
    },
    {
      id: 11,
      title: "AQUARIUS",
      image: Aquarius,
      date: "JAN 20 - FEB 18",
      description: "Aquarius is an air sign known for its innovation.",
    },
    {
      id: 12,
      title: "PISCES",
      image: pisces,
      date: "FEB 19 - MAR 20",
      description:
        "Pisces is a water sign associated with creativity and empathy.",
    },
  ];

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  const duplicatedData = [...horoscopeData, ...horoscopeData];

  return (
    <div className="max-w-7xl mx-auto px-12 py-10 overflow-hidden ">
      <h1 className="flex items-center justify-center font-bold text-3xl mb-8">
        TODAY'S HOROSCOPE
      </h1>

      <div className="relative overflow-hidden px-9">
        <motion.div className="flex space-x-6 " animate={controls}>
          {duplicatedData.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-64 bg-white mb-6 p-4 rounded-xl shadow-lg  shadow-yellow-400 flex flex-col items-center text-center"
              onHoverStart={() => controls.stop()}
              onHoverEnd={() =>
                controls.start({
                  x: ["0%", "-50%"],
                  transition: {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  },
                })
              }
            >
              <div className="w-24 h-24 mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
              <p className="text-sm mt-2">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HoroscopeCarousel;
