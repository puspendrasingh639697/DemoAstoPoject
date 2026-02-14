import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logoSquare.svg";
import ButtonAnimation from "../ButtonAnimation";
import { motion } from "framer-motion";

// Card entrance animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-12 bg-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Blogs & Articles</h2>
        </div>

        {/* Mobile Buttons */}
        <div className="block sm:hidden">
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button className="px-4 py-2 rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white text-xs font-medium">
              Astrology Basics
            </button>
            <button className="px-4 py-2 rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white text-xs font-medium">
              Planetary Influences
            </button>
            <button className="px-4 py-2 rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white text-xs font-medium">
              Relationships
            </button>
          </div>
        </div>
        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  md:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, idx) => (
            <motion.div
              key={idx}
              className="group bg-white w-full mx-auto rounded-md shadow p-3 cursor-pointer hover:shadow-lg hover:scale-[1.03] hover:bg-yellow-400 transition duration-300 ease-in-out"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="w-full h-36 bg-black flex items-center justify-center rounded  overflow-hidden">
                <img
                  src={logo}
                  alt={`Blog ${idx + 1}`}
                  className="h-36 object-contain"
                />
              </div>
              <p className="text-yellow-600 font-semibold text-xs mt-2">
                ASTROLOGY
              </p>
              <h3 className="text-base font-semibold leading-snug mt-1">
                4 Zodiac Signs with{" "}
                {idx === 1 ? "Soft Voice" : "Singing Talent"}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold">Some Trending Topics</p>
            <p className="text-yellow-500 font-medium border-b border-yellow-400">
              <Link to="/blogs" className="hover:underline">
                view all blogs
              </Link>{" "}
              and{" "}
              <Link to="/allblogs" className="hover:underline">
                articles
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <ButtonAnimation className="px-4 py-2 rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white">
              Astrology Basics
            </ButtonAnimation>
            <ButtonAnimation className="px-4 py-2 rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white">
              Planetary Influences
            </ButtonAnimation>
            <ButtonAnimation className="px-4 py-2 rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white">
              Relationships
            </ButtonAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
