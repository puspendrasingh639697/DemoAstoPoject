import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner2 from "../../assets/image/Banner2.png";
import { useNavigate } from "react-router-dom";

const PanditBanner = () => {
  const [templeOptions, setTempleOptions] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [poojaOptions, setPoojaOptions] = useState({});
  const [filteredPoojaOptions, setFilteredPoojaOptions] = useState([]);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [templeDetails, setTempleDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/getAllTemples`
        );

        console.log(response.data);

        setTempleDetails(response.data);
        const templeOptions = response.data.map((temple) => ({
          value: temple.name,
          label: temple.name,
        }));
        setTempleOptions(templeOptions);

        const poojaData = response.data.reduce((acc, temple) => {
          acc[temple.name] = temple.relatedPooja.map((pooja) => ({
            value: pooja.PoojaName,
            label: pooja.PoojaName,
          }));
          return acc;
        }, {});
        setPoojaOptions(poojaData);
      } catch (error) {
        console.error("Error fetching temples:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  useEffect(() => {
    if (selectedTemple) {
      setFilteredPoojaOptions(poojaOptions[selectedTemple.value] || []);
    } else {
      setFilteredPoojaOptions([]);
    }
  }, [selectedTemple, poojaOptions]);

  const handleTempleChange = (event) => {
    const selected = templeOptions.find(
      (option) => option.value === event.target.value
    );
    setSelectedTemple(selected);
  };

  const handlePoojaChange = (event) => {
    const selected = filteredPoojaOptions.find(
      (option) => option.value === event.target.value
    );
    setSelectedPooja(selected);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedTemple || !selectedPooja || !selectedDate) {
      alert("Please select all the fields before submitting.");
      return;
    }

    const selectedTempleData = templeDetails.find(
      (temple) => temple.name === selectedTemple.value
    );

    if (!selectedTempleData) {
      alert("Temple data not found.");
      return;
    }

    const selectedPoojaData = selectedTempleData.relatedPooja.find(
      (pooja) => pooja.PoojaName === selectedPooja.value
    );

    if (!selectedPoojaData) {
      alert("Pooja data not found.");
      return;
    }

    const formData = {
      templeID: selectedTempleData._id,
      templeName: selectedTempleData.name,
      poojaID: selectedPoojaData.PoojaID,
      poojaName: selectedPoojaData.PoojaName,
      selectedDate: selectedDate,
    };

    console.log("Form Data:", formData);

    const filteredTempleData = {
      ...selectedTempleData,
      selectedDate: formData.selectedDate,
      poojaID: formData.poojaID,
      poojaName: formData.poojaName,
    };

    console.log(
      "Filtered Temple Data with Date and Pooja Info:",
      filteredTempleData
    );

    navigate("/poojaprofile", { state: { filteredTempleData } });
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen flex items-center justify-center px-2"
      style={{
        backgroundImage: `url(${Banner2})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Perform Poojas Remotely at Prestigious Temples
        </h1>
        <form
          className="bg-white rounded-lg shadow-lg p-6 text-black"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 border-black">
            <select
              className="w-full border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={selectedTemple?.value || ""}
              onChange={handleTempleChange}
            >
              <option value="" disabled>
                Select Temple
              </option>
              {templeOptions.map((temple) => (
                <option key={temple.value} value={temple.value}>
                  {temple.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              className="w-full border-black border-2-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={selectedPooja?.value || ""}
              onChange={handlePoojaChange}
              disabled={!selectedTemple}
            >
              <option value="" disabled>
                Select Pooja
              </option>
              {filteredPoojaOptions.map((pooja) => (
                <option key={pooja.value} value={pooja.value}>
                  {pooja.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="date"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <button
            type="submit"
            className="px-6 bg-yellow-500 text-white font-bold py-2 rounded-md hover:bg-yellow-600"
          >
            Book a Pooja
          </button>
        </form>
      </div>
    </div>
  );
};

export default PanditBanner;
