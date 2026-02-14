import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { kundaliContext } from "../../context/KundaliContext";
import PlacesAutocomplete from "../Kundali/PlacesAutocomplete";
import AlertCard from "../UserDashboardSection/AlertCard";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HoroscopeMatchingForm = () => {
  const { kundaliMatchError, fetchKundliMatchData } = useContext(kundaliContext);
  const [boyDetails, setBoyDetails] = useState({
    fullname: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    second: "0",
  });

  const [girlDetails, setGirlDetails] = useState({
    fullname: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    second: "0",
  });

  const [boySelectedPlace, setBoySelectedPlace] = useState(null);
  const [girlSelectedPlace, setGirlSelectedPlace] = useState(null);
  const [boyerrors, setBoyerrors] = useState({});
  const [girlerrors, setGirlerrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e, setDetails) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e, setDetails) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    setDetails((prev) => ({
      ...prev,
      day,
      month,
      year,
    }));
  };

  const handleTimeChange = (e, setDetails) => {
    const [hour, minute] = e.target.value.split(":");
    setDetails((prev) => ({
      ...prev,
      hour,
      minute,
      second: "0",
    }));
  };

  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === parseInt(year) &&
      date.getMonth() === month - 1 &&
      date.getDate() === parseInt(day)
    );
  };

  const isValidTime = (hour, minute, second) => {
    const h = parseInt(hour),
      m = parseInt(minute),
      s = parseInt(second);
    return (
      !isNaN(h) &&
      !isNaN(m) &&
      !isNaN(s) &&
      h >= 0 &&
      h < 24 &&
      m >= 0 &&
      m < 60 &&
      s >= 0 &&
      s < 60
    );
  };

  const ValidateForm = () => {
    const newBoyerrors = {};
    const newGirlerrors = {};

    if (!boyDetails.fullname.trim()) newBoyerrors.name = "Name is required";
    if (!isValidDate(boyDetails.day, boyDetails.month, boyDetails.year))
      newBoyerrors.date = "Enter a valid birth date";
    if (!isValidTime(boyDetails.hour, boyDetails.minute, boyDetails.second))
      newBoyerrors.time = "Enter a valid birth time";
    if (!boySelectedPlace) newBoyerrors.birthPlace = "Birth place is required";

    if (!girlDetails.fullname.trim()) newGirlerrors.name = "Name is required";
    if (!isValidDate(girlDetails.day, girlDetails.month, girlDetails.year))
      newGirlerrors.date = "Enter a valid birth date";
    if (!isValidTime(girlDetails.hour, girlDetails.minute, girlDetails.second))
      newGirlerrors.time = "Enter a valid birth time";
    if (!girlSelectedPlace)
      newGirlerrors.birthPlace = "Birth place is required";

    return { newBoyerrors, newGirlerrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newBoyerrors, newGirlerrors } = ValidateForm();
    setBoyerrors(newBoyerrors);
    setGirlerrors(newGirlerrors);

    if (
      Object.keys(newBoyerrors).length === 0 &&
      Object.keys(newGirlerrors).length === 0
    ) {
      const details = {
        boy: { ...boyDetails, ...boySelectedPlace },
        girl: { ...girlDetails, ...girlSelectedPlace },
      };
      await fetchKundliMatchData(details);
      navigate("/match-report");
    }
  };

  const renderFields = (label, details, setDetails, errors, setSelectedPlace) => {
    const today = new Date().toISOString().split("T")[0];

    return (
      <div className="border rounded-lg p-4">
        <div className="bg-yellow-400 text-black text-center py-2 rounded mb-4">
          {label}'s Detail
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="fullname"
            value={details.fullname}
            onChange={(e) => handleInputChange(e, setDetails)}
            placeholder="Enter name"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="mb-2">
          <label className="block text-xs mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-2 text-sm"
            onChange={(e) => handleDateChange(e, setDetails)}
            max={today}
            min="1900-01-01"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        <div className="mb-2">
          <label className="block text-xs mb-1">Time of Birth</label>
          <input
            type="time"
            value={
              details.hour && details.minute
                ? `${String(details.hour).padStart(2, "0")}:${String(details.minute).padStart(2, "0")}`
                : ""
            }
            onChange={(e) => handleTimeChange(e, setDetails)}
            className="w-full border rounded px-2 py-2 text-sm"
          />
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
        </div>

        <div className="mb-2">
          <label className="block text-sm mb-1">Birth Place</label>
          <PlacesAutocomplete setSelectedPlace={setSelectedPlace} />
          {errors.birthPlace && (
            <p className="text-red-500 text-xs">{errors.birthPlace}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="matching-form" className="max-w-5xl mx-auto p-4">
      <motion.h2
        className="text-3xl font-semibold mb-4 mt-6 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Kundali Matching
      </motion.h2>
      <div className="my-2">
        {kundaliMatchError?.message && (
          <AlertCard
            type={kundaliMatchError.type}
            message={kundaliMatchError.message}
          />
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-4 items-center w-full justify-center">
        <motion.div
          className="col-span-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {renderFields("Boy", boyDetails, setBoyDetails, boyerrors, setBoySelectedPlace)}
        </motion.div>

        <motion.div
          className="col-span-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {renderFields("Girl", girlDetails, setGirlDetails, girlerrors, setGirlSelectedPlace)}
        </motion.div>

        <motion.div
          className="col-span-5 sm:col-span-2 h-full"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="border rounded-lg p-4 h-full w-full mx-auto">
            <div className="text-center mb-4 font-medium">Saved Matches</div>
            <div className="flex items-center justify-center h-48">
              <div className="text-center text-sm text-gray-500">
                Please login to check your saved horoscope!
                <button className="block mx-auto mt-2 bg-yellow-400 text-black px-4 py-1 rounded text-sm">
                  Login
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-4 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-black px-8 py-2 rounded"
        >
          Match Horoscope
        </button>
      </motion.div>
    </section>
  );
};

export default HoroscopeMatchingForm;
