import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import star from "../../assets/star.png";
import image from "../../assets/experience.png";
import Rupe from "../../assets/rupeeimage.png";
import language from "../../assets/language.png";
import chat from "../../assets/chaticon.png";
import call from "../../assets/callicon.png";
import axios from "axios";
import Rating from "../Astrologer/RatingStar";
import stamp from "../../assets/image/stamp.png.png";

// const astrologers = [
//   {
//     id: 1,
//     name: "Rishabh Tiwari",
//     experience: "Vedic Astrology",
//     price: "₹10/min",
//     rating: 4.5,
//     reviews: 25,
//     languages: "English, Hindi, kannada",
//     isOnline: true,
//   },
//   {
//     id: 2,
//     name: "Rishabh Tiwari",
//     experience: "Vedic Astrology",
//     price: "₹10/min",
//     rating: 4.8,
//     reviews: 34,
//     languages: "English, Hindi, kannada",
//     isOnline: true,
//   },
//   {
//     id: 3,
//     name: "Rishabh Tiwari",
//     experience: "Vedic Astrology",
//     price: "₹10/min",
//     rating: 4.6,
//     reviews: 28,
//     languages: "English, Hindi, kannada",
//     isOnline: true,
//   },
// ];

const AstrologerCard = ({ astrologer, isSelected }) => {
  return (
    // <div
    //   className={`border p-4 flex items-start gap-4 ${
    //     isSelected ? "border-yellow-400" : "border-gray-200"
    //   }`}
    // >
    //   <div className="w-12 h-12 relative">
    //     <img
    //       src={astrologer.image}
    //       alt={astrologer.name}
    //       className="rounded-full bg-gray-200"
    //     />
    //   </div>

    //   <div className="flex-1">
    //     <div className="flex justify-between items-start">
    //       <div>
    //         <h3 className="font-medium text-base">{astrologer.name}</h3>
    //         <p className="text-xs text-gray-600">{astrologer.experience}</p>
    //       </div>
    //       <div className="text-xs text-gray-600">{astrologer.languages}</div>
    //     </div>

    //     <div className="flex items-center gap-1 my-1">
    //       {[...Array(5)].map((_, i) => (
    //         <Star
    //           key={i}
    //           size={12}
    //           className={
    //             i < Math.floor(astrologer.rating)
    //               ? "fill-yellow-400 text-yellow-400"
    //               : "text-gray-300"
    //           }
    //         />
    //       ))}
    //       <span className="text-xs text-gray-600 ml-1">
    //         {astrologer.reviews}
    //       </span>
    //     </div>

    //     <div className="flex justify-between items-center mt-2">
    //       <span className="text-sm">{astrologer.price}</span>
    //       <div className="flex gap-2">
    //         <button className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
    //           Call
    //         </button>
    //         <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
    //           Chat
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      // onClick={handleCardClick}
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
        <h2 className="text-md text-black">Rishab Tiwari</h2>
        <div className="flex items-center text-sm space-x-6 justify-between w-full">
          <div className="mt-0.5 flex items-center text-[10px]">
            <img src={star} alt="start" className="w-4 h-4" />
            <span className="m-1">{astrologer.Skills.join(",")}</span>
          </div>
          <div className="mt-0 flex items-center items-end text-[10px] text-black">
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
            <div className="-mt-1 flex items-center items-end text-black">
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
  );
};

const AstroCouncellorListing = () => {
  const [astroCouncellor, setAstroCouncellor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/astroCouncelor-data`
        );
        console.log(response.data.Astrodata);
        setAstroCouncellor(response.data.Astrodata);
      } catch (error) {
        console.error("Error fetching astrologer data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="py-2 px-4 text-center mb-10">
        <h1 className="text-yellow-400 text-3xl font-semibold mb-2">
          Talk to Astrocounselor
        </h1>
        <h1 className="text-yellow-300 text-sm font-semibold">
          Find Your Perfect Astrocounselor Match
        </h1>
      </div>

      {/* Filters */}
      {/* <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex gap-4">
          <select className="border rounded px-2 py-1 text-sm">
            <option>BUDGET SNAPSHOT</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm">
            <option>₹ 0-100</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <select className="border rounded px-2 py-1 text-sm">
            <option>Sort by</option>
          </select>
          <div className="relative">
            <input
              type="search"
              placeholder="Search name..."
              className="border rounded pl-2 pr-8 py-1 text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-xs px-2 rounded">
              🔍
            </button>
          </div>
        </div>
      </div> */}

      {/* Astrologer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {astroCouncellor.map((astrologer, index) => (
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

export default AstroCouncellorListing;
