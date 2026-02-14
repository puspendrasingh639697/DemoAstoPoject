// src/components/Numerology/HeaderSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import lotus from "../../assets/image/lotus.jpeg";

export default function HeaderSection() {
  return (
    <>
      <section className="w-full bg-orange-300 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center space-y-6 text-center lg:text-left"
            >
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight">
                  Discover Your Life's Numbers
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Explore the ancient wisdom of numerology to understand your
                  destiny, personality, and life path through the power of
                  numbers.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <button className="flex items-center gap-2 bg-red-500 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
                  Discover Your Numbers
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full aspect-video lg:aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={lotus}
                alt="Numerology chart or mystical symbols"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
