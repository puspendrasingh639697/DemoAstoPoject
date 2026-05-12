


// // import React, { useRef, useState, useContext } from "react";
// // import { useNavigate, useLocation, Outlet } from "react-router-dom";
// // import { FiEdit } from "react-icons/fi";
// // import axios from "axios";
// // import ProfileImg from "../../assets/image/loginicon.png";
// // import { astroContext } from "../../context/astroContext";
// // import { FaUser, FaClipboardList, FaWallet, FaHistory, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
// // import AlertCard from "./AlertCard";

// // // Backend URL के लिए एक instance बना लिया ताकि कोड साफ़ रहे
// // const API = axios.create({
// //   baseURL: import.meta.env.VITE_BACKEND_URL,
// //   withCredentials: true,
// // });

// // const Sidebar = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user, setUser, isUserLoading, setIsUserLoading, setIsLoggedIn, isLoggedIn } = useContext(astroContext);
  
// //   const [message, setMessage] = useState({ type: "", message: "" });
// //   const [showAlert, setShowAlert] = useState(false);
// //   const fileInputRef = useRef(null);

// //   const navigationItems = [
// //     { label: "Profile Information", path: "/user-dashboard", icon: <FaUser size={20} /> },
// //     { label: "Booking", path: "/user-dashboard/booking", icon: <FaClipboardList size={20} /> },
// //     { label: "Wallet", path: "/user-dashboard/wallet", icon: <FaWallet size={20} /> },
// //     { label: "Transactions", path: "/user-dashboard/transaction", icon: <FaHistory size={20} /> },
// //     { label: "Feedback & Support", path: "/user-dashboard/feedback-support", icon: <FaComments size={20} /> },
// //     { label: "Settings", path: "/user-dashboard/settings", icon: <FaCog size={20} /> },
// //   ];

// //   // Image Upload Logic
// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append("profile_image", file);

// //     try {
// //       setIsUserLoading(true);
// //       const { data } = await API.patch("api/update-user-profile", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       if (data.success) {
// //         setUser(prev => ({ ...prev, profile_image: data.user.profile_image }));
// //         setMessage({ type: "success", message: "Profile picture updated!" });
// //       } else {
// //         setMessage({ type: "error", message: data.message || "Upload failed" });
// //       }
// //     } catch (error) {
// //       setMessage({ type: "error", message: "Network error during upload" });
// //     } finally {
// //       setIsUserLoading(false);
// //       setShowAlert(true);
// //     }
// //   };

// //   // Logout Logic
// //   const handleLogout = async () => {
// //     try {
// //       const { status } = await API.get("api/logoutv2");
// //       if (status === 200) {
// //         setUser(null);
// //         setIsLoggedIn(false);
// //         sessionStorage.clear();
// //         localStorage.clear();
// //         navigate("/");
// //       }
// //     } catch (error) {
// //       alert("Logout failed. Try again.");
// //     }
// //   };

// //   if (isUserLoading) return <div className="text-center p-20 animate-pulse">Loading Dashboard...</div>;

// //   if (!isLoggedIn) return (
// //     <div className="h-screen flex items-center justify-center">
// //       <button onClick={() => navigate("/login")} className="bg-yellow-400 px-6 py-2 rounded-lg font-bold">Please Login First</button>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
// //       {showAlert && <AlertCard {...message} onClose={() => setShowAlert(false)} />}
      
// //       <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
// //         {/* SIDEBAR (Desktop) */}
// //         <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col">
// //           <div className="relative w-32 h-32 mx-auto mb-4">
// //             <img 
// //               src={user?.profile_image?.profileImage || ProfileImg} 
// //               className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow-lg" 
// //               alt="User"
// //             />
// //             <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:scale-110 transition">
// //               <FiEdit />
// //             </button>
// //             <input type="file" ref={fileInputRef} onChange={handleImageChange} hidden accept="image/*" />
// //           </div>

// //           <div className="text-center mb-8">
// //             <h2 className="text-xl font-bold text-gray-800">{user?.name || "Guest User"}</h2>
// //             <p className="text-yellow-600 font-medium">{user?.mobile}</p>
// //           </div>

