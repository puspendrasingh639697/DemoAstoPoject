import { Heart, Calendar, User } from "lucide-react";
import { NumerologyContext } from "../context/NumerologyContext";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

function getCompatibilityColor(score) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
}

function getCompatibilityBadge(score) {
  if (score >= 80)
    return { color: "bg-green-100 text-green-800", label: "Highly Compatible" };
  if (score >= 60)
    return { color: "bg-yellow-100 text-yellow-800", label: "Compatible" };
  if (score >= 40)
    return {
      color: "bg-orange-100 text-orange-800",
      label: "Moderately Compatible",
    };
  return { color: "bg-red-100 text-red-800", label: "Not Compatible" };
}

export default function PartnesCompatibility() {
  const [selectedPerson, setSelectedPerson] = useState("John");
  const [reportData, setReportData] = useState(null);
  const { partnerData } = useContext(NumerologyContext);

  const compatibilityData = partnerData;
  if (!partnerData) {
    return <Navigate to="/numerology-calculator" />;
  }

  useEffect(() => {
    if (compatibilityData) {
      setReportData(compatibilityData);
      console.log(compatibilityData);
    }
  }, [compatibilityData]);

  if (!reportData) {
    return (
      <p className="text-center mt-10">
        No report data found. Please generate a report first.
      </p>
    );
  }

  const persons = compatibilityData.data.persons;
  const compatibility = compatibilityData.data.compaitibility;

  const selectedPersonData = compatibility.find(
    (comp) => comp.compatibilityOfAllWith === selectedPerson
  );

  return (
    <div className="min-h-screen bg-yellow-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Partners Compatibility
            </h1>
          </div>
          <p className="text-gray-600">
            Select a person to view their compatibility with others
          </p>
        </div>

        {/* Person Selection */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-6">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-yellow-500">
              Select Person
            </h2>
          </div>

          {/* Person Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {persons.map((person) => (
              <div
                key={person.name}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPerson === person.name
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPerson(person.name)}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{person.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {person.DOB}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility Results */}
        {selectedPersonData && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedPerson}
                {"'s"} Compatibility Results
              </h2>
            </div>

            <div className="space-y-6">
              {selectedPersonData.personsScrore.map((score, index) => {
                const badge = getCompatibilityBadge(
                  score.personScore.TotalScore
                );

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition hover:shadow-md"
                  >
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {score.personName1} & {score.personName2}
                          </h3>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {score.personScore.TotalScore}%
                        </div>
                        {/* Custom Progress Bar */}
                        <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                          <div
                            className="h-2 bg-yellow-500 rounded-full"
                            style={{
                              width: `${score.personScore.TotalScore}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Body Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Compatibility Statement */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Compatibility Analysis
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {score.personScore.TotalScoreStatement_EN}
                        </p>
                      </div>

                      {/* Numerological Details */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Numerological Details
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Radical Number:
                            </span>
                            <span className="font-medium">
                              {score.personScore.radicalNumber1} &{" "}
                              {score.personScore.radicalNumber2}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lucky Number:</span>
                            <span className="font-medium">
                              {score.personScore.luckyNumber1} &{" "}
                              {score.personScore.luckyNumber2}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name Number:</span>
                            <span className="font-medium">
                              {score.personScore.NameNumber1} &{" "}
                              {score.personScore.NameNumber2}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name Initial:</span>
                            <span className="font-medium">
                              {score.personScore.NameInitial1} &{" "}
                              {score.personScore.NameInitial2}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 mt-4 space-y-1 text-sm text-gray-700">
                      {[
                        score.personScore.result_INL_Name_STMT_EN,
                        score.personScore.result_INL_Dob_STMT_EN,
                        score.personScore.result_Full_Name_STMT_EN,
                        score.personScore.result_Full_Dob_STMT_EN,
                        score.personScore.result_INL_DOB_FULL_DOB_STMT_EN,
                        score.personScore.result_INL_DOB_INL_NAME_STMT_EN,
                        score.personScore.result_INL_DOB_FULL_NAME_STMT_EN,
                        score.personScore.result_INL_NAME_INL_DOB_STMT_EN,
                        score.personScore.result_INL_Name_FULL_DOB_STMT_EN,
                        score.personScore.result_INL_NAME_FULL_NAME_STMT_EN,
                      ]
                        .filter(Boolean) // Ensure only non-null, non-undefined statements are shown
                        .map((stmt, i) => (
                          <p key={i}>• {stmt}</p>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Compatibility Matrix */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Compatibility Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left font-medium text-gray-900 border-b">
                    Person
                  </th>
                  {persons.map((person) => (
                    <th
                      key={person.name}
                      className="p-3 text-center font-medium text-gray-900 border-b min-w-[80px]"
                    >
                      {person.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {persons.map((person1) => (
                  <tr key={person1.name} className="border-t">
                    <td className="p-3 font-medium text-gray-900">
                      {person1.name}
                    </td>
                    {persons.map((person2) => {
                      if (person1.name === person2.name) {
                        return (
                          <td key={person2.name} className="p-3 text-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto text-gray-500">
                              -
                            </div>
                          </td>
                        );
                      }

                      const personData = compatibility.find(
                        (comp) => comp.compatibilityOfAllWith === person1.name
                      );
                      const scoreData = personData?.personsScrore.find(
                        (score) => score.personName2 === person2.name
                      );
                      const score = scoreData?.personScore.TotalScore || 0;

                      return (
                        <td key={person2.name} className="p-3 text-center">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto text-white font-bold text-sm ${getCompatibilityColor(
                              score
                            )}`}
                            title={`${person1.name} & ${person2.name}: ${score}%`}
                          >
                            {score}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Highly Compatible (80–100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Compatible (60–79)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Moderately Compatible (40–59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Not Compatible (0–39)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
