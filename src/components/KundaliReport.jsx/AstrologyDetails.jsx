import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { kundaliContext } from "../../context/KundaliContext";
import MainLoader from "../Loaders/MainLoader";
import Sanscript from '@indic-transliteration/sanscript';
import { avakhadaAttributes } from "./KundaliVariables";
import { motion } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4
    }
  })
};

const AstrologyDetails = () => {
  const { kundaliData, chartsData, initialformData, language } = useContext(kundaliContext);

  if (initialformData === "nodata") {
    return <Navigate to="/free-kundali" />;
  }

  if (!kundaliData) {
    return <MainLoader loadingText={"Loading your kundali..."} />;
  }

  function getAttributeValue(name, lang = 'en') {
    const attr = avakhadaAttributes.find(obj => obj[name]);
    return attr ? attr[name][lang] : null;
  }

  const convertToAMPM = (time24) => {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute} ${ampm}`;
  };

  const basicDetails = [
    [getAttributeValue("Name", language), `${initialformData.fullname}`],
    [getAttributeValue("Date", language), `${initialformData.birthYear}-${initialformData.birthMonth}-${initialformData.birthDay}`],
    [getAttributeValue("Time", language), convertToAMPM(`${String(initialformData.birthHour).padStart(2, "0")}:${String(initialformData.birthMinute).padStart(2, "0")}:${String(initialformData.birthSecond).padStart(2, "0")}`)],
    [getAttributeValue("Address", language), `${initialformData.address}`],
    [getAttributeValue("Latitude", language), `${Number(initialformData.lat)}`],
    [getAttributeValue("Longitude", language), `${Number(initialformData.lng)}`],
    [getAttributeValue("Ayanamsha", language), `${chartsData.global.Global.Ayanamsha}`],
  ];

  const panchangDetails = [
    [getAttributeValue("Tithi", language), `${kundaliData?.Tithi[language]}`],
    [getAttributeValue("Karan", language), `${kundaliData?.Karan[language]}`],
    [getAttributeValue("Time", language), convertToAMPM(`${String(initialformData.birthHour).padStart(2, "0")}:${String(initialformData.birthMinute).padStart(2, "0")}:${String(initialformData.birthSecond).padStart(2, "0")}`)],
    [getAttributeValue("Yog", language), `${kundaliData?.Yog[language]}`],
    [getAttributeValue("Nakshatra", language), `${kundaliData?.Nakshatra[language]}`],
  ];

  const renderTable = (title, data) => (
    <motion.div
      className="rounded-xl shadow-lg p-6 space-y-4 bg-white border border-gray-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-yellow-600 border-b border-gray-200 pb-2 ">{title}</h3>
      <table className="w-full text-sm text-gray-700">
        <tbody>
          {data.map(([label, value], index) => (
            <motion.tr
              key={label}
              className=""
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <td className="py-2 font-medium text-gray-800">{label}</td>
              <td className="py-2 pl-2 text-gray-600 notranslate" translate="no">{value}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );

  return (
    <motion.div
      className="bg-gradient-to-tr via-white to-yellow-100 min-h-screen notranslate"
      translate="no"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderTable(getAttributeValue("BasicDetails", language), basicDetails)}
          {renderTable(getAttributeValue("PanchangDetails", language), panchangDetails)}
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-300"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-semibold text-yellow-600 border-b border-gray-200 pb-2 mb-4">{getAttributeValue("AvakhadaDetails", language)}</h3>
          <table className="w-full text-sm text-gray-700">
            <tbody>
              {Object.entries(kundaliData).map(([label, value], index) => (
                <motion.tr
                  key={label}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <td className="py-2 font-medium capitalize text-gray-800">{getAttributeValue(label, language)}</td>
                  <td className="py-2 text-gray-600">
                    {typeof value === "object" && value[language] ? value[language] : value}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AstrologyDetails;
