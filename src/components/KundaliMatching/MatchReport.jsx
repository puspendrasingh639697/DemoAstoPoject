import React, { useContext } from "react";
import ReportHeader from "./ReportHeader";
import UserDetails from "./UserDetails";
import CompatibilityTable from "./CompatibilityTable";
import { astroContext } from "../../context/astroContext";
import Spinner from "./Spinner";
import RangeSlider from "./RangeSlider";
import { kundaliContext } from "../../context/KundaliContext";
import { Navigate } from "react-router-dom";
import MainLoader from "../Loaders/MainLoader";
import { User, Calendar, MapPin, Sparkle } from "lucide-react";
import { motion } from "framer-motion";

function MatchReport() {
  const { initialKundaliMatchData, kundaliMatchData, language } =
    useContext(kundaliContext);
  if (initialKundaliMatchData == "nodata") {
    return <Navigate to="/kundali-matching" />;
  }
  console.log(initialKundaliMatchData);
  if (!kundaliMatchData) {
    return <MainLoader loadingText={"Preparing your match report..."} />;
  }

  function makeKundaliMatchingData(data) {
    return [
      {
        Attribute: "varan",
        male: data.Avakhada.male.varan,
        female: data.Avakhada.female.varan,
        GeneralPoints: data.AstkutrecivedPoints.VarnaPointsNormal.Points,
        comment: data.AstkutrecivedPoints.VarnaPointsNormal.comment,
        PariharPoints: data.AstkutrecivedPoints.VarnaPointsWithParihaar.Points,
        PariharComment:
          data.AstkutrecivedPoints.VarnaPointsWithParihaar.comment,
        OutOf: 1,
        areaOfLife: "Natural Refinement / Work",
        description:
          "The work gunas don't match for this pair and the overall compatibility may not be at its best.",
        meaning:
          "Varna refers to the mental compatibility of the two persons involved. It holds nominal effect in the matters of marriage compatibility.",
      },
      {
        Attribute: "Vashya",
        male: data.Avakhada.male.Vashya,
        female: data.Avakhada.female.Vashya,
        GeneralPoints: data.AstkutrecivedPoints.vashyaPointsNormal.Points,
        comment: data.AstkutrecivedPoints.vashyaPointsNormal.comment,
        PariharPoints: data.AstkutrecivedPoints.vashyaPointsWithParihaar.Points,
        PariharComment:
          data.AstkutrecivedPoints.vashyaPointsWithParihaar.comment,
        OutOf: 2,
        areaOfLife: "Innate Giving / Attraction towards each other.",
        description:
          "The boy and the girl both will retain an amazing understanding when it will come to an emotional, moral and professional aspect.",
        meaning:
          "Vashya indicates the bride and the groom's tendency to dominate or influence each other in a marriage.",
      },
      {
        Attribute: "Tara",
        male: data.Avakhada.male.maletara,
        female: data.Avakhada.female.femaletara,
        GeneralPoints: data.AstkutrecivedPoints.TaraPointsNormal.Points,
        comment: data.AstkutrecivedPoints.TaraPointsNormal.comment,
        PariharPoints: data.AstkutrecivedPoints.TaraPointsNormal.Points,
        PariharComment: data.AstkutrecivedPoints.TaraPointsWithParihaar.comment,
        OutOf: 3,
        areaOfLife: "Comfort - Prosperity - Health",
        description:
          "Both of them need to work in synchronization which might create friction at times between them.",
        meaning:
          "Tara is the indicator of the birth star compatibility of the bride and the groom. It also indicates the fortune of the couple.",
      },
      {
        Attribute: "Yoni",
        male: data.Avakhada.male.Yoni,
        female: data.Avakhada.female.Yoni,
        GeneralPoints: data.AstkutrecivedPoints.YoniPointsNormal.Points,
        comment: data.AstkutrecivedPoints.YoniPointsNormal.comment,
        PariharPoints: data.AstkutrecivedPoints.YoniPointsWithParihaar.Points,
        PariharComment: data.AstkutrecivedPoints.YoniPointsWithParihaar.comment,
        OutOf: 4,
        areaOfLife: "Physical Intimacy",
        description:
          "Both of them need to work in synchronization which might create friction at times between them.",
        meaning:
          "Yoni is the indicator of the sexual or physical compatibility between the bride and the groom in question.",
      },
      {
        Attribute: "maitri",
        male: data.Avakhada.male.maitri,
        female: data.Avakhada.female.maitri,
        GeneralPoints: data.AstkutrecivedPoints.GrahaMaitriPointsNormal.Points,
        comment: data.AstkutrecivedPoints.GrahaMaitriPointsNormal.comment,
        PariharPoints:
          data.AstkutrecivedPoints.GrahaMaitriPointsWithParihaar.Points,
        PariharComment:
          data.AstkutrecivedPoints.GrahaMaitriPointsWithParihaar.comment,
        OutOf: 5,
        areaOfLife: "Friendliness of Sign Lords",
        description:
          "This combination of the gunas is not preferable for marriage, consult an astrologer before proceeding ahead.",
        meaning:
          "Graha Maitri is the indicator of the intellectual and mental connection between the prospective couple.",
      },
      {
        Attribute: "Gan",
        male: data.Avakhada.male.Gan,
        female: data.Avakhada.female.Gan,
        GeneralPoints: data.AstkutrecivedPoints.GanaPointsNormal.Points,
        comment: data.AstkutrecivedPoints.GanaPointsNormal.comment,
        PariharPoints: data.AstkutrecivedPoints.GanaPointsWithParihaar.Points,
        PariharComment: data.AstkutrecivedPoints.GanaPointsWithParihaar.comment,
        OutOf: 6,
        areaOfLife: "Temperament",
        description:
          "The pair will be supportive of each other in every aspect of life which will foster the sense of humbleness between the both. Overall, this is an ideal match for wedding purposes.",
        meaning:
          "Gana is the indicator of the Behaviour, character and temperament of the potential bride and groom towards each other.",
      },
      {
        Attribute: "bhakut",
        male: data.Avakhada.male.bhakutMale,
        female: data.Avakhada.female.bhakutFemale,
        GeneralPoints: data.AstkutrecivedPoints.bhaukutPointsNormal.Points,
        comment: data.AstkutrecivedPoints.bhaukutPointsNormal.comment,
        PariharPoints:
          data.AstkutrecivedPoints.bhaukutPointsWithParihaar.Points,
        PariharComment:
          data.AstkutrecivedPoints.bhaukutPointsWithParihaar.comment,
        OutOf: 7,
        areaOfLife: "Health and wealth",
        description:
          "Happiness and prosperity will prevail in the pair’s marital life.",
        meaning:
          "Bhakoota is related to the couple’s joys and sorrows together and assesses the wealth and health after their wedding.",
      },
      {
        Attribute: "Nadi",
        male: data.Avakhada.male.Nadi,
        female: data.Avakhada.female.Nadi,
        GeneralPoints: data.AstkutrecivedPoints.NaadiPointsNormal.Points,
        comment: data.AstkutrecivedPoints.NaadiPointsNormal.comment,
        PariharPoints: data.AstkutrecivedPoints.NaadiPointsWithParihaar.Points,
        PariharComment:
          data.AstkutrecivedPoints.NaadiPointsWithParihaar.comment,
        OutOf: 8,
        areaOfLife: "Progeny",
        description:
          "This couple will experience beneficial and long lasting partnership. This marriage is preferable at all cost.",
        meaning:
          "Nadi is related to the health compatibility of the couple. Matters of childbirth and progeny are.",
      },
    ];
  }

  const matchData = makeKundaliMatchingData(kundaliMatchData);
  console.table(matchData);
  function calculateAllPoints() {
    const GeneralPoints = matchData.reduce(
      (total, item) => total + item.GeneralPoints,
      0
    );
    const PariharPoints = matchData.reduce(
      (total, item) => total + item.PariharPoints,
      0
    );
    return { GeneralPoints, PariharPoints };
  }

  const convertToAMPM = (time24) => {
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute} ${ampm}`;
  };

  const maleData = {
    name: `${initialKundaliMatchData.boy.fullname}`,
    birthDate: `${initialKundaliMatchData.boy.year}-${initialKundaliMatchData.boy.month < 9
      ? `0${initialKundaliMatchData.boy.month}`
      : `${initialKundaliMatchData.boy.month}`
      }-${initialKundaliMatchData.boy.day < 9
        ? `0${initialKundaliMatchData.boy.day}`
        : `${initialKundaliMatchData.boy.day}`
      }`,
    birthTime: convertToAMPM(
      `${String(initialKundaliMatchData.boy.hour).padStart(2, "0")}:${String(
        initialKundaliMatchData.boy.minute
      ).padStart(2, "0")}:${String(initialKundaliMatchData.boy.second).padStart(
        2,
        "0"
      )}`
    ),
    birthPlace: `${initialKundaliMatchData.boy.name}`,
    janamRashi: `${kundaliMatchData.Avakhada.male.bhakutMale[language]}`,
  };

  const femaleData = {
    name: `${initialKundaliMatchData.girl.fullname}`,
    birthDate: `${initialKundaliMatchData.girl.year}-${initialKundaliMatchData.girl.month < 9
      ? `0${initialKundaliMatchData.girl.month}`
      : `${initialKundaliMatchData.girl.month}`
      }-${initialKundaliMatchData.girl.day < 9
        ? `0${initialKundaliMatchData.girl.day}`
        : `${initialKundaliMatchData.girl.day}`
      }`,
    birthTime: convertToAMPM(
      `${String(initialKundaliMatchData.girl.hour).padStart(2, "0")}:${String(
        initialKundaliMatchData.girl.minute
      ).padStart(2, "0")}:${String(
        initialKundaliMatchData.girl.second
      ).padStart(2, "0")}`
    ),
    birthPlace: `${initialKundaliMatchData.girl.name}`,
    janamRashi: `${kundaliMatchData.Avakhada.female.bhakutFemale[language]}`,
  };
  let isManglikMatch = "";
  if (kundaliMatchData.Mangleek.male && kundaliMatchData.Mangleek.female) {
    isManglikMatch = "Yes"
  } else if (!kundaliMatchData.Mangleek.male && !kundaliMatchData.Mangleek.female) {
    isManglikMatch = "Both are not manglik"
  } else {
    isManglikMatch = "No"
  }


  const HeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10 text-pink-500"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
      <div className="w-1/3 flex items-center text-black font-semibold">
        {Icon && <Icon className="w-5 h-5 mr-2 text-gray-500" />}
        {label}
      </div>
      <div className="w-2/3 text-gray-800">{value}</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 font-inter flex flex-col items-center max-w-7xl mx-auto  my-4 border-gray-200 border-1 rounded-2xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Kundli Matching Report
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-center space-x-4 mb-12"
      >
        <button className="bg-blue-400 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105">
          {maleData.name}
        </button>
        <HeartIcon />
        <button className="bg-pink-400 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-pink-500 transition duration-300 transform hover:scale-105">
          {femaleData.name}
        </button>
      </motion.div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm sm:text-md">
        {[
          { ...maleData, badge: "bg-blue-500", gender: "Male" },
          { ...femaleData, badge: "bg-pink-500", gender: "Female" },
        ].map((person, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="bg-yellow-400 p-2 sm:p-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center">
                <User className="w-6 h-6 text-gray-800 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Basic Details
                </h2>
              </div>
              <span
                className={`${person.badge} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-md`}
              >
                {person.gender}
              </span>
            </div>
            <div className="p-4">
              <DetailRow icon={User} label="Name" value={person.name} />
              <DetailRow
                icon={Calendar}
                label="Birth Date & Time"
                value={`${person.birthDate} | ${person.birthTime}`}
              />
              <DetailRow
                icon={MapPin}
                label="Birth Place"
                value={person.birthPlace}
              />
              <DetailRow
                icon={Sparkle}
                label="Janam Rashi"
                value={person.janamRashi}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl my-12 mx-auto shadow-lg rounded-xl bg-white p-4 sm:p-6 border border-gray-200"
      >
        <h2 className="text-2xl sm:text-2xl text-center font-medium text-gray-900 py-2 rounded-lg mb-6 bg-yellow-400">
          Dasha
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-2">
          {[
            {
              title: "Ashtakoot General",
              value: `${calculateAllPoints().GeneralPoints}/36`,
              color: "text-yellow-600",
            },
            {
              title: "Ashtakoot Parihar",
              value: `${calculateAllPoints().PariharPoints}/36`,
              color: "text-yellow-500",
            },
            {
              title: "Manglik Match",
              value: isManglikMatch,
              color: isManglikMatch !== "No" ? "text-green-600" : "text-red-600",
            },
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-4 shadow-md border-[3px] border-yellow-400 border-dashed rounded-xl text-center">
              <h3 className="text-base font-medium text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className={`text-lg font-semibold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl bg-yellow-200 border border-yellow-300 rounded-2xl p-6 mb-8 shadow-lg text-gray-800 text-center"
      >
        <p className="text-sm sm:text-lg leading-relaxed">
          Ashtakoot Matching between male and female is{" "}
          <span className="font-bold text-yellow-700">
            {calculateAllPoints().GeneralPoints}
          </span>{" "}
          points out of <span className="font-bold text-yellow-700">36</span>{" "}
          points for General and{" "}
          <span className="font-bold text-yellow-700">
            {calculateAllPoints().PariharPoints}
          </span>{" "}
          points out of <span className="font-bold text-yellow-700">36</span>{" "}
          points for Parihar. This is a reasonably good score. Hence, this is a
          favourable Ashtakoot match.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 my-8"
      >
        <div className="bg-yellow-400 p-2 sm:p-4 rounded-t-xl text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Match Ashtakoot Points
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-yellow-300">
              <tr>
                {[
                  "Attribute",
                  "Male",
                  "Female",
                  "General Points",
                  "Parihar Points",
                  "Out Of",
                  "Area Of Life",
                  "Description",
                  "Meaning",
                ].map((t, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300 "
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matchData.map((point, index) => (
                <tr
                  key={index}
                  // single line in small screen
                  className="hover:bg-yellow-50 transition duration-150 ease-in-out"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                    {point.Attribute}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r">
                    {point.male[language]}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r">
                    {point.female[language]}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r text-center">
                    {point.GeneralPoints}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r bg-yellow-100 font-bold text-center">
                    {point.PariharPoints}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r text-center">
                    {point.OutOf}
                  </td>
                  <td className="px-4 py-3 whitespace-normal text-sm text-gray-700 border-r">
                    {point.areaOfLife}
                  </td>
                  <td className="px-4 py-3 whitespace-normal text-sm text-gray-700 border-r">
                    {point.description}
                    <span className="ml-1 font-semibold text-yellow-500">
                      {point?.PariharComment
                        ? point.PariharComment?.endsWith(".")
                          ? point.PariharComment
                          : point.PariharComment + "."
                        : ""}
                    </span>{" "}
                    <span className="ml-1 font-semibold text-pink-500">
                      {point.comment
                        ? point.comment?.endsWith(".")
                          ? point?.comment
                          : point?.comment + "."
                        : " "}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-normal text-sm text-gray-700">
                    {point.meaning}
                  </td>
                </tr>
              ))}
              <tr className="bg-yellow-300 font-bold">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r">
                  Total
                </td>
                <td colSpan={2}></td>
                <td className="px-4 py-3 text-center">
                  {calculateAllPoints().GeneralPoints}
                </td>
                <td className="px-4 py-3 text-center">
                  {calculateAllPoints().PariharPoints}
                </td>
                <td className="px-4 py-3 text-center">36</td>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl bg-yellow-100 border border-yellow-300 rounded-2xl p-6 shadow-lg text-center"
      >
        <p className="text-sm sm:text-lg leading-relaxed">
          {kundaliMatchData.Mangleek.male && kundaliMatchData.Mangleek.female ? (
            <>
              The overall points of this couple represent a great combination. However, both
              the bride and the groom are <span className="font-bold">Manglik</span>, which may require
              certain remedies for a harmonious married life. It is strongly recommended to consult
              an astrologer.
            </>
          ) : kundaliMatchData.Mangleek.male || kundaliMatchData.Mangleek.female ? (
            <>
              The overall points of this couple represent a promising match. However, one partner is{" "}
              <span className="font-bold">Manglik</span> while the other is not, which may require
              astrological remedies. Consulting an astrologer is advised to ensure balance and harmony
              in marriage.
            </>
          ) : (
            <>
              The overall points of this couple represent a great combination, both the bride and the
              groom have no mangal dosh. Marriage is preferred. Consult an astrologer to get rid of
              the few remedies and the doshas present for a harmonious married life ahead.
              <span className="font-bold">
                {" "}
                Both boy and girl are not Manglik, which does not lead to any problems.
              </span>
            </>
          )}
        </p>

      </motion.div>
    </div>
  );
}

export default MatchReport;
