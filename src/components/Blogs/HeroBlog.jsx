import React from "react";
import HeroBlog from "../../assets/image/BlogImg.png";

const HeroBlogSection = () => {
  return (
    <section
      className="bg-cover bg-center min-h-screen flex items-center justify-center "
      style={{ backgroundImage: `url(${HeroBlog})` }}
    >
      <div className="text-center text-white p-4 md:p-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Blogs
        </h1>
        <p className="text-base  sm:text-lg md:text-xl max-w-3xl mx-auto">
          Discover powerful yantras to enhance your spiritual journey. Our
          yantras are crafted with the precision to help you balance your
          energies and bring positivity into your life. Each yantra is designed
          based on ancient astrological principles{" "}
        </p>
      </div>
    </section>
  );
};

export default HeroBlogSection;
