import React from "react";
import SingleBlog from "../../assets/image/SingleBlog.png";
import SingleBlog2 from "../../assets/image/SingleBlog2.png";

const HeroSection = () => {
  return (
    <div className="mx-4 sm:mx-32 mt-16">
      <div className="flex flex-col sm:flex-row p-2 sm:p-8">
        {/* Text content on the left */}
        <div className="flex-1 mb-4 sm:mb-0 sm:w-1/2 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 p-3 pt-10 sm:pt-20 text-justify">
            Best Business name as <br />
            per Numerology | Best <br />
            numerology consultant | <br />
            Super Astrologer
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mt-5 p-2">
            {/* Image on the left */}
            <div className="mb-4 sm:mb-0">
              <img
                src={SingleBlog2}
                alt="Example"
                className="rounded-lg"
              />
            </div>

            {/* Content text on the right */}
            <div className="flex flex-wrap justify-center  items-center sm:justify-start">
              <div className="p-1 border-r-2 border-gray-800">
                <p>5 min</p>
              </div>
              <div className="p-1 border-r-2 border-gray-800">
                <p>Jan 24, 2025</p>
              </div>
              <div className="p-1 border-r-2 border-gray-800">
                <p>Manish Kumar</p>
              </div>
              <div className="p-1 border-r-2 border-gray-800">
                <p>WEB</p>
              </div>
              <div className="p-1 border-r-2 border-gray-800">
                <p>Views : 3337</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image on the right */}
        <div className="flex-1 sm:w-1/2">
          <img
            src={SingleBlog}
            alt="Example"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
