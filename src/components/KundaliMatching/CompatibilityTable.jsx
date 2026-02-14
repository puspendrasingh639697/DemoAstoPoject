import React from "react";
import { useContext } from "react";
import { astroContext } from "../../context/astroContext";

const CompatibilityTable = () => {
  const meanings = {
    Tara: "Star compatibility that influences health, prosperity, and well-being of the couple.",
    Gana: "Represents the temperament and nature of the individuals, impacting behavior and compatibility.",
    Yoni: "Symbolizes sexual compatibility and mutual attraction between partners.",
    Rasi: "Indicates the zodiac sign compatibility and overall constructivism of the couple.",
    " Rasi AdhiPathi":
      "Denotes the relationship between ruling planets (lords) of both partners, influencing friendship and harmony.",
    Vasya: "Describes the natural dominance and attraction between partners.",
    Nadi: "Represents genetic compatibility and progeny, crucial for healthy offspring.",
    Varna:
      "Symbolizes spiritual compatibility and ego levels between the partners.",
  };

  const { matchData } = useContext(astroContext);
  console.log(matchData);

  const responseArray = Object.values(matchData);
  console.log(responseArray);

  const data = responseArray.filter((item) => typeof item === "object");

  const totalScore = responseArray.find((item) => typeof item === "number");
  const message = responseArray.find((item) => typeof item === "string");

  return (
    <div className="p-4 bg-white rounded-xl shadow-md overflow-auto px-20">
      <h2 className="text-xl font-bold mb-4">Ashtakoot Matching Table</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-black bg-gradient-to-t from-[#FFA600] to-[#FBFF00]">
            <th className="border px-2 py-2">Attribute</th>
            <th className="border px-2 py-2">Male</th>
            <th className="border px-2 py-2">Female</th>
            <th className="border px-2 py-2">Received</th>
            <th className="border px-2 py-2"> Of</th>
            <th className="border px-2 py-2">Area of Life</th>
            <th className="border px-2 py-2">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            if (typeof item !== "object") return null;

            const name = item.name;
            const male =
              item[`boy_${name?.toLowerCase()}`] ||
              item[`boy_rasi_name`] ||
              item[`boy_lord`] ||
              "-";

            const female =
              item[`girl_${name?.toLowerCase()}`] ||
              item[`girl_rasi_name`] ||
              item[`girl_lord`] ||
              "-";

            const received =
              item[name?.toLowerCase()] ||
              item.bhakoot ||
              item.grahamaitri ||
              0;

            const fullScore = item.full_score || 0;
            const description = item.description || "-";

            return (
              <tr key={index}>
                <td className="border px-2 py-2 font-semibold">{name}</td>
                <td className="border px-2 py-2">{male}</td>
                <td className="border px-2 py-2">{female}</td>
                <td className="border px-2 py-2">{received}</td>
                <td className="border px-2 py-2">{fullScore}</td>
                <td className="border px-2 py-2">{description}</td>
                <td className="border px-2 py-2">
                  {" "}
                  {meanings[name?.trim()] || "—"}
                </td>
              </tr>
            );
          })}
          <tr className="font-semibold">
            <td className="border px-2 py-1">Total</td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1 text-yellow-400">{totalScore}</td>
            <td className="border px-2 py-1 text-yellow-400">36</td>
            <td className="border px-2 py-1"></td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 p-4 text-center  rounded-lg text-black bg-gradient-to-t from-[#FFA600] to-[#FBFF00]">
        {message}
      </p>
    </div>
  );
};

export default CompatibilityTable;
