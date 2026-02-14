// src/NumerologyCalculator.jsx
import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User, Users, Building, Heart, UserCheck } from "lucide-react";

import HeaderSection from "../components/Numerology/HeroSection";
import CategoryTabs from "../components/Numerology/CategoryTabs";
import SubTabs from "../components/Numerology/SubTabs";
import IndividualAnalysisForm from "../components/Numerology/IndividualAnalysisForm";
import PersonToPersonForm from "../components/Numerology/PersonToPersonForm";
import MaleFemaleForm from "../components/Numerology/MaleFemaleForm";
import NameToNameForm from "../components/Numerology/NameToNameForm";
import PartnershipForm from "../components/Numerology/PartnershipForm";
import IndividualCompanyForm from "../components/Numerology/IndividualCompanyForm";
import PartnerCompanyForm from "../components/Numerology/PartnerCompanyForm";
import CalculateButton from "../components/Numerology/CalculateButton";
import DivineNamingForm from "../components/Numerology/DeviniNamingForm";
import { NumerologyContext } from "../context/NumerologyContext";
import axios from "axios";

export default function NumerologyCalculator() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("personal");
  const [activeTab, setActiveTab] = useState("individual-analysis");

  const {
    formData,
    setFormData,
    setIndividualData,
    individualData,
    partners,
    setPartners,
    calculateNumerology,
    partnerCompanyData,
    setCompanyIndividualData,
    setNameData,
    partnerData,
    setPartnerData,
    nameData,
    loading,
    error,
    setM2FData,
    setError,
    setLoading,
    fetchIndividualNumerologyData,

    setP2PData,
    setPartnerCompanyData,
  } = useContext(NumerologyContext);
  useEffect(() => {
    // check the url #individual and set the activeTab accordingly
    const hash = window.location.hash;
    if (hash === "#personal-numerology") {
      setActiveCategory("personal");
      setActiveTab("individual-analysis");
    } else if (hash === "#professional-numerology") {
      setActiveCategory("professional");
      setActiveTab("partnership");
    } else if (hash === "#divine-naming") {
      setActiveCategory("divine-naming");
      setActiveTab("divine-naming");
    } else {
      setActiveCategory("personal");
      setActiveTab("individual-analysis");
    }
  }, [window.location.hash]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handlenumerologysubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeCategory === "personal") {
        if (activeTab === "individual-analysis") {
          const { name, dob } = formData.individual;
          if (!dob) throw new Error("DOB is required");
          const [yyyy, mm, dd] = dob.split("-");
          const requestData = { DD: dd, MM: mm, YYYY: yyyy, fullName: name };
          const url = `${import.meta.env.VITE_BACKEND_URL
            }api/numerlogy/getNumberFromDOB`;
          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setIndividualData(response.data.data);
            navigate("/numerology");
          }
        } else if (activeTab === "person-to-person") {
          const { name: name1, dob: dob1 } = formData.person1;
          const { name: name2, dob: dob2 } = formData.person2;
          if (!dob1 || !dob2) throw new Error("Both DOBs are required");
          const [yyyy1, mm1, dd1] = dob1.split("-");
          const [yyyy2, mm2, dd2] = dob2.split("-");
          const requestData = {
            dd: dd1,
            mm: mm1,
            yyyy: yyyy1,
            dd2,
            mm2,
            yyyy2,
            name1,
            name2,
          };
          const url = `${import.meta.env.VITE_BACKEND_URL}api/compatiblityP2P`;
          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setP2PData(response.data);
            navigate("/numerologyreport");
          }
        } else if (activeTab === "male-female") {
          const { name: name1, dob: dob1 } = formData.male;
          const { name: name2, dob: dob2 } = formData.female;
          if (!dob1 || !dob2)
            throw new Error("Both male and female DOBs are required");
          const [yyyy, mm, dd] = dob1.split("-");
          const [yyyy2, mm2, dd2] = dob2.split("-");
          const requestData = { dd, mm, yyyy, dd2, mm2, yyyy2, name1, name2 };
          const url = `${import.meta.env.VITE_BACKEND_URL
            }api/compatiblityMAndF`;
          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setM2FData(response.data.data);
            navigate("/male-female-report");
          }
        } else if (activeTab === "name-to-name") {
          if (!formData?.person1 || !formData?.person2) {
            throw new Error("Please fill both names.");
          }

          const { name: name1 } = formData.person1 || {};
          const { name: name2 } = formData.person2 || {};

          if (!name1 || !name2) {
            throw new Error("Both names are required.");
          }

          const requestData = { name1, name2 };
          const url = `${import.meta.env.VITE_BACKEND_URL}api/nametoname`;
          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setNameData(response.data.data);
            navigate("/name-to-name-compatibility");
          }
        }
      } else if (activeCategory === "professional") {
        if (activeTab === "partnership") {
          const individuals = formData.individuals || [];
          for (let person of individuals) {
            if (!person.name || !person.dob) {
              throw new Error("Each person must have a name and DOB");
            }
          }
          const personInfo = partners.map(({ name, dob }) => {
            const [yyyy, mm, dd] = dob.split("-");
            return {
              name,
              DOB: `${dd}-${mm}-${yyyy}`,
            };
          });
          const requestData = { personInfo };
          const url = `${import.meta.env.VITE_BACKEND_URL
            }api/compatiblityBetweenMultiplePerson`;
          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setPartnerData(response.data);
            navigate("/partner-compatibility");
          }
        } else if (activeTab === "individual-company") {
          const { name: personName, dob } = formData.individual;
          const { name: companyName } = formData.company;

          if (!dob) throw new Error("DOB is required");

          const [yyyy, mm, dd] = dob.split("-");
          const formattedDOB = `${dd}-${mm}-${yyyy}`;

          const requestData = {
            personName,
            companyName,
            DOB: formattedDOB,
          };
          const url = `${import.meta.env.VITE_BACKEND_URL
            }api/compatiblityBetweenPersonAndCompanyWithNameAndDOB`;
          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setCompanyIndividualData(response.data);
            navigate("/compatibility-person&company");
          }
        } else if (activeTab === "partner-company") {
          const { name: companyName } = formData.company; // changed from companyName: name2
          if (!companyName) throw new Error("Company name is required");

          const personInfo = partners.map(({ name, dob }) => {
            const [yyyy, mm, dd] = dob.split("-");
            return {
              name,
              DOB: `${dd}-${mm}-${yyyy}`,
            };
          });

          const requestData = {
            companyName,
            personInfo,
          };
          const url = `${import.meta.env.VITE_BACKEND_URL
            }api/compatiblityBetweenMultiplePersonAndCompanyWithName`;

          const response = await axios.post(url, requestData);
          if (response.status === 200) {
            setPartnerCompanyData(response.data.data);
            navigate("/compatibility-partner&company");
          }
        }
      } else {
        navigate("/numerology");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const personalTabs = [
    { id: "individual-analysis", icon: User, label: "Individual Analysis" },
    { id: "person-to-person", icon: Users, label: "Person to Person" },
    { id: "male-female", icon: Heart, label: "Male & Female" },
    { id: "name-to-name", icon: UserCheck, label: "Name to Name" },
  ];

  const professionalTabs = [
    { id: "partnership", icon: Users, label: "Partnership" },
    { id: "individual-company", icon: Building, label: "Individual & Company" },
    { id: "partner-company", icon: Building, label: "Partner & Company" },
  ];
  const DivineNaming = [
    { id: "divine-naming", icon: Users, label: "Divine Naming" },
  ];
  const currentTabs =
    activeCategory === "personal"
      ? personalTabs
      : activeCategory === "professional"
        ? professionalTabs
        : DivineNaming;

  const renderPersonalContent = () => {
    switch (activeTab) {
      case "individual-analysis":
        return (
          <IndividualAnalysisForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "person-to-person":
        return (
          <PersonToPersonForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "male-female":
        return (
          <MaleFemaleForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "name-to-name":
        return (
          <NameToNameForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  const renderProfessionalContent = () => {
    switch (activeTab) {
      case "partnership":
        return (
          <PartnershipForm
            partners={partners}
            handleAddPartner={() => {
              if (partners.length < 10)
                setPartners([...partners, { name: "", dob: "" }]);
            }}
            handleRemovePartner={(index) => {
              if (partners.length > 1)
                setPartners(partners.filter((_, i) => i !== index));
            }}
            handlePartnerChange={(index, field, value) => {
              const updatedPartners = [...partners];
              updatedPartners[index][field] = value;
              setPartners(updatedPartners);
              console.log("Partners updated:", updatedPartners);
            }}
          />
        );
      case "individual-company":
        return (
          <IndividualCompanyForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "partner-company":
        return (
          <PartnerCompanyForm
            partners={partners}
            handleAddPartner={() => {
              if (partners.length < 10)
                setPartners([...partners, { name: "", dob: "" }]);
            }}
            handleRemovePartner={(index) => {
              if (partners.length > 1)
                setPartners(partners.filter((_, i) => i !== index));
            }}
            handlePartnerChange={(index, field, value) => {
              const newPartners = [...partners];
              newPartners[index][field] = value;
              setPartners(newPartners);
            }}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  const renderDivineNamingContent = () => {
    switch (activeTab) {
      case "divine-naming":
        return (
          <DivineNamingForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };



  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <HeaderSection />

        <CategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setError={setError}
        />

        <SubTabs
          currentTabs={currentTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setError={setError}
        />

        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeCategory === "personal"
            ? renderPersonalContent()
            : activeCategory === "professional"
              ? renderProfessionalContent()
              : renderDivineNamingContent()}

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          <CalculateButton onClick={handlenumerologysubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}
