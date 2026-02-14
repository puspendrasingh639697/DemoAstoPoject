import React, { useContext, useState, useEffect } from "react";
import { kundaliContext } from "../../context/KundaliContext";
import MainLoader from "../Loaders/MainLoader";
import { Navigate } from "react-router-dom";
import CommonChartD1 from "./KundaliCharts/CommonChartD1";
import SouthCommonChart from "./KundaliChartsSouth/SouthCommonChart";
import ChalitChart from "./KundaliCharts/ChalitChart";
import SouthChalitChart from "./KundaliChartsSouth/SouthChalitChart";
import { motion } from "framer-motion";
import KundaliSelector from "./KundaliSelector";

const chartList = [
  { label: { en: "Chalit", hi: "चलित" }, component: "ChalitChart" },
  { label: { en: "Lagna", hi: "लग्न" }, component: "CommonChartD1", props: { degreeRequired: "yes" } },
  { label: { en: "Sun", hi: "सूर्य" }, component: "CommonChartD1", props: { defaultPlanet: "Sun", degreeRequired: "yes" } },
  { label: { en: "Moon", hi: "चंद्र" }, component: "CommonChartD1", props: { defaultPlanet: "Moon", degreeRequired: "yes" } },
  { label: { en: "Hora (Wealth/Income)", hi: "होरा (धन/आय)" }, component: "CommonChartD1", props: { defaultHouse: "D2" } },
  { label: { en: "Drekkana (Siblings)", hi: "द्रेक्काण (भाई-बहन)" }, component: "CommonChartD1", props: { defaultHouse: "D3" } },
  { label: { en: "Chaturthamsa (Assets)", hi: "चतुर्थांश (संपत्ति)" }, component: "CommonChartD1", props: { defaultHouse: "D4" } },
  { label: { en: "Saptamsa (Progeny)", hi: "सप्तमांश (संतान)" }, component: "CommonChartD1", props: { defaultHouse: "D7" } },
  { label: { en: "Navamsa (Marriage)", hi: "नवांश (विवाह)" }, component: "CommonChartD1", props: { defaultHouse: "D9" } },
  { label: { en: "Dasamsa (Career)", hi: "दशमांश (करियर)" }, component: "CommonChartD1", props: { defaultHouse: "D10" } },
  { label: { en: "Dwadasamsa (Parents)", hi: "द्वादशांश (माता-पिता)" }, component: "CommonChartD1", props: { defaultHouse: "D12" } },
  { label: { en: "Shodasamsa (Travel)", hi: "षोडशांश (यात्रा)" }, component: "CommonChartD1", props: { defaultHouse: "D16" } },
  { label: { en: "Vimsamsa (Spiritual)", hi: "विंशांश (आध्यात्मिक)" }, component: "CommonChartD1", props: { defaultHouse: "D20" } },
  { label: { en: "Chaturvimsamsa (Intellect)", hi: "चतुर्विंशांश (बुद्धि)" }, component: "CommonChartD1", props: { defaultHouse: "D24" } },
  { label: { en: "Saptavimsamsa (Strength)", hi: "सप्तविंशांश (शक्ति)" }, component: "CommonChartD1", props: { defaultHouse: "D27" } },
  { label: { en: "Trimsamsa (Misfortune)", hi: "त्रिंशांश (दुर्भाग्य)" }, component: "CommonChartD1", props: { defaultHouse: "D30" } },
  { label: { en: "Khavedamsa (Auspicious)", hi: "खवेदांश (शुभता)" }, component: "CommonChartD1", props: { defaultHouse: "D40" } },
  { label: { en: "Akshavedamsa (General)", hi: "अक्षवेदांश (सामान्य)" }, component: "CommonChartD1", props: { defaultHouse: "D45" } },
  { label: { en: "Shastiamsa (Summary)", hi: "षष्ट्यांश (सारांश)" }, component: "CommonChartD1", props: { defaultHouse: "D60" } },
];


