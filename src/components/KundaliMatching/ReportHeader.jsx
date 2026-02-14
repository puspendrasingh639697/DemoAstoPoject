import React from "react";

import Ring from "../../assets/KundliMatching/Ring.png";

const ReportHeader = ({ matchDetails }) => {
  return (
    <header className="text-center mb-2">
      <h1 className="text-center text-5xl font-bold mt-10">
        Kundli Matching Report
      </h1>
      <div className=" flex items-center justify-center gap-3 md:gap-16 mt-3   ">
        <p className="border px-14 py-1  rounded-md text-sm  md:text-xl font-bold text-black bg-gradient-to-t from-[#FFA600] to-[#FBFF00]  ">
          {matchDetails?.boy.fullname}
        </p>
        <img src={Ring} height={100} width={100} />
        <p className="border px-14 py-1  rounded-md text-sm md:text-xl font-bold text-black   bg-gradient-to-t from-[#FFA600] to-[#FBFF00] ">
          {matchDetails?.girl.fullname}
        </p>
      </div>
    </header>
  );
};

export default ReportHeader;
