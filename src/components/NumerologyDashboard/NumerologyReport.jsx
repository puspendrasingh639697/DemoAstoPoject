import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { NumerologyContext } from "../../context/NumerologyContext";

export default function NumerologyReport() {
  const [reportData, setReportData] = useState(null);
  const { p2pData } = useContext(NumerologyContext);

  if (!p2pData) {
    return <Navigate to="/numerology-calculator" />;
  }

  useEffect(() => {
    if (p2pData) {
      setReportData(p2pData);
    }
  }, [p2pData]);

  if (!reportData) {
    return (
      <p className="text-center mt-10">
        No report data found. Please generate a report first.
      </p>
    );
  }

  const person1Data = {
    nameNumerology: {
      inlNo: reportData.data.radicalNumber1,
      nameNo: reportData.data.NameNumber1,
      friendlyNo: reportData.data.NameFriendNumber1,
      enemyNo: reportData.data.NameEnemyNumber1,
      matrixNo: reportData.data.radicalNumber1,
    },
    dobNumerology: {
      inlNo: reportData.data.radicalNumber1,
      nameNo: reportData.data.luckyNumber1,
      friendlyNo: reportData.data.DobFriendNumber1,
      enemyNo: reportData.data.DobEnemyNumber1,
      matrixNo: reportData.data.luckyNumber1,
    },
  };

  const person2Data = {
    nameNumerology: {
      inlNo: reportData.data.radicalNumber2,
      nameNo: reportData.data.NameNumber2,
      friendlyNo: reportData.data.NameFriendNumber2,
      enemyNo: reportData.data.NameEnemyNumber2,
      matrixNo: reportData.data.radicalNumber2,
    },
    dobNumerology: {
      inlNo: reportData.data.radicalNumber2,
      nameNo: reportData.data.luckyNumber2,
      friendlyNo: reportData.data.DobFriendNumber2,
      enemyNo: reportData.data.DobEnemyNumber2,
      matrixNo: reportData.data.luckyNumber2,
    },
  };

  const compatibilityData = [
    {
      aspect: "INL Name / INL Name ",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_Name,
      result: reportData.data.result_INL_Name_STMT_EN || "",
    },
    {
      aspect: "INL dob / INL dob ",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_Dob,
      result: reportData.data.result_INL_Dob_STMT_EN || "",
    },
    {
      aspect: " Full_Name / Full_Name ",
      maxMarks: 10,
      obtainMarks: reportData.data.result_Full_Name,
      result: reportData.data.result_Full_Name_STMT_EN || "",
    },
    {
      aspect: "INL No. / Name No.",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_Name,
      result: reportData.data.result_INL_Name_FULL_DOB_STMT_EN || "",
    },
    {
      aspect: "INL No. / DOB No.",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_Dob,
      result: reportData.data.result_INL_NAME_INL_DOB_STMT_EN || "",
    },
    {
      aspect: "Full Name No. / Name No.",
      maxMarks: 10,
      obtainMarks: reportData.data.result_Full_Name,
      result: reportData.data.result_INL_NAME_FULL_NAME_STMT_EN || "",
    },
    {
      aspect: "Full DOB No. / DOB No.",
      maxMarks: 10,
      obtainMarks: reportData.data.result_Full_Dob,
      result: reportData.data.result_INL_DOB_FULL_DOB_STMT_EN || "",
    },
    {
      aspect: "INL DOB / INL Name",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_NAME_INL_DOB,
      result: reportData.data.result_INL_NAME_INL_DOB_STMT_EN || "",
    },
    {
      aspect: "INL Name / Full DOB",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_Name_FULL_DOB,
      result: reportData.data.result_INL_Name_FULL_DOB_STMT_EN || "",
    },
    {
      aspect: "INL Name / Full Name",
      maxMarks: 10,
      obtainMarks: reportData.data.result_INL_NAME_FULL_NAME,
      result: reportData.data.result_INL_NAME_FULL_NAME_STMT_EN || "",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <section className="bg-orange-300 py-4 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-800 mb-4">
              Discover Your Compatibility Through Numerology
            </h1>
            <p className="text-yellow-900 mb-6 leading-relaxed text-lg">
              Unveil the secrets of your relationship using ancient numerology
              techniques. Analyze compatibility based on Name Numbers, INL,
              Matrix, and more.
            </p>
            <button className="bg-red-800 hover:bg-yellow-300 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
              Your Report 👇
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTku3fn2DUQY0RXvYOuJd_thWVsBVaqC38ZLw&s"
              alt="Numerology Compatibility"
              className="w-[400px] rounded-xl shadow-md border border-yellow-200"
            />
          </motion.div>
        </div>
      </section>

      <motion.div
        className="w-full mt-5 max-w-6xl p-6 md:p-10 shadow-xl rounded-xl border border-yellow-500 mx-auto"
        initial="hidden"
        animate="show"
        variants={fadeIn}
      >
        <motion.h1
          className="text-center text-3xl font-bold mb-4 text-yellow-800"
          variants={fadeIn}
        >
          Person 1 / Person 2 Compatibility Report
        </motion.h1>

        <motion.p
          className="text-sm text-center mb-8 text-yellow-900 leading-relaxed max-w-3xl mx-auto"
          variants={fadeIn}
          custom={1}
        >
          Numerology is an ancient Indian science as significant as astrology.
          Developed by Acharya Sh. P.C. Bhatt, it offers powerful insights into
          relationship compatibility.
        </motion.p>

        {[
          {
            title: "Numerology by Name",
            data1: person1Data.nameNumerology,
            data2: person2Data.nameNumerology,
          },
          {
            title: "Numerology by DOB",
            data1: person1Data.dobNumerology,
            data2: person2Data.dobNumerology,
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            custom={index + 2}
            className="mb-10"
          >
            <h2 className="text-xl font-bold mb-3 text-yellow-700">
              {section.title}
            </h2>
            <div className="overflow-x-auto border border-yellow-400 rounded-md shadow-sm bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="bg-yellow-100 text-yellow-900">
                  <tr>
                    <th className="p-3 border-b border-yellow-400"></th>
                    <th className="p-3 border-b border-yellow-400 font-semibold">
                      Person 1
                    </th>
                    <th className="p-3 border-b border-yellow-400 font-semibold">
                      Person 2
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(section.data1).map(([key], idx) => (
                    <tr key={idx} className="hover:bg-yellow-50">
                      <td className="p-3 border-b border-yellow-200 font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").replace("No", "No.")}
                      </td>
                      <td className="p-3 border-b border-yellow-200">
                        {section.data1[key]}
                      </td>
                      <td className="p-3 border-b border-yellow-200">
                        {section.data2[key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}

        <motion.div
          variants={fadeIn}
          custom={5}
          className="overflow-x-auto border mt-5 border-yellow-300 rounded-md shadow-md bg-white"
        >
          <h2 className="text-xl font-bold mb-3 text-yellow-700 px-3 pt-4">
            Compatibility Summary
          </h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-yellow-100 text-yellow-800">
              <tr>
                <th className="p-3 border-b border-yellow-300 font-semibold">
                  Aspect
                </th>
                <th className="p-3 border-b border-yellow-300 font-semibold text-center">
                  Max. Marks
                </th>
                <th className="p-3 border-b border-yellow-300 font-semibold text-center">
                  Obtained
                </th>
                <th className="p-3 border-b border-yellow-300 font-semibold">
                  Result Statement
                </th>
              </tr>
            </thead>
            <tbody>
              {compatibilityData.map((item, index) => (
                <tr key={index} className="hover:bg-yellow-50 text-yellow-900">
                  <td className="p-3 border-b border-yellow-200 font-medium">
                    {item.aspect}
                  </td>
                  <td className="p-3 border-b border-yellow-200 text-center">
                    {item.maxMarks}
                  </td>
                  <td className="p-3 border-b border-yellow-200 text-center">
                    {item.obtainMarks}
                  </td>
                  <td className="p-3 border-b border-yellow-200">
                    {item.result}
                  </td>
                </tr>
              ))}
              <tr className="bg-yellow-200 font-bold text-yellow-900">
                <td className="p-3 border-t-2 border-yellow-400">Total</td>
                <td className="p-3 border-t-2 border-yellow-400 text-center">
                  {reportData?.data?.OutOF}
                </td>
                <td className="p-3 border-t-2 border-yellow-400 text-center">
                  {reportData?.data?.TotalScore}
                </td>
                <td className="p-3 border-t-2 border-yellow-400">
                  {reportData.data.TotalScoreStatement_EN}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </>
  );
}
