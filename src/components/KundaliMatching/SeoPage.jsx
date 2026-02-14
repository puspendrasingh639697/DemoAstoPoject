import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const KundliInfoSection = () => {
  const navigate = useNavigate()
  return (
    <div className="py-12 px-6 sm:px-10 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-8 sm:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} // Animation plays once
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-6">
          Get Your Free Kundli Online and Unveil Your Future
        </h1>

        <p className="text-center font-semibold text-lg sm:text-xl md:text-2xl text-yellow-600 mb-10">
          Generate Your Kundli by Date of Birth Online
        </p>

        <motion.p
          className="text-gray-700 leading-relaxed text-md sm:text-lg md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }} // Animation plays once
          transition={{ duration: 1, delay: 0.3 }}
        >
          A person's Kundli is one of the most sought-after elements in astrology. It provides
          detailed information about the positions of stars and planets at the time of your birth,
          which are then used to make further predictions. These predictions cover various aspects
          of the birth native like career, health, business, finance, and marriage. Due to this
          diversity in readings, a Kundli is essential for anyone looking to improve their
          decision-making capabilities over time.
        </motion.p>
        <motion.button
          onClick={() => navigate("/Free-kundali-info")}
          className="flex justify-center items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-md mx-auto mt-4 hover:bg-yellow-500 transition-colors duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Know more
        </motion.button>
      </motion.div>
    </div>
  );
};

export default KundliInfoSection;
