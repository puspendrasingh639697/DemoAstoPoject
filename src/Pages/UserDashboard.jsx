// import React, { useState } from "react";
// import Profile from "../components/UserDashboardSection/Profile";
// import Settings from "../components/UserDashboardSection/Settings";
// import Booking from "../components/UserDashboardSection/Booking";
// import Wallet from "../components/UserDashboardSection/Wallet";
// import Transactions from "../components/UserDashboardSection/Transactions";
// import Support from "../components/UserDashboardSection/Support";

// const UserDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState("Profile");

//   return (
//     <div className="h-screen flex items-center justify-center mt-20 px-4 md:px-0">
//       <div className="w-full max-w-6xl h-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row">
//         {/* Left Sidebar (30%) */}
//         <div className="w-full md:w-1/3 rounded-l-2xl p-6 flex flex-col gap-4  md:border-r md:border-gray-300">
//           {/* Profile Section */}
//           <div className="flex flex-col items-center">
//             <img
//               src="https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg"
//               alt="Profile"
//               className="w-20 h-20 rounded-full border-2 border-[#FFD700] mb-2"
//             />
//             <h3 className="text-lg font-semibold">Atul Kumar</h3>
//           </div>
//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Profile"
//                 ? "bg-[#FFD700] text-white"
//                 : "text-black hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Profile")}
//           >
//             Profile Information
//           </button>
//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Booking"
//                 ? "bg-[#FFD700] text-white"
//                 : "text-black hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Booking")}
//           >
//             Booking
//           </button>
//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Wallet"
//                 ? "bg-[#FFD700] text-white"
//                 : "text-black hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Wallet")}
//           >
//             Wallet
//           </button>
//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Transactions"
//                 ? "bg-[#FFD700] text-white"
//                 : "text-black hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Transactions")}
//           >
//             Transactions
//           </button>
//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Support"
//                 ? "bg-[#FFD700] text-white"
//                 : "text-black hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Support")}
//           >
//             Support
//           </button>

//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Settings"
//                 ? "bg-[#FFD700] text-white"
//                 : "text-black hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Settings")}
//           >
//             Settings
//           </button>
//           <button
//             className={`p-3 rounded-lg ${
//               activeComponent === "Logout"
//                 ? "bg-[#FFD700] text-red-600"
//                 : "text-red-600 hover:bg-[#FFD700]"
//             }`}
//             onClick={() => setActiveComponent("Logout")}
//           >
//             Logout
//           </button>
//         </div>

//         {/* Right Content Area (70%) */}
//         <div className="w-2/3 p-6">
//           {activeComponent === "Profile" && <Profile />}
//           {activeComponent === "Booking" && <Booking />}
//           {activeComponent === "Wallet" && <Wallet />}
//           {activeComponent === "Transactions" && <Transactions />}
//           {activeComponent === "Support" && <Support />}
//           {activeComponent === "Settings" && <Settings />}
//         </div>

//     </div>
//   );
// };

// export default UserDashboard;
