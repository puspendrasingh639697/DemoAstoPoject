import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import ProfileImg from "../../assets/image/loginicon.png";
import { astroContext } from "../../context/astroContext";
import { FaUser, FaClipboardList, FaWallet, FaHistory, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import AlertCard from "./AlertCard";


const Sidebar = () => {
  const navigationItems = [
    {
      label: "Profile Information",
      path: "/user-dashboard",
      icon: <FaUser size={20} />,
    },
    {
      label: "Booking",
      path: "/user-dashboard/booking",
      icon: <FaClipboardList size={20} />,
    },
    {
      label: "Wallet",
      path: "/user-dashboard/wallet",
      icon: <FaWallet size={20} />,
    },
    {
      label: "Transactions",
      path: "/user-dashboard/transaction",
      icon: <FaHistory size={20} />,
    },
    {
      label: "Feedback & Support",
      path: "/user-dashboard/feedback-support",
      icon: <FaComments size={20} />,
    },
    {
      label: "Settings",
      path: "/user-dashboard/settings",
      icon: <FaCog size={20} />,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isUserLoading, setIsUserLoading, setIsLoggedIn, isLoggedIn } = useContext(astroContext);
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [activeComponent, setActiveComponent] = useState("Profile");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/user-dashboard/booking")) {
      setActiveComponent("Booking");
    } else if (path.includes("/user-dashboard/wallet")) {
      setActiveComponent("Wallet");
    } else if (path.includes("/user-dashboard/transaction")) {
      setActiveComponent("Transactions");
    } else if (path.includes("/user-dashboard/feedback-support")) {
      setActiveComponent("Feedback & Support");
    } else if (path.includes("/user-dashboard/settings")) {
      setActiveComponent("Settings");
    } else if (path === "/user-dashboard") {
      setActiveComponent("Profile Information");
    }
  }, [location.pathname]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file);

      try {
        setIsUserLoading(true);
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}api/update-user-profile`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setUser((prevUser) => ({
            ...prevUser,
            profile_image: {
              ...prevUser?.profile_image,
              profileImage: response.data.user.profile_image?.profileImage,
            },
          }));
          setIsUserLoading(false);
          setShowAlert(true);
          setMessage({
            type: "success",
            message: "Image updated successfully",
          })
        } else {
          alert(response.data.message || "Image update failed");
        }
      } catch (error) {
        console.error("Image update error:", error);
        setShowAlert(true);
        setMessage({
          type: "error",
          message: "Something went wrong while uploading.",
        })
        // alert("Something went wrong while uploading.");
        setIsUserLoading(false);

      }
    }
  };

  if (isUserLoading) {
    return (<div className="h-auto flex items-center justify-center mb-10 px-4 md:px-0  pb-10">
      <div className="w-full max-w-6xl h-auto bg-white shadow-xl mt-5 rounded-2xl flex flex-row sm:mx-5 border-gray-200">
        {/* Sidebar */}
        <div className="w-[300px] p-6 sm:p-3 rounded-l-2xl flex-col gap-4 md:border-r md:border-gray-400 hidden sm:flex">
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-28 h-28 bg-gray-300 rounded-full border-2 border-yellow-200 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100">
              <div className="w-5 h-5 bg-gray-300 animate-pulse"></div>
            </div>
          </div>

          <div className="text-center mt-2">
            <div className="h-6 bg-gray-300 rounded animate-pulse w-32 mx-auto mb-1"></div>
            <div className="h-4 bg-yellow-200 rounded animate-pulse w-24 mx-auto"></div>
          </div>

          {/* Navigation Items - exactly 5 items like typical dashboard */}
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              className="p-3 font-medium rounded-lg flex items-center flex-row gap-5 text-black hover:bg-[#FFD700] min-w-full bg-gray-100 animate-pulse"
            >
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </button>
          ))}

          {/* Logout Button */}
          <button className="p-3 font-medium rounded-lg border-2 flex items-center justify-center flex-row gap-2 text-red-600 border-red-600 hover:text-white hover:bg-red-600 transition duration-300">
            <div className="w-5 h-5 bg-red-300 animate-pulse"></div>
            <div className="h-4 bg-red-300 rounded w-12 animate-pulse"></div>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6">
          <div className="flex-col items-center bg-white rounded-2xl mb-4 flex sm:hidden gap-2">
            <div className="flex items-center justify-between w-full">
              <div className="relative w-28 h-28">
                <div className="w-28 h-28 bg-gray-300 rounded-full border-2 border-yellow-200 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100">
                  <div className="w-5 h-5 bg-gray-300 animate-pulse"></div>
                </div>
              </div>
              <button className="p-3 font-medium rounded-lg border-2 flex items-center justify-center flex-row gap-2 text-red-600 border-red-600 hover:text-white hover:bg-red-600 transition duration-300">
                <div className="w-5 h-5 bg-red-300 animate-pulse"></div>
                <div className="h-4 bg-red-300 rounded w-12 animate-pulse"></div>
              </button>
            </div>

            <div className="text-[#1C2B38] font-semibold text-xl mt-2 w-full text-center">
              <div className="h-6 bg-gray-300 rounded animate-pulse w-40 mx-auto mb-1"></div>
              <div className="h-4 bg-yellow-200 rounded animate-pulse w-24 mx-auto"></div>
            </div>

            <div className="flex w-full justify-between flex-wrap flex-row gap-2 border-1 border-gray-300 py-4 border-b border-t">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  className="p-3 font-medium rounded-lg shadow-lg flex items-center flex-row text-black hover:bg-[#FFD700] bg-gray-100 animate-pulse"
                >
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-lvh overflow-y-auto pr-2">
            {/* Outlet Content Skeleton */}
            <div className="space-y-6">
              {/* Main Content Header */}
              <div className="space-y-3">
                <div className="h-8 bg-gray-300 rounded animate-pulse w-72"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-4/5"></div>
              </div>

              {/* Content Cards */}
              <div className="grid gap-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="h-5 bg-gray-300 rounded animate-pulse w-32"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <div className="h-8 bg-gray-300 rounded animate-pulse w-20"></div>
                        <div className="h-8 bg-gray-300 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Content Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="h-6 bg-gray-300 rounded animate-pulse w-48"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                          <div className="h-3 bg-gray-300 rounded animate-pulse w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  if (isLoggedIn) {
    return (
      <div className="h-auto flex flex-col items-center justify-center mb-10 px-4 pb-10">
        {/* show alert */}
        {showAlert && <AlertCard type={message.type}
          message={message.message}
          onClose={() => setShowAlert(false)} />}
        <div className="w-full max-w-6xl h-auto bg-white shadow-xl mt-5 rounded-2xl flex flex-row  sm:mx-5 border-gray-200">
          {/* Sidebar */}
          <div className="w-fit p-6 sm:p-3 rounded-l-2xl flex-col gap-4 md:border-r md:border-gray-400 hidden sm:flex">
            <div className="relative w-28 h-28 mx-auto">
              <img
                src={user?.profile_image?.profileImage || ProfileImg}
                alt="Profile-image"
                className="w-28 h-28 transition duration-500 rounded-full  border-2 border-[#FFD700] object-cover"
              />
              <button
                onClick={handleEditClick}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <FiEdit className="text-gray-600 w-5 h-5" />
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            <h3 className="text-[#1C2B38] font-semibold text-xl mt-2">
              {user?.name} |{" "}
              <span className="text-md font-semibold text-yellow-400">
                {user?.mobile}
              </span>
            </h3>
            {navigationItems.map((item) => (
              <button
                key={item.label}
                className={`p-3 font-medium rounded-lg flex items-center flex-row gap-5 ${activeComponent === item.label
                  ? "bg-[#FFD700] text-white min-w-full"
                  : "text-black hover:bg-[#FFD700] min-w-full"
                  }`}
                onClick={() => {
                  setActiveComponent(item.label);
                  navigate(item.path);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            {/* Logout Button */}
            <button
              className={`p-3 font-medium rounded-lg border-2 flex items-center justify-center flex-row gap-2 text-red-600 border-red-600 ${activeComponent === "logout"
                ? "bg-[#FFD700] text-white "
                : "hover:text-white hover:bg-red-600 transition duration-300"
                }`}
              onClick={async () => {
                try {
                  setActiveComponent("logout");
                  const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}api/logoutv2`,
                    { withCredentials: true }
                  );
                  if (response.status === 200) {
                    setUser(null);
                    setIsLoggedIn(false);
                    sessionStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/");
                  } else {
                    alert(response.data.message || "Logout failed");
                  }
                } catch (error) {
                  console.error("Logout error:", error);
                  alert(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                  );
                }
              }}
            >
              <FaSignOutAlt size={20} /><span>Logout</span>
            </button>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6">
            <div className="flex-col items-center bg-white rounded-2xl mb-4 flex sm:hidden gap-2">
              <div className="flex items-center justify-between w-full">
                <div className="relative w-28 h-28">
                  <img
                    src={user?.profile_image?.profileImage || ProfileImg}
                    alt="Profile-image"
                    className="w-28 h-28 transition duration-500 rounded-full  border-2 border-[#FFD700] object-cover"
                  />
                  <button
                    onClick={handleEditClick}
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                  >
                    <FiEdit className="text-gray-600 w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
                <button
                  className={`p-3 font-medium rounded-lg border-2 flex items-center justify-center flex-row gap-2 text-red-600 border-red-600 ${activeComponent === "logout"
                    ? "bg-[#FFD700] text-white "
                    : "hover:text-white hover:bg-red-600 transition duration-300"
                    }`}
                  onClick={async () => {
                    try {
                      setActiveComponent("logout");
                      const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}api/logoutv2`,
                        { withCredentials: true }
                      );
                      if (response.status === 200) {
                        setUser(null);
                        setIsLoggedIn(false);
                        sessionStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/");
                      } else {
                        alert(response.data.message || "Logout failed");
                      }
                    } catch (error) {
                      console.error("Logout error:", error);
                      alert(
                        error.response?.data?.message ||
                        "Something went wrong. Please try again."
                      );
                    }
                  }}
                >
                  <FaSignOutAlt size={20} /><span>Logout</span>
                </button>
              </div>

              <h3 className="text-[#1C2B38] font-semibold text-xl mt-2">
                {user?.name}{" "}
                <span className="text-md font-semibold text-yellow-400">
                  {user?.mobile}
                </span>
              </h3>

              <div className="flex w-full justify-between flex-wrap flex-row gap-2 border-1 border-gray-300 py-4 border-b border-t ">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    className={`p-3 font-medium rounded-lg shadow-lg flex items-center flex-row ${activeComponent === item.label
                      ? "bg-[#FFD700] text-white"
                      : "text-black hover:bg-[#FFD700]"
                      }`}
                    onClick={() => {
                      setActiveComponent(item.label);
                      navigate(item.path);
                    }}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-lvh overflow-y-auto pr-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto flex items-center justify-center mb-10 px-4 md:px-0 bg-gray-200 pb-10">
      <div className="w-full max-w-6xl h-[600px] justify-center items-center  bg-white shadow-xl mt-5 rounded-2xl flex flex-row  sm:mx-5 border-gray-200">
        <button
          onClick={() => navigate("/login")}
          className="text-sm px-4 py-2 rounded-full bg-yellow-400 text-black hidden xl-nav:flex"
        >
          Login
        </button>

      </div>
    </div>
  )
};

export default Sidebar;
