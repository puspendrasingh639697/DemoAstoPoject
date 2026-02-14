import React, { useContext, useState } from "react";
import ChalitChart from "./KundaliCharts/ChalitChart";
import { kundaliContext } from "../../context/KundaliContext";
import { Navigate } from "react-router-dom";
import MainLoader from "../Loaders/MainLoader";
import {
  PLANET_NAMES,
  kundaliSigns,
  kundaliAttributes,
  kundaliSignLord,
  kundaliStarLord,
} from "./KundaliVariables";
import { motion } from "framer-motion"; // Import framer-motion
import SouthChalitChart from "./KundaliChartsSouth/SouthChalitChart";

const KundaliPlanets = () => {
  const { initialformData, chartsData, language, chartType } =
    useContext(kundaliContext);
  const [selectedChart, setSelectedChart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [kundaliNumbers, setKundaliNumbers] = useState([]);

  if (initialformData === "nodata") {
    return <Navigate to="/free-kundali" />;
  }

  if (!chartsData) {
    return <MainLoader loadingText={"Loading your kundali..."} />;
  }
  console.log(chartsData);

  function getAttributeValue(name, lang = "en") {
    const attr = kundaliAttributes.find((obj) => obj[name]);
    return attr ? attr[name][lang] : null;
  }

  console.log(chartsData);
  let tableData = [];
  let cuspTableData = [];
  console.log(kundaliSigns);

  function convertToDMS(decimalDegree) {
    const degree = Math.floor(decimalDegree); // Floor value of degree
    const decimalMinutes = (decimalDegree - degree) * 60;
    const minute = Math.round(decimalMinutes); // Round off to nearest minute
    const secondsDecimal = (decimalMinutes - Math.floor(decimalMinutes)) * 60;
    const second = Math.round(secondsDecimal); // Final rounded seconds

    return `${degree}°${minute}′${second}′′`;
  }

  function signCalculator(degree) {
    return kundaliSigns[Math.floor(degree / 30)][language];
  }

  function signLordCalculator(degree) {
    return kundaliSignLord[Math.floor(degree / 30)][language];
  }

  function starLordCalculator(degree) {
    return kundaliStarLord[Math.floor((degree / 13.333333333) % 9)][language];
  }

  if (chartsData?.Ascendant?.D1) {
    let d1 = chartsData.Ascendant.D1;
    const nums = [];
    for (let i = 1; i <= 12; i++) {
      if (d1 > 12) d1 = 1;
      nums.push(d1);
      d1++;
    }

    function getIndexByValue(array, value) {
      return array.findIndex((element) => element === value);
    }

    const planetryPositions = [
      "Sun",
      "Moon",
      "Mars",
      "Rahu",
      "Jupiter",
      "Saturn",
      "Mercury",
      "Ketu",
      "Venus",
      "Neptune",
      "Uranus",
      "Pluto",
    ];

    for (let i = 0; i < planetryPositions.length; i++) {
      tableData.push({
        planet: getAttributeValue(planetryPositions[i], language),
        cusp: `${
          getIndexByValue(nums, chartsData?.[planetryPositions[i]]?.D1) + 1
        }`,
        sign: `${
          kundaliSigns[chartsData?.[planetryPositions[i]]?.D1 - 1][language]
        }`,
        signLord: `${chartsData?.[planetryPositions[i]]?.Sign_Lord[language]}`,
        starLord: `${chartsData?.[planetryPositions[i]]?.Nakshatra[language]}`,
        subLord: `${chartsData?.[planetryPositions[i]]?.KP_Sub[language]}`,
      });
    }

    for (let i = 0; i < 12; i++) {
      console.log(chartsData?.Ascendant?.D1)
      cuspTableData.push({
        cusp: `${i + 1}`,
        degree: convertToDMS(chartsData?.global?.Global?.F2[i]),
        sign: signCalculator(chartsData?.global?.Global?.F2[i]),
        signLord: signLordCalculator(chartsData?.global?.Global?.F2[i]),
        starLord: starLordCalculator(chartsData?.global?.Global?.F2[i]),
        subLord: chartsData?.F2_SubStar?.F2_Sub[i][language]
      });
    }
  }

  function getRulingPlanet(birthData) {
    const year = parseInt(birthData.birthYear);
    const month = parseInt(birthData.birthMonth) - 1;
    const day = parseInt(birthData.birthDay);
    const hour = parseInt(birthData.birthHour);
    const minute = parseInt(birthData.birthMinute);
    const second = parseInt(birthData.birthSecond);

    // Create a UTC date
    const birthDate = new Date(
      Date.UTC(year, month, day, hour, minute, second)
    );

    // Get day of week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = birthDate.getUTCDay();

    const planetMap = {
      0: { en: "Sun", hi: "सूर्य" }, // Sunday
      1: { en: "Moon", hi: "चंद्रमा" }, // Monday
      2: { en: "Mars", hi: "मंगल" }, // Tuesday
      3: { en: "Mercury", hi: "बुध" }, // Wednesday
      4: { en: "Jupiter", hi: "गुरु" }, // Thursday
      5: { en: "Venus", hi: "शुक्र" }, // Friday
      6: { en: "Saturn", hi: "शनि" }, // Saturday
    };

    // Return the ruling planet in both English and Hindi
    return planetMap[dayOfWeek];
  }

  const openModal = (chart) => {
    setSelectedChart(chart);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedChart(null);
    setTimeout(() => setSelectedChart(null), 200); // delay to allow animation
  };

  return (
    <div className="max-w-6xl mx-auto rounded-lg notranslate" translate="no">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Section */}
        <motion.div
          className="flex flex-col md:flex-row gap-8 shadow-2xl p-6 rounded-lg border border-gray-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }} // Ensures this animation only happens once
        >
          <div className="">
            <div
              className="flex justify-center flex-col gap-2 cursor-pointer"
              onClick={() => openModal("lagna")}
            >
              {language == "hi" ? (
                <h1 className="text-2xl text-yellow-600 font-bold">
                  भाव चलित चार्ट
                </h1>
              ) : (
                <h1 className="text-2xl text-yellow-600 font-bold">
                  Bhav Chalit Chart
                </h1>
              )}
              {chartType == "north" ? (
                <ChalitChart data={chartsData} />
              ) : (
                <SouthChalitChart data={chartsData} />
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white ">
            {language == "hi" ? (
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">
                शासक ग्रह
              </h2>
            ) : (
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">
                Ruling Planets
              </h2>
            )}
            <table className="w-full text-sm text-center">
              <thead>
                {language == "hi" ? (
                  <tr className="bg-yellow-100 text-yellow-800">
                    <th className="py-2">ग्रह</th>
                    <th className="py-2">राशि स्वामी</th>
                    <th className="py-2">तारा स्वामी</th>
                    <th className="py-2">उप स्वामी</th>
                  </tr>
                ) : (
                  <tr className="bg-yellow-100 text-yellow-800">
                    <th className="py-2">Planet</th>
                    <th className="py-2">Sign Lord</th>
                    <th className="py-2">Star Lord</th>
                    <th className="py-2">Sub Lord</th>
                  </tr>
                )}
              </thead>
              <tbody className="text-gray-700">
                <tr className="hover:bg-yellow-50 transition">
                  {language == "hi" ? (
                    <td className="py-2 font-semibold">चंद्रमा</td>
                  ) : (
                    <td className="py-2 font-semibold">Moon</td>
                  )}
                  <td>{chartsData?.Moon?.Sign_Lord[language]}</td>
                  <td>{chartsData?.Moon?.Nakshatra[language]}</td>
                  <td>{chartsData?.Moon?.KP_Sub[language]}</td>
                </tr>
                <tr className="hover:bg-yellow-50 transition">
                  {language == "hi" ? (
                    <td className="py-2 font-semibold">लग्न</td>
                  ) : (
                    <td className="py-2 font-semibold">Asc</td>
                  )}
                  <td>{chartsData?.Ascendant?.Sign_Lord[language]}</td>
                  <td>{chartsData?.Ascendant?.Nakshatra[language]}</td>
                  <td>{chartsData?.Ascendant?.KP_Sub[language]}</td>
                </tr>
                <tr className="bg-yellow-50 font-medium text-yellow-600">
                  {language == "hi" ? (
                    <td className="py-2">विरेश</td>
                  ) : (
                    <td className="py-2">Day Lord</td>
                  )}

                  <td colSpan="3">
                    {getRulingPlanet(initialformData)[language]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Planet Table */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-2xl border border-gray-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {language == "hi" ? (
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">
              ग्रहों की स्थिति
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">
              Planetary Positions
            </h2>
          )}
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm text-center border-separate border-spacing-y-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <thead className="bg-yellow-100 text-yellow-800 rounded">
                {language == "hi" ? (
                  <tr>
                    <th className="py-2 px-3">ग्रह</th>
                    <th className="py-2 px-3">कुंडली</th>
                    <th className="py-2 px-3">राशि</th>
                    <th className="py-2 px-3">राशि स्वामी</th>
                    <th className="py-2 px-3">तारा स्वामी</th>
                    <th className="py-2 px-3">उप स्वामी</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="py-2 px-3">Planet</th>
                    <th className="py-2 px-3">Cusp</th>
                    <th className="py-2 px-3">Sign</th>
                    <th className="py-2 px-3">Sign Lord</th>
                    <th className="py-2 px-3">Star Lord</th>
                    <th className="py-2 px-3">Sub Lord</th>
                  </tr>
                )}
              </thead>
              <tbody className="text-gray-700">
                {tableData?.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-yellow-50 transition-all duration-200 shadow-sm rounded"
                  >
                    <td className="py-2 px-3">{row.planet}</td>
                    <td className="py-2 px-3">{row.cusp}</td>
                    <td className="py-2 px-3">{row.sign}</td>
                    <td className="py-2 px-3">{row.signLord}</td>
                    <td className="py-2 px-3">{row.starLord}</td>
                    <td className="py-2 px-3">{row.subLord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Cusps */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-2xl border border-gray-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {language == "hi" ? (
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">भावेश</h2>
          ) : (
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">Cusps</h2>
          )}
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm text-center border-separate border-spacing-y-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <thead className="bg-yellow-100 text-yellow-800 rounded">
                {language == "hi" ? (
                  <tr>
                    <th className="py-2 px-3">कुंडली</th>
                    <th className="py-2 px-3">डिग्री</th>
                    <th className="py-2 px-3">राशि</th>
                    <th className="py-2 px-3">राशि स्वामी</th>
                    <th className="py-2 px-3">तारा स्वामी</th>
                    <th className="py-2 px-3">उप स्वामी</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="py-2 px-3">Cusp</th>
                    <th className="py-2 px-3">Degree</th>
                    <th className="py-2 px-3">Sign</th>
                    <th className="py-2 px-3">Sign Lord</th>
                    <th className="py-2 px-3">Star Lord</th>
                    <th className="py-2 px-3">Sub Lord</th>
                  </tr>
                )}
              </thead>
              <tbody className="text-gray-700">
                {cuspTableData?.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-yellow-50 transition-all duration-200 shadow-sm rounded"
                  >
                    <td className="py-2 px-3">{row.cusp}</td>
                    <td className="py-2 px-3">{row.degree}</td>
                    <td className="py-2 px-3">{row.sign}</td>
                    <td className="py-2 px-3">{row.signLord}</td>
                    <td className="py-2 px-3">{row.starLord}</td>
                    <td className="py-2 px-3">{row.subLord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {selectedChart && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300  ${
            showModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className={`relative bg-white rounded-lg shadow-lg p-6 max-w-4xl w-fit mx-5 my-5 transform transition-all duration-200 max-h-[calc(100lvh-40px)] overflow-y-auto scale-in-center`}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-yellow-700">
              Bhav Chalit Chart
            </h2>
            <div className="flex justify-center items-center">
              {chartType == "north" ? (
                <ChalitChart data={chartsData} />
              ) : (
                <SouthChalitChart data={chartsData} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KundaliPlanets;
