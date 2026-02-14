import React from "react";
import Vastubg from "../../assets/image/Vastubg.png";
import { useNavigate } from "react-router-dom";

const VastuShastraCard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[500px] sm:h-screen w-full bg-black">
      <img
        src={Vastubg}
        alt="VastuBackground"
        className="absolute top-0 left-0 z-10 object-cover w-full h-full opacity-50"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 -translate-y-1/2 text-[#ffffff] text-center lg:w-[1000px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Vastu Shastra: Harmonizing Your Space
        </h1>
        <p className="text-xl md:text-2xl lg:mt-10 mt-2">
          Transform your surroundings into a sanctuary of positivity, balance,
          and prosperity.
        </p>
        <button
          onClick={() => navigate("/vastuform")}
          className="sm:w-48 sm:h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black sm:text-2xl font-medium mt-4 text-lg px-2"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VastuShastraCard;
