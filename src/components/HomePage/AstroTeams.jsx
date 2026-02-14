import React from "react";
import Serviceimg from "../../assets/image/Serviceimg.png";
const MultidisciplinaryTeam = () => {
  const features = [
    "Personalized life coaching and strategic guidance",
    "Holistic wellness strategies",
    "In-depth psychological assessments",
    "Emotional intelligence development",
    "Career and personal potential mapping",
    "Relationship dynamics analysis",
  ];

  return (
    <div className="bg-white py-12 px-6">
      <h2 className="text-center  text-2xl sm:text-4xl font-semibold mb-8">
        Our multidisciplinary team delivers
      </h2>
      <div className="relative flex flex-col items-center">
        {/* Characters and Mobile */}
        <div>
          <img src={Serviceimg} alt="image" className="" />
        </div>

        {/* Features */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 shadow-md rounded-md p-4 flex items-center"
            >
              <span className="text-yellow-500 text-xl mr-2">•</span>
              <p>{feature}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MultidisciplinaryTeam;