// //           <nav className="flex-1 space-y-2">
// //             {navigationItems.map((item) => {
// //               const isActive = location.pathname === item.path;
// //               return (
// //                 <button
// //                   key={item.label}
// //                   onClick={() => navigate(item.path)}
// //                   className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
// //                     isActive ? "bg-yellow-400 text-white shadow-md" : "text-gray-600 hover:bg-yellow-50"
// //                   }`}
// //                 >
// //                   {item.icon}
// //                   <span className="font-semibold">{item.label}</span>
// //                 </button>
// //               );
// //             })}
// //           </nav>

// //           <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold">
// //             <FaSignOutAlt /> Logout
// //           </button>
// //         </aside>

// //         {/* MAIN CONTENT AREA */}
// //         <main className="flex-1 p-6 md:p-10 bg-white h-[85vh] overflow-y-auto">
// //           <Outlet />
// //         </main>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;


// import React, { useRef, useState, useContext } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";
// import axios from "axios";
// import ProfileImg from "../../assets/image/loginicon.png";
// import { astroContext } from "../../context/astroContext";
// import { FaUser, FaClipboardList, FaWallet, FaHistory, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import AlertCard from "./AlertCard";
// import PanditNotification from "../Pandit/PanditNotification";

// // Backend URL के लिए एक instance बना लिया ताकि कोड साफ़ रहे
// const API = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
// });

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, setUser, isUserLoading, setIsUserLoading, setIsLoggedIn, isLoggedIn } = useContext(astroContext);
  
//   const [message, setMessage] = useState({ type: "", message: "" });
//   const [showAlert, setShowAlert] = useState(false);
//   const fileInputRef = useRef(null);

//   // Check if user is Pandit
//   const isPandit = user?.role === 'pandit' || user?.phone === '8888888888' || user?.mobile === '8888888888';

//   const navigationItems = [
//     { label: "Profile Information", path: "/user-dashboard", icon: <FaUser size={20} /> },
//     { label: "Booking", path: "/user-dashboard/booking", icon: <FaClipboardList size={20} /> },
//     { label: "Wallet", path: "/user-dashboard/wallet", icon: <FaWallet size={20} /> },
//     { label: "Transactions", path: "/user-dashboard/transaction", icon: <FaHistory size={20} /> },
//     { label: "Feedback & Support", path: "/user-dashboard/feedback-support", icon: <FaComments size={20} /> },
//     { label: "Settings", path: "/user-dashboard/settings", icon: <FaCog size={20} /> },
//   ];

//   // Image Upload Logic
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("profile_image", file);

//     try {
//       setIsUserLoading(true);
//       const { data } = await API.patch("api/update-user-profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (data.success) {
//         setUser(prev => ({ ...prev, profile_image: data.user.profile_image }));
//         setMessage({ type: "success", message: "Profile picture updated!" });
//       } else {
//         setMessage({ type: "error", message: data.message || "Upload failed" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", message: "Network error during upload" });
//     } finally {
//       setIsUserLoading(false);
//       setShowAlert(true);
//     }
//   };

//   // Logout Logic
//   const handleLogout = async () => {
//     try {
//       const { status } = await API.get("api/logoutv2");
//       if (status === 200) {
//         setUser(null);
//         setIsLoggedIn(false);
//         sessionStorage.clear();
//         localStorage.clear();
//         navigate("/");
//       }
//     } catch (error) {
//       alert("Logout failed. Try again.");
//     }
//   };

//   if (isUserLoading) return <div className="text-center p-20 animate-pulse">Loading Dashboard...</div>;

//   if (!isLoggedIn) return (
//     <div className="h-screen flex items-center justify-center">
//       <button onClick={() => navigate("/login")} className="bg-yellow-400 px-6 py-2 rounded-lg font-bold">Please Login First</button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       {showAlert && <AlertCard {...message} onClose={() => setShowAlert(false)} />}
      
//       <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
//         {/* SIDEBAR (Desktop) */}
//         <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col">
//           <div className="relative w-32 h-32 mx-auto mb-4">
//             <img 
//               src={user?.profile_image?.profileImage || ProfileImg} 
//               className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow-lg" 
//               alt="User"
//             />
//             <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:scale-110 transition">
//               <FiEdit />
//             </button>
//             <input type="file" ref={fileInputRef} onChange={handleImageChange} hidden accept="image/*" />
//           </div>

