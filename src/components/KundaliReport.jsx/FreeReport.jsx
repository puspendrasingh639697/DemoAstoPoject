import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { kundaliContext } from "../../context/KundaliContext";
import rahsiLagnaData from "./lagna_rashi_combinations.json";
import { Navigate } from "react-router-dom";
import MainLoader from "../Loaders/MainLoader";

// const kundaliData = {
//   lagna: "कर्क / Cancer",
//   rashi: "तुला / Libra",
//   summary: {
//     hi: "कर्क / Cancer लग्न + तुला / Libra का संयोजन एक विशिष्ट व्यक्तित्व प्रदान करता है...",
//     en: "Cancer Lagna + Libra Moon sign combination creates a unique personality...",
//   },
//   grah_situation: {
//     hi: [
//       { तत्व: "सूर्य", विवरण: "नेतृत्व, आत्मबल" },
//       { तत्व: "चंद्रमा", विवरण: "भावुकता, मन का नियंत्रण" },
//     ],
//     en: [
//       { planet: "Sun", description: "Leadership, confidence" },
//       { planet: "Moon", description: "Emotionality, mental control" },
//     ],
//   },
//   swabhav: {
//     hi: "व्यक्तित्व में संतुलन और उत्साह का मिश्रण होता है।",
//     en: "A mix of balance and enthusiasm in personality.",
//   },
//   positives: {
//     hi: ["दृढ़ इच्छाशक्ति", "नेतृत्व क्षमता"],
//     en: ["Strong willpower", "Leadership ability"],
//   },
//   negatives: {
//     hi: ["अति आत्मविश्वास", "भावनात्मक द्वंद्व"],
//     en: ["Overconfidence", "Emotional conflict"],
//   },
//   love_life: {
//     hi: "प्रेम में गहराई और वफादारी दिखाते हैं।",
//     en: "They show depth and loyalty in love.",
//   },
//   career_suggestions: {
//     hi: [
//       { क्षेत्र: "प्रशासन", कारण: "नेतृत्व गुण" },
//       { क्षेत्र: "कला", कारण: "रचनात्मकता" },
//     ],
//     en: [
//       { field: "Administration", reason: "Leadership qualities" },
//       { field: "Art", reason: "Creativity" },
//     ],
//   },
//   upay: {
//     hi: ["ॐ नमः शिवाय का जाप करें", "ध्यान और आत्मविश्लेषण करें"],
//     en: ["Chant 'Om Namah Shivaya'", "Practice meditation and introspection"],
//   },
// };

export default function FreeReport() {
  const { initialformData, chartsData, language } = useContext(kundaliContext);

  if (initialformData === "nodata") {
    return <Navigate to="/free-kundali" />;
  }

  if (!chartsData) {
    return <MainLoader loadingText={"Loading your kundali..."} />;
  }
  console.log(chartsData);
  console.log(rahsiLagnaData);
  const rashiAndPLanetName = [
    "मेष / Aries",
    "वृषभ / Taurus",
    "मिथुन / Gemini",
    "कर्क / Cancer",
    "सिंह / Leo",
    "कन्या / Virgo",
    "तुला / Libra",
    "वृश्चिक / Scorpio",
    "धनु / Sagittarius",
    "मकर / Capricorn",
    "कुंभ / Aquarius",
    "मीन / Pisces",
  ];

  const lagna = rashiAndPLanetName[chartsData.Ascendant.D1 - 1];
  const rashi = rashiAndPLanetName[chartsData.Moon.D1 - 1];

  const kundaliData = rahsiLagnaData.find(
    (item) => item.lagna === lagna && item.rashi === rashi
  );

  const [isEnglish, setIsEnglish] = useState(true);
  const lang = isEnglish ? "en" : "hi";

  const displayLagna = kundaliData.lagna.split(" / ")[isEnglish ? 1 : 0];
  const displayRashi = kundaliData.rashi.split(" / ")[isEnglish ? 1 : 0];
  const summary = kundaliData.summary[lang];
  const swabhav = kundaliData.swabhav[lang];
  const love_life = kundaliData.love_life[lang];
  const upay = kundaliData.upay[lang];
  const positives = kundaliData.positives[lang];
  const negatives = kundaliData.negatives[lang];

  const grah_situation = kundaliData.grah_situation[lang].map((item) => ({
    label: isEnglish ? item.planet : item.तत्व,
    description: isEnglish ? item.description : item.विवरण,
  }));

  const career_suggestions = kundaliData.career_suggestions[lang].map(
    (item) => ({
      field: isEnglish ? item.field : item.क्षेत्र,
      reason: isEnglish ? item.reason : item.कारण,
    })
  );

  const sections = [
    {
      title: isEnglish ? "Summary" : "सारांश",
      content: <p className="text-gray-700">{summary}</p>,
    },
    {
      title: isEnglish ? "Planetary Situation" : "ग्रह स्थिति",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {grah_situation.map((item, index) => (
            <li key={index}>
              <strong>{item.label}:</strong> {item.description}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: isEnglish ? "Personality" : "स्वभाव",
      content: (
        <>
          <p className="mb-4 text-gray-700">{swabhav}</p>
          <h3 className="text-lg font-semibold mb-2">
            {isEnglish ? "Positives" : "सकारात्मक गुण"}:
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {positives.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {isEnglish ? "Negatives" : "नकारात्मक गुण"}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {negatives.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-red-100 text-red-800 border border-red-300 rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        </>
      ),
    },
    {
      title: isEnglish ? "Love Life" : "प्रेम जीवन",
      content: <p className="text-gray-700">{love_life}</p>,
    },
    {
      title: isEnglish ? "Career Suggestions" : "करियर सुझाव",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {career_suggestions.map((item, index) => (
            <li key={index}>
              <strong>{item.field}:</strong> {item.reason}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: isEnglish ? "Remedies" : "उपाय",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {upay.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-center relative">
          <h1 className="text-xl sm:text-xl font-bold mb-2">
            {isEnglish ? "Kundali Report" : "कुंडली रिपोर्ट"}
          </h1>
          {/* <p className="text-lg sm:text-xl font-medium">
            {displayLagna} / {displayRashi}
          </p> */}
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="absolute top-4 right-4 px-4 py-1 bg-white text-amber-700 rounded-md shadow hover:bg-yellow-100 transition"
          >
            {isEnglish ? "हिन्दी" : "English"}
          </button>
        </div>

        {/* Sections */}
        <div className="p-6 sm:p-8 space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white  border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg hover:bg-yellow-100 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 text-amber-700">
                {section.title}
              </h2>
              <div>{section.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
