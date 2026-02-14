import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import BannerImage from "../../assets/image/BannerImage.png";
import { astroContext } from "../../context/astroContext";
import Select from "react-select";
import { Button, IconButton } from "@mui/material";
import AddUpdateLoader from "../Loaders/AddUpdateLoader";

const PanditBanner = ({ panditsRef }) => {
  const { setAvailPandits, setBookingData, poojas } = useContext(astroContext);

  const [submitLoader, setSubmitLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [formData, setFormData] = useState({
    nameOfPooja: "",
    poojaid: "",
    pincode: "",
  });

  // const panditsRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setBookingData((prev) => ({ ...prev, date: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPooja || !formData.pincode || !selectedDate) {
      return;
    }

    // Save pooja name in localStorage
    localStorage.setItem("nameOfPooja", formData.nameOfPooja);

    // Prepare booking data for context
    const poojaDetails = {
      pincode: formData.pincode,
      poojaid: selectedPooja.value,
      poojadate: selectedDate,
    };

    // Save poojaid and date in context
    setBookingData((prev) => ({
      ...prev,
      poojaid: selectedPooja.value,
      date: selectedDate,
      pinCode: formData.pincode,
    }));

    try {
      setSubmitLoader(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/getavailablepandit`,
        poojaDetails,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setAvailPandits(res?.data?.data);
      }

      // Optionally, save the entire poojaDetails in localStorage if needed
      localStorage.setItem("poojaDetails", JSON.stringify(poojaDetails));

      // Reset form
      setFormData({ nameOfPooja: "", poojaid: "", pincode: "" });
      setSelectedPooja("");
      setSelectedDate("");
      const section = document.getElementById("availablePandits");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error booking pandit:", error);
      alert("Something went wrong while booking the pandit.");
    } finally {
      setSubmitLoader(false);
      panditsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formattedOptions = poojas.map((pooja) => ({
    value: pooja._id,
    label: pooja.poojaName,
  }));

  return (
    <div
      className="relative bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 text-center text-white max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Book A Pandit For Your Sacred Rituals
        </h1>
        <form
          className="bg-white rounded-lg shadow-lg p-6 text-black mx-2 sm:mx-0"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md mb-4">
            <Select
              required
              options={formattedOptions}
              value={selectedPooja}
              onChange={setSelectedPooja}
              placeholder="Search pooja..."
              isSearchable
              styles={{
                control: (base, state) => ({
                  ...base,
                  textAlign: "left",
                  width: "100%",
                  borderColor: "#D1D5DB", // Tailwind: border-gray-300
                  borderRadius: "0.375rem", // Tailwind: rounded-md
                  padding: "0.25rem", // Tailwind: p-2 (outer padding effect)
                  boxShadow: state.isFocused ? "0 0 0 2px #FACC15" : "", // Tailwind: ring-2 ring-yellow-500
                  "&:hover": {
                    borderColor: "#D1D5DB",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#FACC15" // Selected option: yellow-400
                    : state.isFocused
                      ? "#FEF3C7" // Hovered option: yellow-100
                      : "white",
                  color: state.isSelected ? "black" : "#92400E", // Text color (optional)
                  cursor: "pointer",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: "0.375rem",
                  overflow: "hidden",
                  textAlign: "left",
                  maxHeight: "200px",
                }),
              }}
            />
          </div>

          <div className="mb-4">
            <input
              required
              type="text"
              name="pincode"
              placeholder="Enter Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full  border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <input
              required
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full capitalize my-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded flex justify-center items-center
               ${submitLoader ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={submitLoader}
          >
            Submit
            {submitLoader && <AddUpdateLoader />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PanditBanner;
