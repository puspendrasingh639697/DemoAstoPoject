import React, { useContext, useEffect, useState } from "react";
import KundliChart from "./KundaliChart";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import Mahadasha from "./Mahadasha";
import Antardasha from "./Antardasha";
import Pratyantardasha from "./Pratyantardasha";
import { kundaliContext } from "../../context/KundaliContext";
import MainLoader from "../Loaders/MainLoader";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Lagana from "./KundaliCharts/Lagana";
import Navasama from "./KundaliCharts/Navasama";
import { kundaliAttributes } from "./KundaliVariables";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion
import SouthLagna from "./KundaliChartsSouth/SouthLagna";
import SouthNavsama from "./KundaliChartsSouth/SouthNavsama";
import KundaliSelector from "./KundaliSelector";

const Kundali = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { chartsData, language, initialformData, antardasha, pratyantardasha, setAntardasha, setPratyantardasha, chartType, setChartType } = useContext(kundaliContext);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const steps = [getAttributeValue("Mahadasha", language), getAttributeValue("Antardasha", language), getAttributeValue("PratyantarDasha", language)];

  useEffect(() => {
    if (antardasha && pratyantardasha) {
      setActiveStep(2);
    } else if (antardasha) {
      setActiveStep(1);
    }
  }, [antardasha, pratyantardasha]);

  if (initialformData === "nodata") {
    return <Navigate to="/free-kundali" />;
  }

  if (!chartsData) {
    return <MainLoader loadingText={"Loading your kundali..."} />;
  }

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    if (step === 1 && antardasha) {
      setActiveStep(1);
      setPratyantardasha(null);
    } else if (step === 0) {
      setActiveStep(0);
      setAntardasha(null);
      setPratyantardasha(null);
    }
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0: return <Mahadasha data={chartsData} />;
      case 1: return antardasha ? <Antardasha data={chartsData} /> : null;
      case 2: return pratyantardasha ? <Pratyantardasha data={chartsData} /> : null;
      default: return null;
    }
  };

  const PLANET_NAMES = [
    "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn",
    "Rahu", "Ketu", "Ascendant", "Lagna", "Uranus", "Pluto", "Neptune"
  ];

  const planetData = Object.entries(chartsData)
    .filter(([key]) => PLANET_NAMES.includes(key))
    .map(([planet, info]) => ({
      planet,
      sign: info.Sign[language] || '--',
      signLord: info.Sign_Lord[language] || '--',
      nakshatra: info.Nakshatra[language] || '--',
      nakshLord: info.Naksh_Lord || '--',
      degree: `${info.Degree.degree}°${info.Degree.minutes}′${info.Degree.seconds}″`,
      retro: info.Retrograde === "N/A" ? "Direct" : info.Retrograde,
      combust: info.Combust === "N/A" ? "No" : "Yes",
      avastha: info.Avastha === "N/A" ? "--" : info.Avastha,
      house: info.House || '--',
      status: info.Status === "N/A" ? "--" : info.Status[language],
    }));

  const openModal = (chart) => {
    setSelectedChart(chart);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedChart(null);
    setTimeout(() => setSelectedChart(null), 200);
  };

  function getAttributeValue(name, lang = 'en') {
    const attr = kundaliAttributes.find(obj => obj[name]);
    return attr ? attr[name][lang] : null;
  }
  console.log(chartType)

  function handleLevelUp() {
    if (activeStep == 2) {
      setActiveStep(1);
      setPratyantardasha(null);
    } else if (activeStep == 1) {
      setActiveStep(0);
      setAntardasha(null);
      setPratyantardasha(null);
    }

  }

  return (
    <div className="bg-gradient-to-br min-h-screen notranslate" translate="no">
      <KundaliSelector />
      {/* Kundali Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10 border border-gray-300"
      >
        <h1 className="text-3xl font-bold text-yellow-600">{getAttributeValue("KundaliChart", language)}</h1>
        <div className="flex justify-start gap-10 flex-wrap my-6">
          <div className="flex items-center justify-center flex-col gap-2 cursor-pointer" onClick={() => openModal("lagna")}>
            <h1 className="text-xl font-semibold text-black">{getAttributeValue("LagnaAscendantBasicBirthChart", language)}</h1>
            {chartType == "north" ? <Lagana data={chartsData} /> : <SouthLagna data={chartsData} />}
          </div>
          <div className="flex items-center justify-center flex-col gap-2 cursor-pointer" onClick={() => openModal("navaSama")}>
            <h1 className="text-xl font-semibold text-black">{getAttributeValue("Navasama", language)}</h1>
            {chartType == "north" ? <Navasama data={chartsData} /> : <SouthNavsama data={chartsData} />}
          </div>
        </div>
      </motion.div>

      {/* Planet Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10 border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">{getAttributeValue("PlanetaryPositions", language)}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-yellow-100 text-yellow-700 text-sm">
              <tr>
                {(language === 'en' ?
                  ["Planet", "Sign", "Sign Lord", "Nakshatra", "Naksh. Lord", "Degree", "Retro(R)", "Combust", "Avastha", "House", "Status"]
                  :
                  ["ग्रह", "राशि", "राशि स्वामी", "नक्षत्र", "नक्षत्र स्वामी", "अंश (डिग्री)", "वक्री (R)", "अस्त", "अवस्था", "भाव", "स्थिति"]
                ).map((title, index) => (
                  <th key={index} className="px-4 py-3 text-left">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {planetData.map((item, idx) => (
                <tr key={idx} className="hover:bg-yellow-50 border-t transition-all">
                  <td className="px-4 py-2">{getAttributeValue(item.planet, language)}</td>
                  <td className="px-4 py-2">{item.sign}</td>
                  <td className="px-4 py-2">{item.signLord}</td>
                  <td className="px-4 py-2">{item.nakshatra}</td>
                  <td className="px-4 py-2">{getAttributeValue(item.nakshLord, language)}</td>
                  <td className="px-4 py-2">{item.degree}</td>
                  <td className="px-4 py-2">{getAttributeValue(item.retro, language)}</td>
                  <td className="px-4 py-2">{getAttributeValue(item.combust, language)}</td>
                  <td className="px-4 py-2">{item.avastha}</td>
                  <td className="px-4 py-2">{item.house}</td>
                  <td className="px-4 py-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Stepper Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">{getAttributeValue("VimshottariDasha", language)}</h2>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            orientation={isSmallScreen ? "vertical" : "horizontal"}
            alternativeLabel={!isSmallScreen}
            sx={{
              "& .MuiStepIcon-root.Mui-active": { color: "#FACC15" },
              "& .MuiStepIcon-root.Mui-completed": { color: "#FACC15" },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton
                  onClick={handleStep(index)}
                  sx={{
                    "& .MuiStepLabel-label": {
                      color: activeStep === index ? "#F59E0B" : "inherit",
                      fontSize: "1rem",
                      fontWeight: "600",
                      textAlign: isSmallScreen ? "left" : "center",
                    },
                    "& .MuiStepIcon-root": {
                      color: activeStep === index ? "#FBBF24" : "inherit",
                    },
                  }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

         
          <div className="mt-6 border rounded-lg shadow-inner overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                {renderStepContent(activeStep)}
              </motion.div>
            </AnimatePresence>
          </div>

 {activeStep > 0 ? <div className="flex items-center justify-center py-2">
            <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg mt-4" onClick={() => { handleLevelUp() }}>
              Level Up
            </button>
          </div> : ""}
        </Box>
      </motion.div>

      {/* Modal for Charts */}
      {selectedChart && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={closeModal} />
          <div className={`relative bg-white rounded-lg shadow-lg p-6 max-w-4xl w-fit mx-5 my-5 transform transition-all duration-200 max-h-[calc(100lvh-40px)] overflow-y-auto scale-in-center`}>
            <button onClick={closeModal} className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl">
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-yellow-700">
              {selectedChart === "lagna" ? "Lagna Chart Preview" : "Navamsa Chart Preview"}
            </h2>
            <div className="flex justify-center items-center">
              {chartType == "north" ? selectedChart === "lagna" ? <Lagana data={chartsData} /> : <Navasama data={chartsData} /> : ""}
              {chartType == "south" ? selectedChart === "lagna" ? <SouthLagna data={chartsData} /> : <SouthNavsama data={chartsData} /> : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kundali;
