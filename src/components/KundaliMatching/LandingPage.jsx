import React from "react";
import bgImage4 from "../../assets/image/bgImage4.jpeg";
import { motion } from "framer-motion";

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
          backgroundImage: `url(${bgImage4})`,
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
            Everything you need to know
            <br />
            about your compatibility
          </motion.h1>

          <motion.p
            className="text-gray-100 text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            Kundli Milan or Kundali Matching holds significant importance when
            planning for marriage. It involves matching the Kundlis of the
            prospective bride and groom, ensuring compatibility before marriage.
            Considered as a crucial part in Vedic astrology and an integral
            process, this has been a part of India's cultural heritage for
            centuries. If you're contemplating marriage, seeking compatibility
            with someone you admire, AstroExplain can assist you.
          </motion.p>

          <motion.button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-full text-lg transition-all duration-300"
            variants={fadeInUp}
            whileHover={buttonHover}
            onClick={() => {
              const section = document.getElementById("matching-form");
              if (section) {
                const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: topOffset, behavior: "smooth" });
              }
            }
            }

          >
            Find Your Compatibility
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
