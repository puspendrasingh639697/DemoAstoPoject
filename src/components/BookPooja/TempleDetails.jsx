import React from "react";
import { useLocation } from "react-router-dom";

const TempleDetails = () => {
  const location = useLocation();
  const { filteredTempleData } = location.state || {};

  if (!filteredTempleData) {
    return (
      <div className="text-center text-gray-600 text-lg p-6">
        No temple data available.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg md:p-8 lg:p-10 mt-14">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6 md:text-5xl">
        {filteredTempleData[0].name}
      </h1>
      <img
        src={filteredTempleData[0].img}
        alt={filteredTempleData[0].name}
        className="w-full h-72 object-cover rounded-lg mb-6 sm:h-80 md:h-96"
      />
      <p className="text-gray-700 text-lg leading-relaxed mb-6 md:text-xl">
        {filteredTempleData[0].description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Location
          </h2>
          <p className="text-gray-600 text-lg">{filteredTempleData[0].place}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Significance
          </h2>
          <p className="text-gray-600 text-lg">
            {filteredTempleData[0].significance}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Famous For
          </h2>
          <p className="text-gray-600 text-lg">
            {filteredTempleData[0].famousFor}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Related Poojas
          </h2>
          <ul className="list-disc pl-6 text-gray-600 text-lg">
            {filteredTempleData[0].relatedPooja?.map((pooja, index) => (
              <li key={index}>{pooja}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex items-center space-x-6">
        <img
          src={filteredTempleData[0].pandit.image}
          alt={filteredTempleData[0].pandit.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Pandit</h2>
          <p className="text-gray-600 text-lg">
            {filteredTempleData[0].pandit.name}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sloks</h2>
        <p className="text-gray-600 text-lg italic">
          “{filteredTempleData[0].sloks}”
        </p>
      </div>
    </div>
  );
};

export default TempleDetails;
