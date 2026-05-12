// import axios from "axios";
// import React, { createContext, useState, useEffect } from "react";

// export const NumerologyContext = createContext();

// function NumerologyContextProvider({ children }) {
//   const [individualData, setIndividualData] = useState(null);
//   const [p2pData, setP2PData] = useState(null);
//   const [m2fData, setM2FData] = useState(null);
//   const [companyIndividualData, setCompanyIndividualData] = useState(null);
//   const [partnerCompanyData, setPartnerCompanyData] = useState(null);
//   const [nameData, setNameData] = useState(null);
//   const [partnerData, setPartnerData] = useState(null);
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const [formData, setFormData] = useState({
//     individual: { name: "", dob: "" },
//     person1: { name: "", dob: "" },
//     person2: { name: "", dob: "" },
//     male: { name: "", dob: "" },
//     female: { name: "", dob: "" },
//     person1: { name: "" },
//     person2: { name: "" },
//     company: { name: "" },
//     divineNaming: {
//       dob: "",
//       place:"",
//       time: "",
//     },
//   });

//   const [partners, setPartners] = useState([
//     { name: "", dob: "" },
//     { name: "", dob: "" },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {}, [individualData]);

//   // Partnership
//   const calculatePartnership = async () => {
//     const requestData = { type: "partnership", partners };
//     const url = "YOUR_PARTNERSHIP_API_ENDPOINT";
//     return axios.post(url, requestData);
//   };

//   // Individual-Company
//   const calculateIndividualCompany = async () => {
//     const requestData = {
//       type: "individualCompany",
//       individualName: formData.individual.name,
//       individualDob: formData.individual.dob,
//       companyName: formData.company.name,
//     };
//     const url = "YOUR_INDIVIDUAL_COMPANY_API_ENDPOINT";
//     return axios.post(url, requestData);
//   };

//   // Main dispatcher
//   const calculateNumerology = async (activeCategory, activeTab) => {
//     setLoading(true);
//     setError(null);

//     const calculationMap = {
//       personal: {
//         "individual-analysis": calculateIndividualAnalysis,
//         "person-to-person": calculatePersonToPerson,
//         "male-female": calculateMaleFemale,
//       },
//       professional: {
//         partnership: calculatePartnership,
//         "individual-company": calculateIndividualCompany,
//       },
//     };

//     try {
//       const categoryMap = calculationMap[activeCategory];
//       const calculateFn = categoryMap?.[activeTab];

//       if (!calculateFn) throw new Error("Invalid category or tab");

//       const response = await calculateFn();
//       setIndividualData(response.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const numerologyContextData = {
//     // fetchIndividualNumerologyData,
//     calculateNumerology,
//     individualData,
//     setIndividualData,
//     setP2PData,
//     p2pData,
//     setM2FData,
//     m2fData,
//     formData,
//     setFormData,
//     companyIndividualData,
//     setCompanyIndividualData,
//     partnerCompanyData,
//     setPartnerCompanyData,
//     setNameData,
//     nameData,
//     partnerData,
//     setPartnerData,
//     partners,
//     setPartners,
//     loading,
//     error,
//     setError,
//     setLoading,
//   };

//   return (
//     <NumerologyContext.Provider value={numerologyContextData}>
//       {children}
//     </NumerologyContext.Provider>
//   );
// }

// export default NumerologyContextProvider;

import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const NumerologyContext = createContext();

function NumerologyContextProvider({ children }) {
  const [individualData, setIndividualData] = useState(null);
  const [p2pData, setP2PData] = useState(null);
  const [m2fData, setM2FData] = useState(null);
  const [companyIndividualData, setCompanyIndividualData] = useState(null);
  const [partnerCompanyData, setPartnerCompanyData] = useState(null);
  const [nameData, setNameData] = useState(null);
  const [partnerData, setPartnerData] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  const [formData, setFormData] = useState({
    individual: { name: "", dob: "" },
    person1: { name: "", dob: "" },
    person2: { name: "", dob: "" },
    male: { name: "", dob: "" },
    female: { name: "", dob: "" },
    company: { name: "" },
    divineNaming: {
      dob: "",
      place: "",
      time: "",
    },
  });

  const [partners, setPartners] = useState([
    { name: "", dob: "" },
    { name: "", dob: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, [individualData]);

  // Partnership
  const calculatePartnership = async () => {
    const requestData = { type: "partnership", partners };
    const url = "YOUR_PARTNERSHIP_API_ENDPOINT";
    return axios.post(url, requestData);
  };

  // Individual-Company
  const calculateIndividualCompany = async () => {
    const requestData = {
      type: "individualCompany",
      individualName: formData.individual.name,
      individualDob: formData.individual.dob,
      companyName: formData.company.name,
    };
    const url = "YOUR_INDIVIDUAL_COMPANY_API_ENDPOINT";
    return axios.post(url, requestData);
  };

  // Individual Analysis
  const calculateIndividualAnalysis = async () => {
    const requestData = {
      type: "individual",
      name: formData.individual.name,
      dob: formData.individual.dob,
    };
    const url = `${BACKEND_URL}/api/numerology/individual`;
    return axios.post(url, requestData);
  };

  // Person to Person
  const calculatePersonToPerson = async () => {
    const requestData = {
      type: "personToPerson",
      person1: formData.person1,
      person2: formData.person2,
    };
    const url = `${BACKEND_URL}/api/numerology/person-to-person`;
    return axios.post(url, requestData);
  };

  // Male Female
  const calculateMaleFemale = async () => {
    const requestData = {
      type: "maleFemale",
      male: formData.male,
      female: formData.female,
    };
    const url = `${BACKEND_URL}/api/numerology/male-female`;
    return axios.post(url, requestData);
  };

  // Main dispatcher
  const calculateNumerology = async (activeCategory, activeTab) => {
    setLoading(true);
    setError(null);

    const calculationMap = {
      personal: {
        "individual-analysis": calculateIndividualAnalysis,
        "person-to-person": calculatePersonToPerson,
        "male-female": calculateMaleFemale,
      },
      professional: {
        partnership: calculatePartnership,
        "individual-company": calculateIndividualCompany,
      },
    };

    try {
      const categoryMap = calculationMap[activeCategory];
      const calculateFn = categoryMap?.[activeTab];

      if (!calculateFn) throw new Error("Invalid category or tab");

      const response = await calculateFn();
      
      // Set data based on tab
      if (activeTab === "individual-analysis") setIndividualData(response.data);
      if (activeTab === "person-to-person") setP2PData(response.data);
      if (activeTab === "male-female") setM2FData(response.data);
      if (activeTab === "individual-company") setCompanyIndividualData(response.data);
      if (activeTab === "partnership") setPartnerCompanyData(response.data);
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const numerologyContextData = {
    calculateNumerology,
    individualData,
    setIndividualData,
    setP2PData,
    p2pData,
    setM2FData,
    m2fData,
    formData,
    setFormData,
    companyIndividualData,
    setCompanyIndividualData,
    partnerCompanyData,
    setPartnerCompanyData,
    setNameData,
    nameData,
    partnerData,
    setPartnerData,
    partners,
    setPartners,
    loading,
    error,
    setError,
    setLoading,
  };

  return (
    <NumerologyContext.Provider value={numerologyContextData}>
      {children}
    </NumerologyContext.Provider>
  );
}

export default NumerologyContextProvider;
