import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { kundaliContext } from "../../context/KundaliContext";
import { astroContext } from "../../context/astroContext";
import { motion } from "framer-motion";
import AlertCard from "../UserDashboardSection/AlertCard";

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const { fetchKundaliData, kundaliError } = useContext(kundaliContext);
  const { setLoading } = useContext(astroContext);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    birthHour: "",
    birthMinute: "",
    birthSecond: "",
    birthPlace: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === parseInt(year) &&
      date.getMonth() === parseInt(month) - 1 &&
      date.getDate() === parseInt(day)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { birthDay, birthMonth, birthYear, birthHour, birthMinute, birthSecond } = formData;

    if (!isValidDate(birthDay, birthMonth, birthYear)) {
      setError("Please select a valid birth date.");
      return;
    }

    const hour = parseInt(birthHour);
    const minute = parseInt(birthMinute);
    const second = parseInt(birthSecond);

    if (
      isNaN(hour) || hour < 0 || hour > 23 ||
      isNaN(minute) || minute < 0 || minute > 59 ||
      isNaN(second) || second < 0 || second > 59
    ) {
      setError("Please select a valid birth time.");
      return;
    }

    if (!selectedPlace || !selectedPlace.lat || !selectedPlace.lng) {
      setError("Please select a valid birth place.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await fetchKundaliData({ ...formData, ...selectedPlace });

      navigate("/astrology-details");
    } catch (error) {
      console.error("Failed to fetch kundali data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
  };

  return (
    <motion.section
      className="max-w-md mx-auto my-20 px-4 sm:px-6 md:max-w-lg lg:max-w-xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      id="kundali-form"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-center"
      >
        Kundali Details
      </motion.h2>

      <div className="my-4">
        {kundaliError.message && <AlertCard message={kundaliError.message} type={kundaliError.type} />}
      </div>

      <motion.div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white" variants={itemVariants}>
        {/* Header */}
        <motion.div
          className="bg-yellow-400 text-black text-center py-3 rounded mb-6 font-semibold text-sm sm:text-lg"
          variants={itemVariants}
        >
          Enter your Details
        </motion.div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* Name */}
          <motion.div className="mb-5" variants={itemVariants}>
            <label htmlFor="fullname" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              required
            />
          </motion.div>

          {/* Birth Date */}
          <motion.div className="mb-5" variants={itemVariants}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Birth Date
            </label>
            <input
              required
              type="date"
              name="birthDate"
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setFormData((prev) => ({
                  ...prev,
                  birthYear: year,
                  birthMonth: month,
                  birthDay: day,
                }));
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
          </motion.div>

          {/* Birth Time */}
          <motion.div className="mb-5" variants={itemVariants}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Birth Time
            </label>
            <input
              required
              type="time"
              step="1"
              name="birthTime"
              onChange={(e) => {
                const [hour, minute, second] = e.target.value.split(":");
                setFormData((prev) => ({
                  ...prev,
                  birthHour: hour,
                  birthMinute: minute,
                  birthSecond: second || "00",
                }));
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
          </motion.div>

          {/* Birth Place */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Birth Place
            </label>
            <PlacesAutocomplete setSelectedPlace={setSelectedPlace} />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-red-500 mb-4 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 sm:px-3 rounded w-full text-sm sm:text-lg transition-transform"
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            Kundali
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default UserDetailsForm;
