import React from "react";
import { Star } from "lucide-react";
const HeroSection = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12 bg-yellow-300 transition-all py-5 duration-600 ">
        <div className="flex items-center justify-center  gap-4 mb-6">
          <div className="star-icon w-20 h-20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:rotate-360 hover:shadow-2xl">
            <Star className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-sm md:text-xl font-bold bg-black bg-clip-text text-transparent drop-shadow-sm">
            Name Numerology Calculator
          </h1>
        </div>
        <p className="m-4">
          Want to uncover the powerful secrets about your personality and life
          path? ALL FROM YOUR NAME? There’s a way! A numerology calculator can
          reveal hidden insights or the true face of your destiny that was
          created at the moment you were named and no, it’s not about
          embarrassing nicknames. Understand yourself deeper and make wiser life
          choices.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
