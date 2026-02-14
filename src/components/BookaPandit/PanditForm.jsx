import React, { useState, useContext, useEffect } from "react";
import shivlinga from "../../assets/image/shivlinga.jpeg";
import formimage from "../../assets/image/formimage.jpeg";
import { astroContext } from "../../context/astroContext";
import axios from "axios";

const PanditForm = () => {
  const { bookingData, setBookingData, user, fetchUserData } =
    useContext(astroContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    Landmark: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Merge formData into bookingData
    const mergedData = { ...bookingData, ...formData };

    // Step 2: Update bookingData in context
    setBookingData(mergedData);

    try {
      // Step 3: Post the mergedData to backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/bookpandit`,
        mergedData,
        { withCredentials: true }
      );
      if (response?.data?.success) {
        console.log("Booking Success:", response.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Booking Failed:", error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user?.email,
      }));
    }
  }, [user]);

  return (
    <section className="flex flex-col items-center">
      <div className="relative h-screen w-full bg-black">
        <img
          src={shivlinga}
          alt="Shivlinga"
          className="absolute top-0 left-0 z-10 object-cover w-full h-full opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 -translate-y-1/2 text-[#ffffff] text-center w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            Book Pandit
          </h1>
          <p className="font-medium text-xl sm:text-2xl lg:text-3xl mt-2">
            Transform Your space with positive energy
          </p>
          <button className="w-48 h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium mt-4">
            Book Now
          </button>
        </div>
      </div>

      <div className="rounded-2xl shadow-lg mt-10 border flex flex-col justify-center mx-5 sm:mx-10 md:flex-row">
        <div className="lg:w-1/2 flex justify-center md:p-10 p-5">
          <img
            src={formimage}
            alt="Pandit form"
            className="h-[300px] w-full md:w-[500px] md:h-[560px] object-cover rounded-lg"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 flex flex-col gap-8 justify-center md:p-10 p-5"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-bold text-lg">
              Mobile No. <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full h-14 rounded-md border p-4 mt-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-bold text-lg">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full h-14 rounded-md border p-4 mt-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-bold text-lg">
              Landmark <span className="text-red-500">*</span>
            </label>
            <input
              name="Landmark"
              value={formData.Landmark}
              onChange={handleChange}
              placeholder="Landmark"
              className="w-full h-14 rounded-md border p-4 mt-2"
            />
          </div>

          <button
            type="submit"
            className="md:w-48 w-full h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* Modal Part */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Booking Confirmed!
            </h2>
            <p className="text-lg mb-4">
              Your booking has been done successfully.
              <br />
              You will receive booking details on your mail:{" "}
              <span className="font-semibold">{user?.email}</span>.
              <br />
              You will be contacted soon on your number:{" "}
              <span className="font-semibold">{user?.mobile}</span>.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-[#FFD700] hover:bg-[#FACC15] text-black font-bold py-2 px-6 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PanditForm;
