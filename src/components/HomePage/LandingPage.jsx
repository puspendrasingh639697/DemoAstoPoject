import React from "react";
import Home1 from "../../assets/image/Home1.png";
import Rectangle from "../../assets/image/Shape.png";
import ButtonAnimation from "../ButtonAnimation";
const LandingPage = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden bg-black">
      {/* Main Hero Section */}
      <div className="relative h-screen">
        {/* Background Images */}
        <div className="absolute inset-0">
          {/* Main background */}
          <img
            src={Home1}
            alt="Space background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="absolute bottom-0 h-14 sm:h-28 lg:h-[170px] 2xl:w-full">
          <img src={Rectangle} alt="" className="" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug sm:leading-normal md:leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mt-6 mb-6">
              Unlock the Secrets <br></br>of Your Stars Through AstroCaptain
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
              Towards Your True Destiny
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center">
              <ButtonAnimation
                onClick={() => {
                  const section = document.getElementById("services");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto bg-transparent border-4 border-yellow-400 text-white font-bold py-3 px-8  rounded-full text-lg transition duration-300 transform hover:scale-105 text-center"
              >
                <button className="w-full">Discover Now</button>
              </ButtonAnimation>

              <ButtonAnimation
                onClick={() => {
                  const section = document.getElementById("app");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto bg-yellow-400 border-4 border-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 text-center"
              >
                <button className="w-full">Get App</button>
              </ButtonAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
