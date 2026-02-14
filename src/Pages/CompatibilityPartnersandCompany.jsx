import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NumerologyContext } from "../context/NumerologyContext";
import { Navigate } from "react-router-dom";
export default function CompatibilityPartnersandCompany() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { partnerCompanyData } = useContext(NumerologyContext);
  const [data, setData] = useState(null);

  const personDOBMap = new Map(
    (data?.persons || []).map((p) => [p.name, p.DOB])
  );

  const handleViewDetails = (person) => {
    setSelectedPerson(person);
    setIsDialogOpen(true);
  };

  const scoreFields = [
    { key: "personInitial", label: "Person Initial" },
    { key: "companyInitial", label: "Company Initial" },
    { key: "personFull", label: "Person Full" },
    { key: "companyFull", label: "Company Full" },
    { key: "personRadical", label: "Person Radical" },
    { key: "personLucky", label: "Person Lucky" },
    { key: "result_INL_Name", label: "Result INL Name" },
    { key: "result_Full_Name", label: "Result Full Name" },
    { key: "result_INL_CompFull", label: "Result INL Comp Full" },
    { key: "result_Full_CompInitial", label: "Result Full Comp Initial" },
    { key: "result_INL_DOB_INL_COMP", label: "Result INL DOB INL Comp" },
    { key: "result_FULL_DOB_INL_COMP", label: "Result Full DOB INL Comp" },
    { key: "result_INL_DOB_FULL_COMP", label: "Result INL DOB Full Comp" },
    { key: "result_FULL_DOB_FULL_COMP", label: "Result Full DOB Full Comp" },
  ];

  useEffect(() => {
    setData(partnerCompanyData);
    console.log(partnerCompanyData);
  }, [partnerCompanyData]);
  if (!partnerCompanyData) {
    return <Navigate to="/numerology" />;
  } else {
    return (
      <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white text-center">
            {data?.companyName && (
              <h1 className="text-3xl font-bold">
                Compatibility Report for{" "}
                <span className="text-yellow-100">{data?.companyName}</span>
              </h1>
            )}
          </div>

          <div className="p-6">
            <p className="text-center text-gray-600 mb-6">
              Detailed compatibility scores for individuals within your
              organization.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-yellow-100 text-orange-700">
                    <th className="p-3 text-left font-semibold">Name</th>
                    <th className="p-3 text-left font-semibold">
                      Compatibility
                    </th>
                    <th className="p-3 text-right font-semibold">Score</th>
                    <th className="p-3 text-center font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.compaitibility.map((person) => (
                    <tr
                      key={person?.name}
                      className="border-b hover:bg-yellow-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {person?.name}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="relative w-full bg-yellow-200 h-3 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-700"
                              style={{
                                width: `${
                                  person?.percentage?.toFixed(1) ?? 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-orange-600">
                            {person?.percentage?.toFixed(1) ?? "0.0"}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right text-gray-700">
                        <span className="font-semibold">
                          {person.TotalScore ?? "--"}
                        </span>{" "}
                        / {person.OutOF ?? "--"}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleViewDetails(person)}
                          className="px-3 py-1 text-sm font-semibold border border-orange-400 text-orange-600 rounded hover:bg-orange-100 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dialog */}
        {isDialogOpen && selectedPerson && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative">
              <button
                className="absolute top-3 right-4 text-gray-500 hover:text-orange-600 text-xl"
                onClick={() => setIsDialogOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-orange-700 mb-1">
                Detailed Compatibility for {selectedPerson.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Date of Birth:{" "}
                <span className="text-orange-500 font-medium">
                  {personDOBMap.get(selectedPerson.name) ?? "N/A"}
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {scoreFields.map((field) => (
                  <div
                    key={field.key}
                    className="flex justify-between border-b border-yellow-100 pb-1 text-sm"
                  >
                    <span className="text-orange-600 font-medium">
                      {field.label}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {selectedPerson[field.key] ?? "N/A"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-orange-200 text-lg font-bold text-orange-800">
                <div className="flex justify-between mb-2">
                  <span>Total Score:</span>
                  <span>
                    {selectedPerson.TotalScore ?? "--"} /{" "}
                    {selectedPerson.OutOF ?? "--"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Overall Percentage:</span>
                  <span>{selectedPerson.percentage?.toFixed(1) ?? "0.0"}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
