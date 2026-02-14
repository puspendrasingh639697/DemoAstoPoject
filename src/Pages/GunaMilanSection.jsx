import React from "react";
import Image from "../assets/image/gunaimage.png";

const GunaMilanSection = () => {
  const gunaDetails = [
    {
      title: "Varna (1 Point)",
      description:
        "Assesses ego and spiritual compatibility. Do you share a similar outlook on life and personal growth? Are you likely to respect each other's individuality?",
    },
    {
      title: "Vashya (2 Points)",
      description:
        "Checks mutual influence, control, and dominance. Will the relationship be balanced, or will one partner try to overpower the other?",
    },
    {
      title: "Tara (3 Points)",
      description:
        "Focuses on health, longevity, and overall well-being. Does your combined energy support each other’s life force, or create imbalance?",
    },
    {
      title: "Yoni (4 Points)",
      description:
        "Looks at physical and sexual compatibility. Is there mutual attraction, chemistry, and satisfaction on a physical level?",
    },
    {
      title: "Graha Maitri (5 Points)",
      description:
        "Examines mental connection and intellectual harmony. Can you communicate, share ideas, and grow together emotionally and intellectually?",
    },
    {
      title: "Gana (6 Points)",
      description:
        "Analyzes natural temperament and personality traits. Are your instincts and emotional reactions compatible or conflicting?",
    },
    {
      title: "Bhakoot (7 Points)",
      description:
        "Represents emotional bonding and long-term family harmony. Does your union support stability, prosperity, and shared goals?",
    },
    {
      title: "Nadi (8 Points)",
      description:
        "The most sensitive aspect — deals with genetic compatibility, fertility, and health karma. Are there karmic overlaps or risks that need balancing before marriage?",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center w-full">
        The 36-Point Match System (Guna Milan)
      </h2>

      {/* Intro Text */}
      <p className="text-lg text-gray-700 mb-10 max-w-4xl text-center mx-auto">
        Kundli Matching evaluates 8 key aspects of compatibility between two
        individuals, assigning a total of 36 points. Here's how each one affects
        your relationship.
      </p>

      {/* Layout with image and grid */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left - Content Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gunaDetails.map((guna, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-semibold  mb-2">{guna.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {guna.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right - Image */}
        <div className="lg:w-1/3">
          <img
            src={Image}
            alt="Guna Matching"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GunaMilanSection;
