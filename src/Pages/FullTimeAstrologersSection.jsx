import React from "react";
import Image from "../assets/image/trustimage.png";

const FullTimeAstrologersSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <h2 className="text-4xl md:text-5xl font-extrabold  w-full px-10 py-9 leading-tight">
        Don’t Trust Your Future With Part-Timers
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Text Content */}
        <div className="space-y-10">
          <p className="text-lg md:text-xl text-gray-700">
            Your future is far too precious to be left in the hands of part-time
            astrologers who treat astrology as a side hustle. At Astro Captain,
            we believe that guiding someone through life’s most important
            decisions—like choosing a life partner—is a sacred responsibility
            that deserves full dedication, deep expertise, and genuine care.
          </p>

          <div className="space-y-8 text-base md:text-lg text-gray-700">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold  mb-2">
                Full-Time Experts Only
              </h3>
              <p>
                Our Kundli Matching services are handled exclusively by
                full-time professional astrologers—not hobbyists. These experts
                live and breathe Vedic astrology in its most authentic form.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold  mb-2">
                Deeper Than Guna Milan
              </h3>
              <p>
                We go beyond basic scoring. Our astrologers read the deeper
                emotional, karmic, and spiritual layers between charts to find
                genuine soul alignment.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold  mb-2">
                No Fear, Only Clarity
              </h3>
              <p>
                We never use fear or manipulation. Our insights are empowering,
                practical, and spiritually grounded.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold  mb-2">
                More Than Just a Report
              </h3>
              <p>
                We treat each Kundli as a personal story—offering detailed
                understanding, not just analysis.
              </p>
            </div>

            <div className="text-xl font-semibold text-yellow-700 pt-4">
              Let your journey toward a harmonious relationship begin with
              truth, wisdom, and heart—not just zodiac math.
              <br />
              <span className="text-[#9C4221] font-bold">
                Astro Captain – Where Soul Meets Science.
              </span>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full flex justify-center">
          <img
            src={Image}
            alt="Astrologer working"
            className="rounded-3xl shadow-xl max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FullTimeAstrologersSection;
