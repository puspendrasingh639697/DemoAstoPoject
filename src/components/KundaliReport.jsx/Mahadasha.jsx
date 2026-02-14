import { ArrowRightIcon } from "lucide-react";
import React, { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { kundaliContext } from "../../context/KundaliContext";
import { kundaliAttributes } from "./KundaliVariables";

const Mahadasha = ({ data }) => {
  const { setAntardasha,language } = useContext(kundaliContext);
  const PLANET_NAMES = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  let mahadasha = [];
  data.Mahadasha.MahadashaPlanet.map((planet, index) => {
    if (index == 0) {
      mahadasha.push({ planet: PLANET_NAMES[planet], startDate: "Birth", endDate: data.Mahadasha.MahadashaDate[index] });
    } else {
      mahadasha.push({ planet: PLANET_NAMES[planet], startDate: data.Mahadasha.MahadashaDate[index - 1], endDate: data.Mahadasha.MahadashaDate[index] });
    }
  })
  function getAttributeValue(name, lang = 'en') {
    const attr = kundaliAttributes.find(obj => obj[name]);
    return attr ? attr[name][lang] : null;
  }

  return (
    <div className="p-4 md:p-8 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{getAttributeValue('MahadashaPeriods', language)}</h2>

      <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-gray-200">
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
            {mahadasha.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-yellow-50 transition duration-200 cursor-pointer"
                onClick={() => {
                      setAntardasha({ index, ...item });
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
        {mahadasha.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border cursor-pointer border-gray-200 p-4 shadow-sm bg-white hover:bg-yellow-50 hover:shadow-md transition"
             onClick={() => {
                  setAntardasha({ index, ...item });
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

export default Mahadasha;
