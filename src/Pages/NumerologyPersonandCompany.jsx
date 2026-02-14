"use client";

import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { NumerologyContext } from "../context/NumerologyContext";

const dataLabels = {
  personInitial: "Person Initial Score",
  companyInitial: "Company Initial Score",
  personFull: "Person Full Name Score",
  companyFull: "Company Full Name Score",
  personRadical: "Person Radical Score",
  personLucky: "Person Lucky Score",
  result_INL_Name: "Initial Name Compatibility",
  result_Full_Name: "Full Name Compatibility",
  result_INL_CompFull: "Initial Person & Full Company Compatibility",
  result_Full_CompInitial: "Full Person & Initial Company Compatibility",
  result_INL_DOB_INL_COMP: "Initial DOB & Initial Company Compatibility",
  result_FULL_DOB_INL_COMP: "Full DOB & Initial Company Compatibility",
  result_INL_DOB_FULL_COMP: "Initial DOB & Full Company Compatibility",
  result_FULL_DOB_FULL_COMP: "Full DOB & Full Company Compatibility",
};

export default function NumerologyPersonandCompany() {
  const [reportData, setReportData] = useState(null);
  const { companyIndividualData } = useContext(NumerologyContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (companyIndividualData?.data) {
      setReportData(companyIndividualData.data);
    }
  }, [companyIndividualData]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!companyIndividualData) {
    return <Navigate to="/numerology-calculator" />;
  }

  if (!reportData) {
    return (
      <p className="text-center mt-10">
        No report data found. Please generate a report first.
      </p>
    );
  }

  const individualScores = [
    "personInitial",
    "companyInitial",
    "personFull",
    "companyFull",
    "personRadical",
    "personLucky",
  ];

  const compatibilityResults = [
    "result_INL_Name",
    "result_Full_Name",
    "result_INL_CompFull",
    "result_Full_CompInitial",
    "result_INL_DOB_INL_COMP",
    "result_FULL_DOB_INL_COMP",
    "result_INL_DOB_FULL_COMP",
    "result_FULL_DOB_FULL_COMP",
  ];

  return (
    <div className="min-h-screen bg-yellow-100 p-4 sm:p-8 flex items-center justify-center transition-opacity duration-500">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden transition-all">
        {/* Header */}
        <div className="p-6 text-center bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-200">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-orange-800 drop-shadow-sm tracking-wide"
          >
            🔮 Numerology Compatibility Report
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-orange-700 mt-2 text-lg italic"
          >
            An energetic view into person–company harmony
          </motion.p>
        </div>

        <div className="p-6 sm:p-10 space-y-12">
          {/* Circular Score */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="relative w-40 h-40 rounded-full bg-yellow-100 flex items-center justify-center shadow-inner"
              animate={{
                background:
                  "conic-gradient(#f59e0b " +
                  reportData.percentage * 3.6 +
                  "deg, #fef3c7 0deg)",
              }}
              transition={{ duration: 1.4 }}
              style={{
                background: `conic-gradient(#f59e0b ${
                  reportData.percentage * 3.6
                }deg, #fef3c7 0deg)`,
              }}
            >
              <div className="absolute w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-lg">
                <p className="text-3xl font-bold text-orange-600">
                  {reportData.percentage}%
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">
                  {reportData.TotalScore} / {reportData.OutOF}
                </p>
              </div>
            </motion.div>

            <p className="mt-6 text-lg font-medium text-gray-700 text-center">
              {reportData.TotalScoreSTMT_EN}
            </p>
          </motion.div>

          {/* Individual Scores */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-800 text-center"
            >
              ✨ Individual Scores
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {individualScores.map((key, index) => (
                <motion.div
                  key={key}
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow hover:shadow-md transition hover:scale-105"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-gray-700 text-base font-semibold">
                    {dataLabels[key]}
                  </p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    {reportData[key]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Compatibility Results */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-800 text-center"
            >
              🤝 Compatibility Analysis
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {compatibilityResults.map((key, index) => (
                <motion.div
                  key={key}
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow hover:shadow-md transition hover:scale-105"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <p className="text-gray-700 text-base font-semibold">
                    {dataLabels[key]}
                  </p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    {reportData[key]}
                  </p>

                  {/* Show corresponding statement */}
                  {reportData[`${key}_STMT_EN`] && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      {reportData[`${key}_STMT_EN`]}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
