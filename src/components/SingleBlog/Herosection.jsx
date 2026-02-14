import React from "react";
import BlogHeroSectionImage from '../../assets/image/Blogs-HeroSectionImage.png';
const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px]"
      style={{ backgroundImage: `url(${BlogHeroSectionImage})` }} // Replace with your image path
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better text contrast */}
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <h1 className="text-white text-md sm:text-xl md:text-xl font-semibold leading-tight px-4">
        Best Business Name as per Numerology | Best Online Numerology Consultant | Super Astrologer
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
