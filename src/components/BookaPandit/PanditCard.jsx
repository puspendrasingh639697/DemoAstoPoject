import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Star from "../../assets/BookPandit/star.png";
import BookIcon from "../../assets/BookPandit/BookIcon.png";
import skills from "../../assets/BookPandit/skills.png";
import exp from "../../assets/BookPandit/exp.png";
import languages from "../../assets/BookPandit/languages.png";

import { astroContext } from "../../context/astroContext";

const PanditCard = ({ pandit }) => {
  const navigate = useNavigate();
  const { setBookingData } = useContext(astroContext);

  const handleSelectPandit = (pandit) => {
    setBookingData((prev) => ({
      ...prev,
      PanditId: pandit?.pandit?._id,
    }));
    setTimeout(() => {
      navigate(`/pandit-profile/${pandit?.pandit?.slug}`);
    }, 100);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden p-4 space-y-4 md:space-y-0 md:space-x-6">
      {/* Left: Image */}
      <div className="flex-shrink-0 flex justify-center items-center">
        <img
          src={pandit?.pandit?.image?.imageurl}
          alt="Pandit"
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-2 border-sky-500"
        />
      </div>

      {/* Center: Info */}
      <div className="flex flex-col justify-between flex-1 space-y-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {pandit?.pandit?.name}
          </h2>

          {/* Skills */}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <img src={skills} alt="skills" className="w-4 h-4" />
            <p>{pandit?.pandit?.Skills?.join(", ")}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, idx) => (
              <img key={idx} src={Star} alt="star" className="w-4 h-4" />
            ))}
            <p className="text-sm italic text-gray-600 ml-1">4.0</p>
          </div>
        </div>

        {/* Slots */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Slots:</p>
          <div className="flex flex-wrap gap-2">
            {pandit?.matchedSlots?.length > 0 ||
            pandit?.nonMatchedSlots?.length > 0 ? (
              [...pandit.matchedSlots, ...pandit.nonMatchedSlots]
                .slice(0, 2)
                .map((slot) => (
                  <span
                    key={slot._id}
                    className="border border-yellow-500 text-sm text-gray-800 rounded-full px-3 py-1"
                  >
                    {slot.from} - {slot.to}
                  </span>
                ))
            ) : (
              <span className="text-sm text-gray-400">No slots available</span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Experience, Languages, and Button */}
      <div className="flex flex-col justify-between items-start md:items-end space-y-3 w-full md:w-1/4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <img src={exp} alt="experience" className="w-4 h-4" />
            <p>{pandit?.pandit?.experience}+ years</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <img src={languages} alt="languages" className="w-4 h-4" />
            <p>{pandit?.pandit?.languages?.join(", ")}</p>
          </div>
        </div>

        <button
          className="bg-sky-600 hover:bg-sky-700 transition text-white rounded-full font-semibold flex items-center gap-2 px-4 py-2"
          onClick={() => handleSelectPandit(pandit)}
        >
          <img src={BookIcon} alt="book" className="w-4 h-4" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};

export default PanditCard;
