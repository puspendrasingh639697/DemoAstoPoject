import React from "react";
import Pandit from "../../assets/PanditIcon.png";
import EPooja from "../../assets/poojaIcon.png";
import Astroco from "../../assets/CounselorIcon.png";
import Vastu from "../../assets/VastuIcon.png";

const Features = ({ activeComponent, setActiveComponent, tabs }) => {
  const selImages = {
    Pandit: Pandit,
    "e-Pooja": EPooja,
    Astrocounsler: Astroco,
    Vastu: Vastu,
  };
  return (
    <>
      <div
        className="flex justify-between m
      t-5 "
      >
        {tabs.map((type) => (
          <div key={type} className="text-center flex items-center flex-col">
            <div
              className={`h-[30px] w-[30px] sm:h-[65px] sm:w-[65px] rounded-xl shadow-lg border flex justify-center items-center p-1 hover:cursor-pointer hover:bg-yellow-400 ${activeComponent === type ? "border-2 border-[#FBEB4D]" : ""
                }`}
              onClick={() => setActiveComponent(type)}
            >
              <img
                src={selImages[type]}
                alt={type}
                className="text-[#AAAAAA] h-14"
              />
            </div>
            <h4
              className={`text-sm text-[#A0A3B1] mt-2 ${activeComponent === type ? "text-black" : ""
                }`}
            >
              {type}
            </h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
