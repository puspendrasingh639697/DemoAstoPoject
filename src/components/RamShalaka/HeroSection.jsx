// src/components/Numerology/HeroSection.jsx
import React from "react";
import FlowerDroppingEffect from "./FlowerDroppingEffect";

export default function HeroSection() {
  return (
    <>
      {/* {<FlowerDroppingEffect />} */}
      <div className="bg-red-100 py-4 px-6 md:px-16 lg:px-24 ">
        <div className="max-w-7xl  mx-auto flex flex-col-reverse  lg:flex-row justify-between items-center gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Ram Shalaka Prashnavali
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Ram Prashnavali is a divination tool used in Hinduism. It is
              primarily associated with Lord Rama, one of the incarnations of
              Lord Vishnu, and is used by devotees to seek answers to their
              questions or guidance for decision-making.
            </p>
            <div className="flex flex-row items-center justify-center sm:justify-start gap-4 flex-wrap">
              <button onClick={() => {
                const section = document.getElementById('ramshalaka');
                const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({ top: topOffset, behavior: "smooth" });
              }} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-105">
                Start Your Analysis
              </button>
              <button onClick={() => {
                const instructions = document.getElementById('ramshalaka-instructions');
                const topOffset = instructions.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({ top: topOffset, behavior: "smooth" });;
              }} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-105">
                Read Instructions
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://nonprod-media.webdunia.com/public_html/include/_mod/site/theme-5/images/wd-Ramshalaka.png"
              alt="Numerology Banner"
              className="w-full max-w-md mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}
