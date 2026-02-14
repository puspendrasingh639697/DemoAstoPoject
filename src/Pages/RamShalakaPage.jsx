import React from "react";
import HeroSection from "../components/RamShalaka/HeroSection";
import Chart from "../components/RamShalaka/Chart";
// import Patra from "../components/RamShalaka/patra";
import RamShalakaMain from "../components/RamShalaka/RamShalakaMain";
import { motion } from "framer-motion";

const RamShalakaPage = () => {
  return (
    <div className="notranslate" translate="no">
      {<HeroSection />}
      {/* {<Chart />} */}
      {/* {<Patra />} */}
      <div className="p-5">
        <section id="ramshalaka">
          <h1 className="text-3xl mt-5 sm:text-4xl  text-yellow-950 font-bold mb-4 text-center">Ram Shalaka</h1>
          <div className="bg-yellow-100 border-l-4 my-5 border-yellow-600 text-yellow-900 p-5 rounded-xl shadow-md max-w-7xl mx-auto mt-6">
            <h4 className="text-sm sm:text-lg font-bold mb-2">📌 Important Note</h4>
            <p className="text-xs sm:text-sm leading-relaxed">
              Please do not consider{" "}
              <span className="font-semibold text-red-600">Ram Shalaka</span> as a
              game. Trying again and again may lead to confusion.{" "}
              <br className="hidden sm:block" />
              <span className="font-semibold text-red-600">
                Ask your question with pure intention and believe the first result
                you receive.
              </span>
              <br className="hidden sm:block" />
              <span className="font-semibold text-green-600">
                Please read the instructions before using Ram Shalaka and follow
                them .{" "}
              </span>
            </p>
          </div>
          <RamShalakaMain />
        </section>
        <motion.section
          id="ramshalaka-instructions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-100 border-l-4 border-yellow-500 shadow-md p-6 rounded-xl max-w-7xl mx-auto mt-8"
        >
          <p className="text-gray-800 text-sm sm:text-md  mb-4 leading-relaxed">
            <span className="font-semibold text-yellow-800">
              Ram Prashnavali
            </span>
            , also known as{" "}
            <span className="italic">Ram Shalaka Prashnavali</span>, is a
            divination tool used in Hinduism. It is primarily associated with
            Lord Rama, one of the incarnations of Lord Vishnu, and is used by
            devotees to seek answers to their questions or guidance for
            decision-making. The word{" "}
            <span className="italic">“Prashnavali”</span> translates to “oracle”
            or “divination.”
          </p>
          <p className="text-gray-800 text-sm sm:text-md leading-relaxed">
            <span className="font-semibold text-yellow-700">
              How to ask a question through Ram Prashnavali?
            </span>
            <br />
            <span className="block mt-2">
              🔸 <span className="font-medium">Step 1:</span> Close your eyes
              with a calm mind and meditate on{" "}
              <span className="font-semibold text-red-600">Sri Ram</span> for a
              few moments. Make your question in your mind.
            </span>
            <span className="block mt-2">
              🔸 <span className="font-medium">Step 2:</span> Say{" "}
              <span className="font-semibold text-red-600">
                “Jay Shree Ram”
              </span>{" "}
              and click anywhere on the Ram Prashnavali chart with closed eyes.
            </span>
            <span className="block mt-2">
              🔸 <span className="font-medium">Step 3:</span> Your answer page
              will load immediately.{" "}
              <span className="italic text-xs sm:text-sm">
                (Please wait up to 5 seconds for the answer to load)
              </span>
            </span>
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default RamShalakaPage;
