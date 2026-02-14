import React, { useState, useEffect, useContext } from "react";
import { FaUserTie, FaFire, FaUserAstronaut, FaHome } from "react-icons/fa";
import BookingCard from "./Card";
import PoojaCard from "./PoojaCard";
import axios from "axios";
import { astroContext } from "./../../context/astroContext";

// Features Component
const Features = ({ activeComponent, setActiveComponent, tabs }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto scrollbar-hide mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveComponent(tab.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow whitespace-nowrap
            transition-all duration-200
            ${
              activeComponent === tab.name
                ? "bg-yellow-400 text-white"
                : "bg-white text-gray-700 hover:bg-yellow-100 border border-gray-300"
            }`}
        >
          {tab.icon}
          <span className="text-sm sm:text-base">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default function Booking() {
  const [activeComponent, setActiveComponent] = useState("Pandit");
  const [poojaBookings, setPoojaBookings] = useState([]);
  const [panditBookings, setPanditBookings] = useState([]);
  const { bookings } = useContext(astroContext);

  const tabs = [
    { name: "Pandit", icon: <FaUserTie className="text-indigo-600" /> },
    { name: "e-Pooja", icon: <FaFire className="text-orange-500" /> },
    {
      name: "Astrocounsler",
      icon: <FaUserAstronaut className="text-green-600" />,
    },
    { name: "Vastu", icon: <FaHome className="text-yellow-600" /> },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const paramType =
          activeComponent === "e-Pooja"
            ? "pooja"
            : activeComponent === "Pandit"
            ? "pandits"
            : null;

        if (!paramType) return;

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api/getbookings`,
          { paramters: paramType },
          { withCredentials: true }
        );

        if (paramType === "pooja") {
          setPoojaBookings(response.data.bookingDetails || []);
        } else if (paramType === "pandits") {
          setPanditBookings(response.data.bookingDetails || []);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [activeComponent]);

  return (
    <div className="container mx-auto">
      <div className="sticky top-0 z-10 bg-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Bookings</h1>

        <Features
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          tabs={tabs}
        />
      </div>

      <h2 className="mb-4 text-lg sm:text-xl font-semibold">My Bookings</h2>

      {/* Pandit Bookings */}
      {activeComponent === "Pandit" ? (
        panditBookings.length === 0 ? (
          <p className="text-gray-500">No Bookings found</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {panditBookings.map((booking) => {
              const { bookingId, fullBooking, package: pkg, slot } = booking;
              return (
                <BookingCard
                  key={bookingId}
                  id={bookingId}
                  status={fullBooking?.status || "pending"}
                  poojaName={fullBooking?.poojaid?.poojaName || "Pooja"}
                  panditName={`${fullBooking?.firstName || ""} ${
                    fullBooking?.lastName || ""
                  }`}
                  date={fullBooking?.dateofpooja || "N/A"}
                  time={`${slot?.from || ""} - ${slot?.to || ""}`}
                  packages={pkg?.poojaPackages?.title}
                  packageDetails={pkg}
                />
              );
            })}
          </div>
        )
      ) : null}

      {/* e-Pooja Bookings */}
      {activeComponent === "e-Pooja" ? (
        poojaBookings.length === 0 ? (
          <p className="text-gray-500">No e-Pooja bookings available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {poojaBookings.map((booking) => (
              <PoojaCard
                key={booking?._id}
                poojaName={booking.poojaId?.poojaName}
                dateOfPooja={booking?.dateOfPooja}
                price={booking?.matchedPackage?.poojaPackages?.price}
                templeName={booking?.templeID?.name}
                status={booking?.status}
                bookingId={booking?._id}
                matchedPackage={booking?.matchedPackage}
              />
            ))}
          </div>
        )
      ) : null}

      {/* Other Tabs */}
      {["Astrocounsler", "Vastu"].includes(activeComponent) && (
        <p className="text-gray-500">
          No bookings available for this category.
        </p>
      )}
    </div>
  );
}
