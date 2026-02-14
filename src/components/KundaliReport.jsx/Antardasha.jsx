import { ArrowRightIcon } from "lucide-react";
import React, { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { kundaliContext } from "../../context/KundaliContext";
import { kundaliAttributes } from "./KundaliVariables";

const Antardasha = ({ data }) => {
  const { antardasha, setPratyantardasha, language } = useContext(kundaliContext);
  const PLANET_NAMES = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  let antardashaData = [];
 if(antardasha){
   data.Mahadasha.AntarDashaPlanet[antardasha.index].map((item, index) => {
    var planetName = "";
    if (item === data.Mahadasha.AntarDashaPlanet[antardasha.index][index + 1]) {
      planetName = `${antardasha.planet.slice(0, 2).toUpperCase()}---`;
    } else {
      planetName = `${antardasha.planet.slice(0, 2).toUpperCase()}-${PLANET_NAMES[item].slice(0, 2).toUpperCase()}`;
    }


    if (index === 0) {
      antardashaData.push({
        mahadashaPlanet: antardasha.planet,
        antardashaPlanet: PLANET_NAMES[item],
        planet: planetName,
        startDate: antardasha.startDate,
        endDate: data.Mahadasha.AntarDashaDates[antardasha.index][index]
      });
    } else {
      antardashaData.push({
        mahadashaPlanet: antardasha.planet,
        antardashaPlanet: PLANET_NAMES[item],
        planet: planetName,
        startDate: data.Mahadasha.AntarDashaDates[antardasha.index][index - 1],
        endDate: data.Mahadasha.AntarDashaDates[antardasha.index][index]
      });
    }
  });
 }
  function getAttributeValue(name, lang = 'en') {
    const attr = kundaliAttributes.find(obj => obj[name]);
    return attr ? attr[name][lang] : null;
  }
  const skeletonRows = Array.from({ length: 9 });

  if(!antardasha){
    return <div className="p-4 md:p-8 bg-white animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-yellow-100 text-yellow-700 uppercase text-xs font-bold">
            <tr>
              <th className="text-left px-6 py-4">Planet</th>
              <th className="text-left px-6 py-4">Start Date</th>
              <th className="text-left px-6 py-4">End Date</th>
              <th className="text-center px-6 py-4">Next</th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </td>
                <td className="text-center px-6 py-4">
                  <div className="h-6 w-4 mx-auto bg-gray-200 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="md:hidden space-y-4">
        {skeletonRows.map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-4 bg-gray-200 rounded-full" />
            </div>
            <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  }

  return (
    <div className="p-4 md:p-8 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{getAttributeValue('AntardashaPeriods', language)}</h2>
      <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-yellow-100 text-yellow-700 uppercase text-xs ont-bold">
            <tr>
              <th className="text-left px-6 py-4">{getAttributeValue('Planet', language)}</th>
              <th className="text-left px-6 py-4">{getAttributeValue('StartDate', language)}</th>
              <th className="text-left px-6 py-4">{getAttributeValue('EndDate', language)}</th>
              <th className="text-center px-6 py-4">{getAttributeValue('Next', language)}</th>
            </tr>
          </thead>
          <tbody>
            {antardashaData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-yellow-50 transition duration-200 cursor-pointer"
                onClick={() => {
                  setPratyantardasha({ index, ...item });
                }}
              >
                <td className="px-6 py-4">{item.planet}</td>
                <td className="px-6 py-4">{item.startDate}</td>
                <td className="px-6 py-4">{item.endDate}</td>
                <td className="text-center px-6 py-4">
                  <button
                    className="text-yellow-500 hover:text-yellow-600 text-lg font-medium"
                    aria-label={`Next for ${item.planet}`}

                  >
                    <IoIosArrowForward />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-4">
        {antardashaData.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border cursor-pointer border-gray-200 p-4 shadow-sm bg-white hover:bg-yellow-50 hover:shadow-md transition"
            onClick={() => {
              setPratyantardasha({ index, ...item });
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{item.planet}</h3>
              <button
                className="text-yellow-500 hover:text-yellow-600 text-xl"
                aria-label={`Next for ${item.planet}`}

              >
                <IoIosArrowForward />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Start:</span> {item.startDate}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">End:</span> {item.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Antardasha;
