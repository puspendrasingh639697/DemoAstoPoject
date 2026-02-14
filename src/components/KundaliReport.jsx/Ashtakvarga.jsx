import React, { useContext, useEffect, useState } from "react";
import AshtakvargaChart from "./KundaliCharts/AshtakvargaChart";
import { kundaliContext } from "../../context/KundaliContext";
import { Navigate } from "react-router-dom";
import MainLoader from "../Loaders/MainLoader";
import { motion } from "framer-motion";

const Ashtakvarga = () => {
  const { chartsData, initialformData, language } = useContext(kundaliContext);
  const [selectedChart, setSelectedChart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (chart) => {
    setSelectedChart(chart);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedChart(null);
    setShowModal(false);
    setTimeout(() => setSelectedChart(null), 200); // Allow animation to finish
  };

  if (initialformData === "nodata") {
    return <Navigate to="/free-kundali" />;
  }

  if (!chartsData) {
    return <MainLoader />;
  }

  const chartMap = [
    { key: "sarvaashtakVarga", label: { en: "Sarva", hi: "सर्व" } },
    { key: "prastaarak_Jupiter", label: { en: "Jupiter", hi: "गुरु" } },
    { key: "prastaarak_Lagna", label: { en: "Ascendent", hi: "लग्न" } },
    { key: "prastaarak_Mars", label: { en: "Mars", hi: "मंगल" } },
    { key: "prastaarak_Mercury", label: { en: "Mercury", hi: "बुध" } },
    { key: "prastaarak_Moon", label: { en: "Moon", hi: "चंद्र" } },
    { key: "prastaarak_Rahu", label: { en: "Rahu", hi: "राहु" } },
    { key: "prastaarak_Saturn", label: { en: "Saturn", hi: "शनि" } },
    { key: "prastaarak_Sun", label: { en: "Sun", hi: "सूर्य" } },
    { key: "prastaarak_Venus", label: { en: "Venus", hi: "शुक्र" } },
  ];

  const ashtakvargaDescription = {
    en: `Ashtakvarga is used to assess the strength and patterns in a birth chart.
It provides a numerical score for each planet based on its placement with respect to others and the Lagna.
The Sarva Ashtakavarga represents the combined strength.`,

    hi: `अष्टकवर्ग का उपयोग जन्म कुंडली में ग्रहों की शक्ति और पैटर्न का आकलन करने के लिए किया जाता है।
यह प्रत्येक ग्रह के लिए अन्य ग्रहों और लग्न के सापेक्ष स्थिति के आधार पर संख्यात्मक स्कोर प्रदान करता है।
सर्व अष्टकवर्ग सम्मिलित शक्ति को दर्शाता है।`,
  };



  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-8 rounded-lg shadow-xl border border-gray-300 notranslate"
      translate="no"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">{language === "en" ? "Ashtakvarga" : "अष्टकवर्ग"}</h1>
        <hr className="my-4" />
        <p className="text-gray-600 mt-2 leading-relaxed">
          {ashtakvargaDescription[language]} {/* where language is 'en' or 'hi' */}
        </p>

      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit">
        {chartMap.map(({ key, label }) => (
          <div
            key={key}
            onClick={() => openModal({ key, label })}
          >
            <h2 className="text-sm font-medium text-gray-700 mb-2 ">{label[language]}</h2>
            <div className="bg-white shadow rounded-sm   p-2 border border-gray-100 hover:shadow-xl transition w-full object-contain cursor-pointer">
              <AshtakvargaChart data={chartsData} dataKey={key} />
            </div>
          </div>
        ))}
      </section>
      {/* pop up */}
      {selectedChart && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            className={`relative bg-white rounded-lg shadow-lg pt-2 pb-5 px-5 max-w-3xl mx-5 my-5 w-fit transform transition-all max-h-[calc(100lvh-40px)] overflow-auto duration-200 scale-in-center`}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-yellow-700">
              {selectedChart.label[language]}
            </h2>
            <div className="bg-white shadow rounded-sm  border border-gray-100 transition w-fit object-contain ">
              <AshtakvargaChart
                data={chartsData}
                dataKey={selectedChart.key}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Ashtakvarga;
