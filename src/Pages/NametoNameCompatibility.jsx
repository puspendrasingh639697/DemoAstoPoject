import React from "react";
import { motion } from "framer-motion";
import { NumerologyContext } from "../context/NumerologyContext";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

const compatibilitySections = [
  {
    title: "Initial Name Compatibility",
    scoreKey: "result_INL_Name",
    statementKey: "result_INL_Name_STMT_EN",
  },
  {
    title: "Full Name Compatibility",
    scoreKey: "result_Full_Name",
    statementKey: "result_Full_Name_STMT_EN",
  },
  {
    title: "Person 1 Initial Name & Person 2 Full Name",
    scoreKey: "result_INL_NAME_FULL_NAME",
    statementKey: "result_INL_NAME_FULL_NAME_STMT_EN",
  },
  {
    title: "Person 1 Full Name & Person 2 Initial Name",
    scoreKey: "result_FULL_NAME_INL_NAME",
    statementKey: "result_FULL_NAME_INL_NAME_STMT_EN",
  },
];

const NametoNameCompatibility = () => {
  const [reportData, setReportData] = useState(null);
  const { nameData } = useContext(NumerologyContext);
  const data = nameData;
  if (!data) {
    return <Navigate to="/numerology-calculator" />;
  }

  useEffect(() => {
    if (data) {
      setReportData(data);
    }
  }, [data]);

  if (!reportData) {
    return (
      <p className="text-center mt-10">
        No report data found. Please generate a report first.
      </p>
    );
  }

  const parseNumbers = (numString) => {
    return (numString?.split(",") || [])
      .map((s) => s.trim())
      .filter((s) => s !== "");
  };

  const friendNumbers1 = parseNumbers(data.NameFriendNumber1);
  const friendNumbers2 = parseNumbers(data.NameFriendNumber2);
  const enemyNumbers1 = parseNumbers(data.NameEnemyNumber1);
  const enemyNumbers2 = parseNumbers(data.NameEnemyNumber2);

  const totalScorePercentage = (data.TotalScore / data.OutOF) * 100;

  return (
    <motion.div
      className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-lg shadow-lg border border-yellow-300 bg-white">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-t-lg text-center">
          <h1 className="text-4xl font-bold">Name Compatibility Report</h1>
          <p className="text-lg mt-2">
            Numerology insights into your relationship.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Total Score Display */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              {data.TotalScoreStatement_EN}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {data.TotalScoreStatement_HI}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <span className="text-5xl font-bold text-yellow-500">
                {data.TotalScore}
              </span>
              <span className="text-2xl text-gray-500">/ {data.OutOF}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${totalScorePercentage}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Compatibility: {totalScorePercentage.toFixed(1)}%
            </div>
          </div>

          <hr className="border-orange-200" />

          {/* Person Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((person) => {
              const isFirst = person === 1;
              const nameNumber = isFirst ? data.NameNumber1 : data.NameNumber2;
              const initialNumber = isFirst
                ? data.NameInitial1
                : data.NameInitial2;
              const friendNumbers = isFirst ? friendNumbers1 : friendNumbers2;
              const enemyNumbers = isFirst ? enemyNumbers1 : enemyNumbers2;
              const personName = isFirst
                ? data.Person1Name || ""
                : data.Person2Name || "";

              return (
                <motion.div
                  key={person}
                  className="border rounded-lg p-4 hover:shadow-lg transition bg-white"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-orange-600 mb-2">
                    Person {person}
                    {personName && ` (${personName})`} Numerology
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-800">Name Number:</p>
                      <span className="inline-block bg-yellow-400 text-white px-3 py-1 rounded shadow">
                        {nameNumber}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Initial Number:
                      </p>
                      <span className="inline-block bg-yellow-400 text-white px-3 py-1 rounded shadow">
                        {initialNumber}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Friend Numbers:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {friendNumbers.map((num, idx) => (
                          <span
                            key={idx}
                            className="bg-orange-400 text-white px-2 py-1 rounded text-sm shadow"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Enemy Numbers:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {enemyNumbers.map((num, idx) => (
                          <span
                            key={idx}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm shadow"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <hr className="border-orange-200" />

          {/* Compatibility Breakdown */}
          <h3 className="text-2xl font-semibold text-center text-orange-600">
            Detailed Compatibility Breakdown
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {compatibilitySections.map((section, idx) => (
              <motion.div
                key={idx}
                className="border rounded-lg p-4 hover:shadow-lg transition bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-lg font-semibold text-orange-600 mb-1">
                  {section.title}
                </h4>
                <p className="text-xl font-bold text-yellow-500">
                  Score: {data[section.scoreKey] ?? "N/A"}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {data[section.statementKey]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NametoNameCompatibility;