//           <div className="text-center mb-8">
//             <h2 className="text-xl font-bold text-gray-800">{user?.name || "Guest User"}</h2>
//             <p className="text-yellow-600 font-medium">{user?.mobile || user?.phone}</p>
//           </div>

//           {/* 🔔 Notification Bell for Pandit */}
//           <div className="flex justify-center mb-4">
//             {isPandit && user && (
//               <PanditNotification panditId={user?.id || user?.phone || user?.mobile} />
//             )}
//           </div>

//           <nav className="flex-1 space-y-2">
//             {navigationItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <button
//                   key={item.label}
//                   onClick={() => navigate(item.path)}
//                   className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
//                     isActive ? "bg-yellow-400 text-white shadow-md" : "text-gray-600 hover:bg-yellow-50"
//                   }`}
//                 >
//                   {item.icon}
//                   <span className="font-semibold">{item.label}</span>
//                 </button>
//               );
//             })}
//           </nav>

//           <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold">
//             <FaSignOutAlt /> Logout
//           </button>
//         </aside>

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-1 p-6 md:p-10 bg-white h-[85vh] overflow-y-auto">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useRef, useState, useContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import ProfileImg from "../../assets/image/loginicon.png";
import { astroContext } from "../../context/astroContext";
import { FaUser, FaClipboardList, FaWallet, FaHistory, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import AlertCard from "./AlertCard";

// Backend URL के लिए एक instance बना लिया ताकि कोड साफ़ रहे
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isUserLoading, setIsUserLoading, setIsLoggedIn, isLoggedIn } = useContext(astroContext);
  
  const [message, setMessage] = useState({ type: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef(null);

  const navigationItems = [
    { label: "Profile Information", path: "/user-dashboard", icon: <FaUser size={20} /> },
    { label: "Booking", path: "/user-dashboard/booking", icon: <FaClipboardList size={20} /> },
    { label: "Wallet", path: "/user-dashboard/wallet", icon: <FaWallet size={20} /> },
    { label: "Transactions", path: "/user-dashboard/transaction", icon: <FaHistory size={20} /> },
    { label: "Feedback & Support", path: "/user-dashboard/feedback-support", icon: <FaComments size={20} /> },
    { label: "Settings", path: "/user-dashboard/settings", icon: <FaCog size={20} /> },
  ];

  // Image Upload Logic
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      setIsUserLoading(true);
      const { data } = await API.patch("api/update-user-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setUser(prev => ({ ...prev, profile_image: data.user.profile_image }));
        setMessage({ type: "success", message: "Profile picture updated!" });
      } else {
        setMessage({ type: "error", message: data.message || "Upload failed" });
      }
    } catch (error) {
      setMessage({ type: "error", message: "Network error during upload" });
    } finally {
      setIsUserLoading(false);
      setShowAlert(true);
    }
  };

  // Logout Logic
  const handleLogout = async () => {
    try {
      const { status } = await API.get("api/logoutv2");
      if (status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      alert("Logout failed. Try again.");
    }
  };

  if (isUserLoading) return <div className="text-center p-20 animate-pulse">Loading Dashboard...</div>;

  if (!isLoggedIn) return (
    <div className="h-screen flex items-center justify-center">
      <button onClick={() => navigate("/login")} className="bg-yellow-400 px-6 py-2 rounded-lg font-bold">Please Login First</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {showAlert && <AlertCard {...message} onClose={() => setShowAlert(false)} />}
      
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* SIDEBAR (Desktop) */}
        <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img 
              src={user?.profile_image?.profileImage || ProfileImg} 
              className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow-lg" 
              alt="User"
            />
            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:scale-110 transition">
              <FiEdit />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} hidden accept="image/*" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">{user?.name || "Guest User"}</h2>
            <p className="text-yellow-600 font-medium">{user?.mobile || user?.phone}</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    isActive ? "bg-yellow-400 text-white shadow-md" : "text-gray-600 hover:bg-yellow-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold">
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 bg-white h-[85vh] overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Sidebar;