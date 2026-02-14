import React, { useState, useRef } from "react";
import mahadev from "../../assets/image/mahadev.png";
import poojaformimage from "../../assets/image/poojaformimage.png";
import { useLocation } from "react-router-dom";

const PoojaForm = () => {
  const location = useLocation();
  const { filteredTempleData } = location.state || {};
  console.log("Received Temple Data:", filteredTempleData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gotra: "",
    birthStar: "",
    gender: "",
    zodiacSign: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!filteredTempleData) {
      setMessage("Error: No temple data found.");
      setLoading(false);
      return;
    }

    const templeID = filteredTempleData._id;
    const poojaID = filteredTempleData.poojaID || filteredTempleData.PoojaID;
    const poojaDate = filteredTempleData.selectedDate;

    if (!templeID || !poojaID || !poojaDate) {
      setMessage("Error: Missing required details.");
      setLoading(false);
      return;
    }
    const requestData = {
      templeID: templeID,
      UserId: "667273c956f86833914680fe", // Static User ID
      PoojaID: poojaID,
      poojaDate: poojaDate,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Gotra: formData.gotra,
      BirthStar: formData.birthStar,
      Gender: formData.gender.toLowerCase(),
      ZodiacSign: formData.zodiacSign,
      Dob: formData.dob,
    };

    console.log("Submitting Form Data:", requestData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookpooja`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Pooja booked successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          gotra: "",
          birthStar: "",
          gender: "",
          zodiacSign: "",
          dob: "",
        });

        // Optionally, clear local storage after successful booking
        localStorage.removeItem("poojaFormData");
      } else {
        setMessage(result.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mt-20 flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative h-screen w-full bg-black">
        <img
          src={mahadev}
          alt="Shivlinga"
          className="absolute top-0 left-0 z-10 object-cover w-full h-full opacity-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 -translate-y-1/2 text-[#ffffff] text-center w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            Book Pooja
          </h1>
          <p className="font-medium text-xl sm:text-2xl lg:text-3xl mt-2">
            Transform Your Space with Positive Energy
          </p>
          <button
            onClick={handleBookNow}
            className="w-48 h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium mt-4"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div
        ref={formRef} // Attach reference here
        className="rounded-2xl shadow-lg mt-10 border flex flex-col justify-center mx-5 sm:mx-10 md:flex-row"
      >
        <div className="lg:w-1/2 flex justify-center md:p-10 p-5">
          <img
            src={poojaformimage}
            alt="Pandit form"
            className="h-[300px] w-full md:w-[500px] md:h-[700px] object-cover rounded-lg"
          />
        </div>

        <form
          className="lg:w-1/2 flex flex-col gap-8 justify-center md:p-10 p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-14 rounded-md border p-4 mt-2"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-14 rounded-md border p-4 mt-2"
                required
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-bold text-lg">
              Gotra <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="gotra"
              placeholder="Gotra"
              value={formData.gotra}
              onChange={handleChange}
              className="w-full h-14 rounded-md border p-4 mt-2"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-bold text-lg">
              Birth Star <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="birthStar"
              placeholder="Birth Star"
              value={formData.birthStar}
              onChange={handleChange}
              className="w-full h-14 rounded-md border p-4 mt-2"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-14 rounded-md border p-4 mt-2 text-black"
                required
              >
                <option value="" disabled>
                  Select..
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">Zodiac Sign</label>
              <select
                name="zodiacSign"
                value={formData.zodiacSign}
                onChange={handleChange}
                className="w-full h-14 rounded-md border p-4 mt-2 text-black"
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-bold text-lg">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="md:w-64 w-full h-14 rounded-md border p-4 mt-2 text-[#A6A6A6]"
              required
            />
          </div>

          <button
            type="submit"
            className="md:w-48 w-full h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium"
          >
            Book now
          </button>
        </form>
      </div>
    </section>
  );
};

export default PoojaForm;
