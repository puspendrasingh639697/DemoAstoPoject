import React from "react";
import Boyicon from "../../assets/KundliMatching/Boyicon.png";
import Girlicon from "../../assets/KundliMatching/Girlicon.png";
const UserDetails = ({ matchDetails }) => {
  return (
    <div className="flex flex-col  md:flex-row  items-center justify-center gap-6 my-4 px-4 md:px-20">
      <div className=" border  border-black rounded-md hover:shadow-xl  transition duration-300  w-full md:w-1/2 ">
        <h3 className="text-lg  border-b  font-bold text-black bg-gradient-to-t from-[#FFA600] to-[#FBFF00]  rounded-t-md  pl-2 py-2 flex items-center gap-3">
          <img
            src={Boyicon}
            className=" rounded-full bg-yellow-500"
            height={30}
            width={30}
          />
          <p className="text-black font-normal">Boy's Details</p>
        </h3>
        <div className="flex flex-col gap-2 mt-3 ">
          <p className="border-b  border-black pb-3 pl-2  text-sm md:text-base">
            <strong className="pr-40 ">Name :</strong> {matchDetails?.boy.fullname}
          </p>
          <p className="border-b  border-black pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-16">Birth Date & Time:</strong>{" "}
            {matchDetails?.boy.day} {matchDetails?.boy.month}{" "}
            {matchDetails?.boy.year} | {matchDetails?.boy.hour}:
            {matchDetails?.boy.minute}
          </p>
          <p className="border-b   border-black pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-32 ">Birth Place :</strong>{" "}
            {matchDetails?.boy.name}
          </p>
          <p className="pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-28 ">Janam Rashi :</strong> Capricorn
          </p>
        </div>
      </div>
      <div className="border border-black  rounded-md hover:shadow-xl transition duration-300 w-full md:w-1/2">
        <h3 className="text-lg  border-b text-black bg-gradient-to-t from-[#FFA600] to-[#FBFF00] rounded-t-md pl-2 py-2 flex items-center gap-3 ">
          <img
            src={Girlicon}
            height={30}
            width={30}
            className="rounded-full bg-yellow-500 "
          />
          <p className="text-black font-normal">Girl's Details</p>
        </h3>
        <div className="flex flex-col gap-2 mt-3 ">
          <p className="border-b border-black pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-40">Name:</strong> {matchDetails?.girl.fullname}
          </p>
          <p className="border-b border-black pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-16">Birth Date & Time:</strong>{" "}
            {matchDetails?.girl.day} {matchDetails?.girl.month}{" "}
            {matchDetails?.girl.year} | {matchDetails?.girl.hour}:
            {matchDetails?.girl.minute}
          </p>
          <p className="border-b border-black pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-32">Birth Place:</strong>{" "}
            {matchDetails?.girl.name}
          </p>
          <p className="pb-3 pl-2 text-sm md:text-base">
            <strong className="pr-32">Janam Rashi:</strong> Scorpio
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
