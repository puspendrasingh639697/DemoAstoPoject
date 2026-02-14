import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TempleCarousel from "./TempleCarousel";
import BigTempleCarousel from "./BigTempleCarousel";
import PoojaDetailsSection from "./PoojaDetailsSection";
import MainLoader from "../Loaders/MainLoader";

function EPoojaBooking() {
  const { id } = useParams();

  const [templeDetails, setTempleDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [poojaOptions, setPoojaOptions] = useState([]);
  const [topPoojas, setTopPoojas] = useState([]);
  const [poojaDetails, setPoojaDetails] = useState(null);
  const poojaDetailsRef = useRef(null);

  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    temple_id: id,
    pooja_id: "",
    dateOfPoja: "",
    packageId: "",
    gotra: "",
    name: [],
  });

  //search and filtration of pooja
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const filteredPoojas = poojaOptions.filter((pooja) =>
    pooja.poojaName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleSubmit = async (newPackageId, memberNames) => {
    const updatedFormData = {
      ...formData,
      packageId: newPackageId,
      name: memberNames,
    };

    const { temple_id, gotra, dateOfPoja, pooja_id, packageId, name } =
      updatedFormData;

    console.log(updatedFormData);
    setFormData(updatedFormData);

    // Validate all required fields
    if (
      !temple_id ||
      !gotra ||
      !dateOfPoja ||
      !pooja_id ||
      !packageId ||
      name.length == 0
    ) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/bookpuja`,
        updatedFormData,
        { withCredentials: true }
      );

      if (response?.data?.success) {
        // toast.success("Pooja booked successfully!", {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        setShowModal(true);
        console.log(response?.data);
      } else {
        toast.error("Failed to book pooja");
      }
      // Reset form
      setFormData({
        temple_id: "",
        gotra: "",
        dateOfPoja: "",
        pooja_id: "",
        packageId: "",
        name: [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const fetchTempleDetails = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/get-temple-details/${id}`
      );

      if (response?.data?.success) {
        console.log(response?.data?.data);
        setTempleDetails(response?.data?.data[0]);
        setTopPoojas(response?.data?.data[0]?.famousFor);
      }
    } catch (error) {
      console.error("Error fetching temple details:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchPoojaOptions = async () => {
    try {
      setLoader(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/allpooja`
      );
      if (res?.data) {
        console.log(res?.data);
        setPoojaOptions(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching pooja options:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchPoojaOptions();
    fetchTempleDetails();
  }, []);

  useEffect(() => {
    const fetchPoojaDetails = async () => {
      if (!formData.pooja_id) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/PoojaDetails/${
            formData.pooja_id
          }`
        );
        const data = await res.json();
        if (data?.success) {
          setPoojaDetails(data?.pooja);
          setFormData((prev) => ({
            ...prev,
          }));

          setTimeout(() => {
            poojaDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100); // Optional delay for smoother scrolling
        }
      } catch (error) {
        console.error("Failed to fetch pooja details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoojaDetails();
  }, [formData.pooja_id]);

  console.log(templeDetails);
  // console.log(poojaOptions);
  // console.log(topPoojas);
  console.log(poojaDetails);

  return (
    <>
      {loader ? (
        <MainLoader />
      ) : (
        <div className="min-h-screen bg-yellow-50">
          {/* Header Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 py-8">
            <div className="flex flex-col bg-white rounded-2xl shadow-lg lg:flex-row justify-evenly p-5 gap-5 h-full">
              {/* Temple Images */}
              <div className="w-full lg:w-1/2 ">
                <div className="overflow-hidden">
                  {templeDetails?.img?.[0]?.imageurl && (
                    <BigTempleCarousel data={templeDetails?.img} />
                  )}
                  {templeDetails?.img?.[0]?.imageurl && (
                    <div className="p-4">
                      <TempleCarousel data={templeDetails?.img} />
                    </div>
                  )}
                </div>
              </div>

              {/* Temple Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="py-6  pl-6 sm:border-l-2">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    {templeDetails?.name}
                  </h1>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                    {templeDetails?.significance}
                  </p>

                  <div className="border-t pt-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full mr-3"></span>
                      About Temple
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {templeDetails?.description?.split(" ").slice(0, 50).join(" ") +
                        (templeDetails?.description?.split(" ").length > 50
                          ? "..."
                          : "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 ">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
                Book Your Pooja
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Date Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.dateOfPoja || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, dateOfPoja: e.target.value });
                    }}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Gotra Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Gotra for Sankalp
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your Gotra"
                    value={formData.gotra}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, gotra: e.target.value }));
                    }}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Pooja Search */}
                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Pooja
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      ref={dropdownRef}
                      placeholder="Search for a Pooja..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowOptions(true);
                      }}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    />
                    
                    {showOptions && (
                      <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredPoojas.length > 0 ? (
                          filteredPoojas.map((pooja) => (
                            <div
                              key={pooja._id}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  pooja_id: pooja._id,
                                }));
                                setSearchTerm(pooja.poojaName);
                                setShowOptions(false);
                              }}
                              className="p-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0"
                            >
                              <span className="text-gray-800 font-medium">
                                {pooja.poojaName}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500 text-center">
                            No matching pooja found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pooja Details Section */}
          {!loading && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 ">
              <PoojaDetailsSection
                poojaDetails={poojaDetails}
                poojaDetailsRef={poojaDetailsRef}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
              />
            </div>
          )}

          {/* Top Poojas Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 py-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Poojas</span> For This Temple
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topPoojas?.length &&
                topPoojas.slice(0, 4).map((pooja, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="h-48 sm:h-56 overflow-hidden">
                      <img
                        src={pooja?.pooja?.images[0]?.imageUrl}
                        className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                        alt={pooja?.pooja?.poojaName}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                        {pooja?.pooja?.poojaName}
                      </h3>
                      <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-3">
                        "{pooja?.pooja?.sloks}"
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Enhanced Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 text-center transform animate-pulse">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                    Booking Confirmed!
                  </h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">✅</span>
                    <p className="text-lg text-gray-700">Your booking has been received</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">📞</span>
                    <p className="text-lg text-gray-700">We will contact you soon</p>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">🕉️</span>
                    <p className="text-lg text-gray-700">Pandit will be allotted</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Close
                </button>
                
                <p className="mt-6 text-gray-600 font-medium text-lg">
                  🙏 Thanks for choosing us
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default EPoojaBooking;