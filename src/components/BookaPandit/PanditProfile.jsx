import React, { useState, useEffect, useContext } from "react";
import Panditji2 from "../../assets/image/Panditji2.png";
import MessageIcon from "../../icons/MessageIcon.png";
import AssistantIcon from "../../assets/image/AssistantIcon.png";
import UserReviewImage from "../../assets/image/UserReviewImage.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { astroContext } from "../../context/astroContext";
import AddUpdateLoader from "../Loaders/AddUpdateLoader";
import AlertCard from "../UserDashboardSection/AlertCard";

const PanditProfile = () => {
  const navigate = useNavigate();
  const slug = useParams();

  const { bookingData, setBookingData, loading, setLoading, user } =
    useContext(astroContext);

  const [slotLoader, setSlotLoader] = useState(false);
  const [panditData, setPanditData] = useState({});
  const [matchedSlots, setMatchedSlots] = useState([]);
  const [unmatchedSlots, setUnmatchedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const poojadetails = localStorage.getItem("poojaDetails");
  const poojaDetails = JSON.parse(poojadetails);
  const { poojaid } = poojaDetails;
  const { poojadate } = poojaDetails;
  const [error, setError] = useState({ message: "", type: "" });

  const fetchPanditData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/panditdata/${slug?.slug}`,
        {
          poojaid: poojaid,
          poojadate: poojadate,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setPanditData(response?.data?.panditData);
        setMatchedSlots(response?.data?.matchedSlots || []);
        setUnmatchedSlots(response?.data?.nonMatchedSlots || []);
        console.log(user);
        if (user) {
          response?.data?.matchedSlots.map((slot) => {
            if (slot?.holdByUserId === user._id) {
              console.log(slot);
              setSelectedSlotId(slot._id);
            }
          });
          response?.data?.nonMatchedSlots.map((slot) => {
            if (slot?.holdByUserId === user._id) {
              console.log(slot);
              setSelectedSlotId(slot._id);
            }
          });
        }
        // console.log(response?.data?.matchedSlots);
        console.log(response?.data?.nonMatchedSlots);
      }
    } catch (error) {
      console.error("Error fetching pandit data:", error);
    } finally {
      setLoading(false);
    }
  };

  async function loadSlots() {
    try {
      const slotsResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/pandit-slots/${slug?.slug}`,
        {
          poojaid: poojaid,
          poojadate: poojadate,
        },
        {
          withCredentials: true,
        }
      );
      setMatchedSlots(slotsResponse?.data?.matchedSlots || []);
      setUnmatchedSlots(slotsResponse?.data?.nonMatchedSlots || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSlotLoader(false);
    }
  }

  async function handleSlotUnhold() {
    if (selectedSlotId) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api/softunlock-lock-slots`,
          {
            panditId: panditData?._id,
            date: poojadate,
            slotid: selectedSlotId,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response?.data?.message || "Slot unheld successfully");
        setSelectedSlotId(null);
        loadSlots();
      } catch (error) {
        console.log("Error unholding slot:", error);
      }
    }
  }

  const slotHolder = async (slotId) => {
    try {
      setSlotLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/softhold-lock-slots`,
        {
          panditId: panditData?._id,
          date: poojadate,
          slotid: slotId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setError({ message: "", type: "" });
        console.log(response?.data?.message || "Slot held successfully");
        setSelectedSlotId(slotId);
      }
    } catch (error) {
      console.error("Error holding slot:", error);
      setError({
        message:
          "This slot is already held by someone else, please select another slot",
        type: "info",
      });
    } finally {
      loadSlots();
    }
  };

  useEffect(() => {
    fetchPanditData();
  }, [user]);

  // useEffect(() => {
  //   if (selectedSlotId) {
  //     slotHolder(selectedSlotId);
  //   }
  // }, [selectedSlotId, panditData?._id]);

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      PanditId: panditData?._id,
    }));
  }, [panditData]);

  return (
    <>
      <div className="container mx-auto p-6 pt-20">
        {/* Header Section */}
        <div className="flex flex-col mt-8 md:flex-row items-center md:space-x-8">
          <img
            src={panditData?.image?.imageurl}
            alt="Pandit"
            className="w-48 h-48 rounded-lg shadow-lg mb-6 md:mb-0"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{panditData?.name}</h1>
            <p className="text-gray-600">
              <span className="font-semibold">Skills:</span>{" "}
              {panditData?.Skills?.join(", ")}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Languages:</span>{" "}
              {panditData?.languages?.join(", ")}
            </p>
            <p className="text-gray-600">Rating: ⭐⭐⭐⭐⭐</p>
          </div>
          <div className="mt-4">
            <div className="p-4">
              <h1 className="text-black font-semibold flex justify-center">
                12
              </h1>
              <p className="flex justify-center">Years of experience</p>
            </div>
            <div className="flex justify-center mt-4 mb-4">
              <button
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-center">
            <span className="text-black">About</span>{" "}
            <span className="text-yellow-400">{panditData?.name}</span>
          </h2>
          <ul className="list-disc pl-5 mt-4 text-gray-700">
            {panditData?.description}
          </ul>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1 border-2 p-6 rounded-md">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              Rating & Reviews
            </h2>
            <div className="flex justify-center gap-14 items-center">
              <div>
                <p className="text-3xl flex justify-center text-gray-600 font-semibold">
                  4.83
                </p>
                <span className="text-sm text-gray-600 ml-2">
                  based on 5 reviews
                </span>
              </div>
              <div className="w-1/2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center space-x-2 mb-2">
                    <p className="text-sm font-medium">{star}</p>
                    <div className="flex-1 bg-gray-200 h-2 rounded">
                      <div
                        className="bg-yellow-500 h-full rounded"
                        style={{ width: `${star * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium">{star * 2}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-2 rounded-md max-w-screen-md mx-auto mt-4">
              <div className="flex items-center space-x-2">
                <img src={AssistantIcon} alt="chat-icon" className="w-6 h-6" />
                <h1 className="text-md text-gray-800">Chat with Assistant?</h1>
              </div>
              <div className="text-xl text-gray-600">&gt;</div>
            </div>
          </div>

          {/* Similar Consultants */}
          <div className="flex-1">
            <div className="border-2 p-3 rounded-md mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Check Similar Consultants
              </h2>
            </div>
            <div className="border-2 p-3 rounded-md">
              <h1>Users Review</h1>
              <ul className="space-y-4 mt-4">
                {["Dixon", "Maverick", "Veronica"].map((consultant) => (
                  <li
                    key={consultant}
                    className="p-4 border-2 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center">
                      <img
                        src={UserReviewImage}
                        alt="user"
                        className="rounded-full w-10 h-10 mr-4"
                      />
                      <p className="font-semibold">{consultant}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Amazing advice and clear guidance!
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Slot Selection */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => {
                setShowModal(false);
                handleSlotUnhold();
              }}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Slot Availability
            </h2>
            <div className="my-4">
              {error.message && (
                <AlertCard
                  message={error.message}
                  type={error.type}
                  onClose={() => setError({ message: "" })}
                />
              )}
            </div>
            {slotLoader ? (
              <div className="flex justify-center items-center w-full h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-dashed"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Muhurat Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">
                    Muhurat Slots
                  </h3>
                  {matchedSlots.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-2">
                      {matchedSlots.map((slot) => (
                        <button
                          disabled={slotLoader || slot?.holdUntil}
                          key={slot._id}
                          className={`flex items-center justify-center gap-x-2 px-4 py-2 rounded border transition text-sm ${
                            selectedSlotId === slot._id
                              ? "bg-green-600 text-white border-green-600"
                              : slot?.holdUntil
                              ? "bg-gray-400 text-white border-gray-500 cursor-not-allowed"
                              : "bg-green-100 text-green-800 border-green-500 hover:bg-green-200"
                          } ${
                            slotLoader && selectedSlotId === slot._id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => {
                            if (slot?.holdUntil) return;
                            setBookingData((prev) => ({
                              ...prev,
                              slotid: slot._id,
                            }));
                            slotHolder(slot._id);
                          }}
                        >
                          <span>
                            {slot.from} - {slot.to}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No matched slots available.</p>
                  )}
                </div>

                {/* Other Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    Select Any Other Slot
                  </h3>
                  {unmatchedSlots.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-2">
                      {unmatchedSlots.map((slot) => (
                        <button
                          disabled={slotLoader || slot?.holdUntil}
                          key={slot._id}
                          className={`flex items-center justify-center gap-x-2 px-4 py-2 rounded border transition text-sm ${
                            selectedSlotId === slot._id
                              ? "bg-red-600 text-white border-red-600"
                              : slot?.holdUntil
                              ? "bg-gray-400 text-white border-gray-500 cursor-not-allowed"
                              : "bg-red-100 text-red-800 border-red-500 hover:bg-red-200"
                          } ${
                            slotLoader && selectedSlotId === slot._id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => {
                            if (slot?.holdUntil) return;
                            setBookingData((prev) => ({
                              ...prev,
                              slotid: slot._id,
                            }));
                            slotHolder(slot._id);
                          }}
                        >
                          <span>
                            {slot.from} - {slot.to}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No unmatched slots available.
                    </p>
                  )}
                </div>
              </div>
            )}
            {selectedSlotId && (
              <div className="mt-6 flex justify-center">
                <button
                  disabled={slotLoader || !selectedSlotId}
                  onClick={() => {
                    setShowModal(false);
                    navigate(`/packages/${bookingData?.poojaid}`);
                  }}
                  className="bg-yellow-500 text-white font-bold px-6 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Proceed For Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PanditProfile;
