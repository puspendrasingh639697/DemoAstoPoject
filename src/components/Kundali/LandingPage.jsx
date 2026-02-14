import React from "react";
import { motion } from "framer-motion";
import bgImage3 from "../../assets/image/bgImage3.png";

const CompatibilityHero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage3})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // removed once:true for repeat
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            variants={fadeInUp}
          >
            Everything You Need to Know Is 
            <br />
            Already written 
            in the Stars.
          </motion.h1>

          <motion.p
            className="text-gray-100 text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={fadeInUp}
          >
          Your birth was no coincidence—it was the beginning of a cosmic story uniquely yours. Vedic astrology captures this story in a powerful tool called a Janam Kundali (birth chart), revealing everything from your natural talents and emotional patterns to your life’s biggest opportunities and challenges.
          </motion.p>

          <motion.button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-full text-lg transition-all duration-300"
            variants={fadeInUp}
            whileHover={buttonHover}
            onClick={() => {
              const section = document.getElementById("kundali-form");
              if (section) {
                const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: topOffset, behavior: "smooth" });
              }
            }
            }

          >
            Get Your Kundli
          </motion.button>
        </motion.div>
      </div>

      {/* Light rays effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-bto-transparent transform -rotate-45"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b to-transparent transform rotate-45"></div>
      </div>
    </div>
  );
};

export default CompatibilityHero;
