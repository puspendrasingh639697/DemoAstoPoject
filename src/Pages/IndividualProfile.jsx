import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppStore from "../assets/image/AppleStore.webp";
import PlayStore from "../assets/image/Playstore.webp";
import Poster from '../assets/image/Popuppostor.png';

const AstrologerProfile = () => {
  const location = useLocation();
  const astrologer = location.state?.astrologer;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="container mx-auto p-6 pt-20 mt-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        {/* Profile Image */}
        <img
          src={astrologer.image}
          alt="Astrologer"
          className="w-36 h-36 rounded-full shadow-lg"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{astrologer.firstName}</h1>
          <p className="text-gray-600">Title: {astrologer.Skills}</p>
          <p className="text-gray-600">Language: {astrologer.languages}</p>
          <p className="text-gray-600">Rating: ⭐⭐⭐⭐⭐</p>
          <p className="text-yellow-600 font-semibold text-lg">
            ₹{astrologer.talkPrice}/min
          </p>
        </div>

        {/* Call Button */}
        <button
          onClick={togglePopup}
          className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all"
        >
          Call Now
        </button>
      </div>

      {/* About Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-yellow-600">About Rishabh</h2>
        <ul className="list-disc pl-5 mt-4 text-gray-700">
          <li>CA Inter (Group I)</li>
          <li>Member of the Indian Council for Astrological Sciences</li>
          <li>Expert in Vedic Astrology (Parashara method)</li>
          <li>
            Practices Prashnam, Jaimini System of Astrology, Muhurtha Fixing,
            Numerology, Horoscope Matching, and Medical Astrology
          </li>
        </ul>
      </div>

      {/* Ratings and Reviews Section */}
      <div className="mt-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {/* Ratings */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800">Rating & Reviews</h2>
          <div className="flex items-center mt-4">
            <p className="text-3xl font-bold">4.83</p>
            <span className="text-sm text-gray-600 ml-2">
              based on 5 reviews
            </span>
          </div>
          <div className="mt-4">
            {[5, 4, 3, 2, 1].map((star) => (
              <div className="flex items-center space-x-2" key={star}>
                <p>{star}</p>
                <div className="flex-1 bg-gray-200 h-2 rounded">
                  <div
                    className="bg-yellow-500 h-full rounded"
                    style={{ width: `${star * 20}%` }}
                  ></div>
                </div>
                <p>{star * 2}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Consultants */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800">
            Check Similar Consultants
          </h2>
          <ul className="space-y-4 mt-4">
            {["Dixon", "Maverick", "Veronica"].map((consultant) => (
              <li
                key={consultant}
                className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold">{consultant}</p>
                <p className="text-sm text-gray-600">
                  Amazing advice and clear guidance!
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
       <div
       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
       onClick={togglePopup}
     >
       <div
         className=" w-auto px-20 py-10 rounded-md  relative"
         style={{
           backgroundImage: `url(${Poster})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundRepeat: "no-repeat",
         
         
         }}
         onClick={(e) => e.stopPropagation()}
       >
         <button
           onClick={togglePopup}
           className="absolute top-2 bg-white rounded-full p-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
         >
           ✖
         </button>
     
         <div className="flex justify-start space-x-9 mt-96">
           <button className="bg-black text-white border-2 border-white py-3 px-6 rounded-md flex items-center text-sm hover:bg-gray-800 transition duration-300 ease-in-out">
             <img className="h-4 mr-2" src={PlayStore} alt="Play Store" />
             Playstore
           </button>
           <button className="bg-black text-white rounded-md border-2 border-white py-3 px-6 flex items-center text-sm hover:bg-gray-800 transition duration-300 ease-in-out">
             <img className="h-4 mr-2" src={AppStore} alt="App Store" />
             Appstore
           </button>
         </div>
       </div>
     </div>
     
      )}
    </div>
  );
};

export default AstrologerProfile;
