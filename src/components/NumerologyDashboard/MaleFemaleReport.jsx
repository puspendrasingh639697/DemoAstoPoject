import { Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { NumerologyContext } from "../../context/NumerologyContext";
import { Navigate } from "react-router-dom";

export default function MaleFemaleReport() {
  const { m2fData } = useContext(NumerologyContext);
  const [reportData, setReportData] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (m2fData) {
      setReportData(m2fData);
    }
  }, [m2fData]);

  if (!m2fData) {
    return <Navigate to="/numerology-calculator" />;
  }

  if (!reportData) {
    return <div className="text-center py-10">Loading Report...</div>;
  }

  const compatibilityPercentage =
    (reportData.TotalScore / reportData.OutOF) * 100;

  const renderFriendEnemyNumbers = (label, numbers, type) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 transition-all"
    >
      <span className="font-medium text-gray-600">{label}:</span>
      <span
        className={`rounded-full px-4 py-1.5 text-base font-semibold shadow ${
          type === "friend"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-red-100 text-red-800 hover:bg-red-200"
        }`}
      >
        {numbers}
      </span>
    </motion.div>
  );

  const renderResultScore = (label, score, statement) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="space-y-1 rounded-lg bg-yellow-50 px-3 py-2 hover:bg-yellow-100 transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-base text-gray-700">{label}</span>
        <span className="text-lg font-bold text-yellow-700">{score}/10</span>
      </div>
      {statement && <p className="text-sm text-gray-600">{statement}</p>}
    </motion.div>
  );

  const compatibilityItems = [
    {
      label: "Initial Name Compatibility",
      score: reportData.result_INL_Name,
      statement: reportData.result_INL_Name_STMT_EN,
    },
    {
      label: "Initial DOB Compatibility",
      score: reportData.result_INL_Dob,
      statement: reportData.result_INL_Dob_STMT_EN,
    },
    {
      label: "Full Name Compatibility",
      score: reportData.result_Full_Name,
      statement: reportData.result_Full_Name_STMT_EN,
    },
    {
      label: "Full DOB Compatibility",
      score: reportData.result_Full_Dob,
      statement: reportData.result_Full_Dob_STMT_EN,
    },
    {
      label: "Initial DOB & Full DOB",
      score: reportData.result_INL_DOB_FULL_DOB,
      statement: reportData.result_INL_DOB_FULL_DOB_STMT_EN,
    },
    {
      label: "Initial DOB & Initial Name",
      score: reportData.result_INL_DOB_INL_NAME,
      statement: reportData.result_INL_DOB_INL_NAME_STMT_EN,
    },
    {
      label: "Initial DOB & Full Name",
      score: reportData.result_INL_DOB_FULL_NAME,
      statement: reportData.result_INL_DOB_FULL_NAME_STMT_EN,
    },
    {
      label: "Initial Name & Initial DOB",
      score: reportData.result_INL_NAME_INL_DOB,
      statement: reportData.result_INL_NAME_INL_DOB_STMT_EN,
    },
    {
      label: "Initial Name & Full DOB",
      score: reportData.result_INL_Name_FULL_DOB,
      statement: reportData.result_INL_Name_FULL_DOB_STMT_EN,
    },
    {
      label: "Initial Name & Full Name",
      score: reportData.result_INL_NAME_FULL_NAME,
      statement: reportData.result_INL_NAME_FULL_NAME_STMT_EN,
    },
  ];

  const firstItems = compatibilityItems.slice(0, 4);
  const remainingItems = compatibilityItems.slice(4);

  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl rounded-3xl border border-yellow-300 bg-white p-10 shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 text-4xl font-extrabold text-black">
            <span>{reportData.maleName}</span>
            <Heart className="size-14 fill-red-600 text-red-600 animate-pulse" />
            <span>{reportData.femaleName}</span>
          </div>
          <div className="text-center text-xl font-medium text-gray-700">
            Numerology Compatibility
          </div>
          <div className="w-full max-w-2xl space-y-3 pt-3">
            <div className="flex items-center justify-between text-xl font-semibold text-yellow-600">
              <span>Total Compatibility Score:</span>
              <span>
                {reportData.TotalScore}/{reportData.OutOF}
              </span>
            </div>
            <div
              className="h-4 w-full rounded-full bg-yellow-200 overflow-hidden"
              role="progressbar"
              aria-valuenow={compatibilityPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${compatibilityPercentage}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-green-500"
              />
            </div>
            <div className="text-center text-sm text-gray-600">
              {compatibilityPercentage.toFixed(0)}% Match
            </div>
            <div className="text-center text-base text-gray-700 mt-2 italic">
              {reportData.TotalScoreStatement_EN}
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-yellow-200" />

        <div className="grid gap-10 md:grid-cols-2">
          {/* Your Numbers Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold text-yellow-500">Your Numbers</h2>
            <div className="overflow-x-hidden rounded-xl shadow-md border border-yellow-200">
              <table className="min-w-full text-sm text-gray-700 bg-white">
                <thead className="bg-yellow-100 text-yellow-800 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold border-b border-yellow-300">
                      Attribute
                    </th>
                    <th className="px-6 py-4 text-left font-semibold border-b border-yellow-300">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-yellow-600" />
                        {reportData.maleName}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold border-b border-yellow-300">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-yellow-600" />
                        {reportData.femaleName}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-yellow-50 border-b border-yellow-100">
                    <td className="px-6 py-3 font-medium">Radical</td>
                    <td className="px-6 py-3">{reportData.radicalNumber1}</td>
                    <td className="px-6 py-3">{reportData.radicalNumber2}</td>
                  </tr>
                  <tr className="even:bg-yellow-50 border-b border-yellow-100">
                    <td className="px-6 py-3 font-medium">Lucky</td>
                    <td className="px-6 py-3">{reportData.luckyNumber1}</td>
                    <td className="px-6 py-3">{reportData.luckyNumber2}</td>
                  </tr>
                  <tr className="even:bg-yellow-50 border-b border-yellow-100">
                    <td className="px-6 py-3 font-medium">Name</td>
                    <td className="px-6 py-3">{reportData.NameNumber1}</td>
                    <td className="px-6 py-3">{reportData.NameNumber2}</td>
                  </tr>
                  <tr className="even:bg-yellow-50">
                    <td className="px-6 py-3 font-medium">Initial</td>
                    <td className="px-6 py-3">{reportData.NameInitial1}</td>
                    <td className="px-6 py-3">{reportData.NameInitial2}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Compatibility Breakdown with Scroll */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold text-yellow-500">
              Compatibility Breakdown
            </h2>
            <div className="grid gap-3">
              {firstItems.map((item, idx) => (
                <div key={idx}>
                  {renderResultScore(item.label, item.score, item.statement)}
                </div>
              ))}
            </div>

            {showAll && (
              <div className="grid gap-3 max-h-96 overflow-y-hidden pr-1">
                {remainingItems.map((item, idx) => (
                  <div key={idx}>
                    {renderResultScore(item.label, item.score, item.statement)}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3 text-yellow-700 hover:underline font-medium"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </motion.div>

          {/* Friend & Enemy Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-2 space-y-5"
          >
            <h2 className="text-2xl font-bold text-yellow-500">
              Friend & Enemy Numbers
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {reportData.maleName}'s Connections
                </h3>
                {renderFriendEnemyNumbers(
                  "DOB Friends",
                  reportData.DobFriendNumber1,
                  "friend"
                )}
                {renderFriendEnemyNumbers(
                  "Name Friends",
                  reportData.NameFriendNumber1,
                  "friend"
                )}
                {renderFriendEnemyNumbers(
                  "DOB Enemies",
                  reportData.DobEnemyNumber1,
                  "enemy"
                )}
                {renderFriendEnemyNumbers(
                  "Name Enemies",
                  reportData.NameEnemyNumber1,
                  "enemy"
                )}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {reportData.femaleName}'s Connections
                </h3>
                {renderFriendEnemyNumbers(
                  "DOB Friends",
                  reportData.DobFriendNumber2,
                  "friend"
                )}
                {renderFriendEnemyNumbers(
                  "Name Friends",
                  reportData.NameFriendNumber2,
                  "friend"
                )}
                {renderFriendEnemyNumbers(
                  "DOB Enemies",
                  reportData.DobEnemyNumber2,
                  "enemy"
                )}
                {renderFriendEnemyNumbers(
                  "Name Enemies",
                  reportData.NameEnemyNumber2,
                  "enemy"
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
