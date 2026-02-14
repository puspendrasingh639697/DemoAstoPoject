import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import star from "../../assets/star.png";
import image from "../../assets/experience.png";
import Rupe from "../../assets/rupeeimage.png";
import language from "../../assets/language.png";
import chat from "../../assets/chaticon.png";
import call from "../../assets/callicon.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "./RatingStar";
import stamp from "../../assets/image/stamp.png.png";



const AstrologerCard = ({ astrologer, isSelected }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/astrologer/${astrologer._id}`, { state: { astrologer } });
  };
  return (
    <>
      <div
        onClick={handleCardClick}
        className="flex items-center space-x-4 border rounded-lg shadow-lg p-2 hover:border hover:border-yellow-500 cursor-pointer"
      >
        <div className="relative">
          <img
            src={astrologer.image}
            alt={astrologer.firstName}
            className="size-20 rounded-full border-4 border-gray-200"
          />
          <img src={stamp} className="absolute bottom-2 -left-1" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
        </div>

        {/* Right Div: Name and Icon Section */}
        <div>
          <h2 className="text-md text-black">
            {astrologer.firstName} {astrologer.lastName}
          </h2>
          <div className="flex items-center text-sm space-x-6 justify-between w-full">
            <div className="mt-0.5 flex items-center text-[10px]">
              <img src={star} alt="start" className="w-4 h-4" />
              <span className="m-1">{astrologer.Skills.join(",")}</span>
            </div>
            <div className="mt-0 flex items-end text-[10px] text-black">
              <img src={image} alt="start" className="w-4 h-4" />
              <span className="m-1">{astrologer.experience}+years</span>
            </div>
          </div>

          <div className="flex  text-sm space-x-6 justify-between w-full">
            <div className="-mt-1  flex items-center text-[10px]">
              <img src={Rupe} alt="start" className="w-2 h-2" />
              <span className="m-1">{astrologer.chatPrice}/per mint</span>
            </div>
            <div className=" text-[10px] ">
              <div className="-mt-1 flex items-end text-black">
                <img src={language} alt="start" className="w-4 h-4" />
                <span className="m-1">{astrologer.languages.join(",")}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 sm:gap-6 md:gap-10">
            {/* First div with rating (larger width) */}
            <div className="flex items-center justify-center w-full border-2 border-gray-400  rounded-full py-1.5 ">
              <Rating rating={3} />
              <span className="text-sm mx-1">{" " + "3.5"}</span>
            </div>

            <div className="flex justify-evenly items-center w-full gap-3">
              {/* Call Button */}
              <button className="flex items-center justify-center space-x-1 bg-green-500 text-white px-4 py-1 rounded-full shadow-md w-full sm:w-1/3 md:w-1/4 lg:w-[70%]">
                <img src={call} alt="call icon" className="w-2.8 h-2.8" />
                <span className="text-[12px] font-semibold">Call</span>
              </button>

              {/* Chat Button */}
              <button className="flex items-center justify-center space-x-1 bg-blue-400 text-white px-4 py-1 rounded-full shadow-md w-full sm:w-1/3 md:w-1/4 lg:w-[70%]">
                <img src={chat} alt="chat icon" className="w-2.8 h-2.8" />
                <span className="text-[12px] font-semibold">Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AstrologerListing = () => {
  const [astrologer, setAstrologer] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/astrologer-data`
        );
        setAstrologer(response.data.Astrodata);
        // console.log(response.data.Astrodata);
      } catch (error) {
        console.error("Error fetching astrologer data:", error);
      }
    };
    fetchData();
  }, []);
  // const location = useLocation();
  // const astrologerData =
  //   location.state?.astrologer ||
  //   JSON.parse(localStorage.getItem("astrologerData") || "[]");
  // console.log(astrologerData);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className=" text-yellow-400 py-2 px-4 text-center mb-4">
        <h1 className="font-bold text-3xl">Talk to Astrologer</h1>
        <h1 className="text-semibold text-md mt-4">
          Find Your Perfect Astrologer match
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 px-4">
        <div className="flex justify-between items-center gap-8 sm:gap-28 w-full max-w-4xl mx-auto">
          {/* First div with button */}
          <div className="bg-yellow-400 font-bold rounded-md px-6 py-2 text-center sm:text-left">
            Talk to Astrologer
          </div>

          {/* Second div with balance text */}
          <div className="text-sm font-medium mr-10 sm:ml-10">
            Available Balance: INR: 0.00
          </div>
        </div>

        {/* Filter, Sort, Recharge, and Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
          {/* Recharge Button */}
          <div className="text-black border-2 border-green-500 rounded-md px-4 py-2 cursor-pointer w-full sm:w-auto">
            Recharge
          </div>

          {/* Filter Dropdown */}
          <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
            <option>Filter</option>
          </select>

          {/* Sort by Dropdown */}
          <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
            <option>Sort by</option>
          </select>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto">
            <input
              type="search"
              placeholder="Search name..."
              className="border rounded pl-2 pr-8 py-2 text-sm w-full sm:w-auto"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-xs px-2 rounded">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Astrologer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {astrologer && astrologer.map((astrologer, index) => (
          <AstrologerCard
            key={astrologer.id}
            astrologer={astrologer}
            isSelected={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default AstrologerListing;