const southChartList = [
  { label: { en: "Chalit", hi: "चलित" }, component: "SouthChalitChart", props: { degreeRequired: "yes" } },
  { label: { en: "Lagna", hi: "लग्न" }, component: "SouthCommonChart", props: { degreeRequired: "yes" } },
  { label: { en: "Sun", hi: "सूर्य" }, component: "SouthCommonChart", props: { defaultPlanet: "Sun", degreeRequired: "yes" } },
  { label: { en: "Moon", hi: "चंद्र" }, component: "SouthCommonChart", props: { defaultPlanet: "Moon", degreeRequired: "yes" } },
  { label: { en: "Hora (Wealth/Income)", hi: "होरा (धन/आय)" }, component: "SouthCommonChart", props: { defaultHouse: "D2" } },
  { label: { en: "Drekkana (Siblings)", hi: "द्रेक्काण (भाई-बहन)" }, component: "SouthCommonChart", props: { defaultHouse: "D3" } },
  { label: { en: "Chaturthamsa (Assets)", hi: "चतुर्थांश (संपत्ति)" }, component: "SouthCommonChart", props: { defaultHouse: "D4" } },
  { label: { en: "Saptamsa (Progeny)", hi: "सप्तमांश (संतान)" }, component: "SouthCommonChart", props: { defaultHouse: "D7" } },
  { label: { en: "Navamsa (Marriage)", hi: "नवांश (विवाह)" }, component: "SouthCommonChart", props: { defaultHouse: "D9" } },
  { label: { en: "Dasamsa (Career)", hi: "दशमांश (करियर)" }, component: "SouthCommonChart", props: { defaultHouse: "D10" } },
  { label: { en: "Dwadasamsa (Parents)", hi: "द्वादशांश (माता-पिता)" }, component: "SouthCommonChart", props: { defaultHouse: "D12" } },
  { label: { en: "Shodasamsa (Travel)", hi: "षोडशांश (यात्रा)" }, component: "SouthCommonChart", props: { defaultHouse: "D16" } },
  { label: { en: "Vimsamsa (Spiritual)", hi: "विंशांश (आध्यात्मिक)" }, component: "SouthCommonChart", props: { defaultHouse: "D20" } },
  { label: { en: "Chaturvimsamsa (Intellect)", hi: "चतुर्विंशांश (बुद्धि)" }, component: "SouthCommonChart", props: { defaultHouse: "D24" } },
  { label: { en: "Saptavimsamsa (Strength)", hi: "सप्तविंशांश (शक्ति)" }, component: "SouthCommonChart", props: { defaultHouse: "D27" } },
  { label: { en: "Trimsamsa (Misfortune)", hi: "त्रिंशांश (दुर्भाग्य)" }, component: "SouthCommonChart", props: { defaultHouse: "D30" } },
  { label: { en: "Khavedamsa (Auspicious)", hi: "खवेदांश (शुभता)" }, component: "SouthCommonChart", props: { defaultHouse: "D40" } },
  { label: { en: "Akshavedamsa (General)", hi: "अक्षवेदांश (सामान्य)" }, component: "SouthCommonChart", props: { defaultHouse: "D45" } },
  { label: { en: "Shastiamsa (Summary)", hi: "षष्ट्यांश (सारांश)" }, component: "SouthCommonChart", props: { defaultHouse: "D60" } },
];


const Charts = () => {
  const { initialformData, chartsData, chartType, setChartType, language } = useContext(kundaliContext);
  const [selectedChart, setSelectedChart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (initialformData === "nodata") {
    return <Navigate to="/free-kundali" />;
  }

  if (!chartsData) {
    return <MainLoader loadingText={"Loading your kundali..."} />;
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

  const renderChart = ({ component, props = {} }) => {
    if (component === "ChalitChart") return <ChalitChart data={chartsData} />;
    return <CommonChartD1 data={chartsData} {...props} />;
  };

  const renderSouthChart = ({ component, props = {} }) => {
    if (component === "SouthChalitChart") return <SouthChalitChart data={chartsData} />;
    return <SouthCommonChart data={chartsData} {...props} />;
  };

  return (
    <div className="notranslate" translate="no">
      <KundaliSelector />
      <motion.div
        className="p-4 max-w-6xl mx-auto shadow-2xl rounded-lg border border-gray-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}>
        <h1 className="text-3xl font-bold text-yellow-600 ml-2 mt-2">{language === "en" ? "Charts" : "चार्ट"}</h1>
        <hr className="my-4" />
        {chartType == "north" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartList.map((chart, idx) => (
            <div
              key={idx}
              onClick={() => openModal(chart)}
              className="cursor-pointer"
            >
              <h2 className="text-sm font-semibold text-black text-center mb-2">{chart.label[language]}</h2>
              {renderChart(chart)}
            </div>
          ))}
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {southChartList.map((chart, idx) => (
            <div
              key={idx}
              onClick={() => openModal(chart)}
              className="cursor-pointer"
            >
              <h2 className="text-sm font-semibold text-black text-center mb-2">{chart.label[language]}</h2>
              {renderSouthChart(chart)}
            </div>
          ))}
        </div>}




        {/* Modal */}
        {selectedChart && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300  ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
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
                {selectedChart.label[language]}
              </h2>
              {chartType === "north" ? renderChart(selectedChart) : renderSouthChart(selectedChart)}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Charts;
