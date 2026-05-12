// import { createContext, useState, useEffect, useRef } from "react";
// import axios from "axios";

// export const astroContext = createContext({
//   user: null,
//   isLoggedIn: false,
//   setUser: () => {},
//   setIsLoggedIn: () => {},
//   loginUser: () => {},
//   logoutUser: () => {},
//   matchData: null,
//   fetchKundliMatchData: () => {},
//   matchDetails: null,
//   setMatchDetails: () => {},
//   availPandits: [],
//   setAvailPandits: () => {},
//   bookingData: {},
//   setBookingData: () => {},
// });

// const AstroProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [bookings, setBookings] = useState([]);
//   const [poojas, setPoojas] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState(null);
//   const [isUserLoading, setIsUserLoading] = useState(true);
//   const [panditBookingData, setPanditBookingData] = useState({
//     poojaDetails: null,
//   });

//   const hasFetched = useRef(false);

//   const [bookingData, setBookingData] = useState({
//     poojaid: "",
//     packageId: "",
//     PanditId: "",
//     date: "",
//     slotid: "",
//     pinCode: "",
//   });

//   const [matchData, setMatchData] = useState(null);
//   const [matchDetails, setMatchDetails] = useState(() => {
//     const local = localStorage.getItem("kundliData");
//     return local ? JSON.parse(local) : null;
//   });

//   const [availPandits, setAvailPandits] = useState([]);

//   const [templeData, setTempleData] = useState({
//     loader: false,
//     data: [],
//   });

//   const fetchAllTemples = async () => {
//     setTempleData((prev) => ({
//       ...prev,
//       loader: true,
//     }));

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}api/getAllTemples`,
//         { withCredentials: true }
//       );

//       if (response?.data?.success) {
//         setTempleData((prev) => ({ ...prev, data: response?.data?.data }));
//       } else {
//         setTempleData((prev) => ({ ...prev, data: [] }));
//       }
//     } catch (err) {
//       console.error("Error fetching temples:", err);
//       setTempleData((prev) => ({ ...prev, data: [] }));
//     } finally {
//       setTempleData((prev) => ({ ...prev, loader: false }));
//     }
//   };

//   const fetchPoojas = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}api/allpooja`
//       );
//       if (res?.data) {
//         // console.log(res?.data);
//         setPoojas(res?.data?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching pooja options:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPoojas();
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser && storedUser !== "undefined") {
//       setUser(JSON.parse(storedUser));
//     }
//     fetchUserData();
//   }, []);

//   const loginUser = async (mobile, otp) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}api/verify-otpV2`,
//         { mobile, otp },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         setUser(response.data.user);
//         setIsLoggedIn(true);
//         sessionStorage.setItem("user", JSON.stringify(response.data.user));
//         return { success: true };
//       } else {
//         return { success: false, message: response.data.message };
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       return { success: false, message: "Something went wrong." };
//     }
//   };

//   const logoutUser = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//     sessionStorage.removeItem("user");
//   };

//   const fetchUserData = async () => {
//     try {
//       setIsLoggedIn(false);
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}api/userDetails`,
//         {
//           withCredentials: true,
//         }
//       );
//       // console.log(response);
//       // console.log("User Data:", response?.data);
//       if (response?.data?.status) {
//         setUser(response?.data?.data);
//         setIsUserLoading(false);
//         setIsLoggedIn(true);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       // alert("Failed to load user details.");
//       setUser(null);
//       setIsUserLoading(false);
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     const stored = sessionStorage.getItem("bookingData");
//     if (stored) {
//       setBookingData(JSON.parse(stored));
//     }
//   }, []);

//   useEffect(() => {
//     // console.log(bookingData);
//     sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
//   }, [bookingData]);

//   useEffect(() => {
//     if (matchDetails) {
//       localStorage.setItem("kundliData", JSON.stringify(matchDetails));
//     }
//   }, [matchDetails]);

//   // useEffect(() => {
//   //   if (isLoggedIn) {
//   //     fetchUserData();
//   //   }
//   // }, [refresh]);

//   //userdashboard booking section
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}api/getbookings`,
//           { paramters: "pandits" },
//           { withCredentials: true }
//         );
//         setBookings(response?.data?.bookingDetails || []);
//         // console.log(response.data.bookingDetails, "details===");
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };
//     if (isLoggedIn) {
//       fetchBookings();
//     }
//   }, []);

//   const value = {
//     availPandits,
//     setAvailPandits,
//     bookingData,
//     setBookingData,
//     hasFetched,
//     isLoggedIn,
//     loginUser,
//     logoutUser,
//     fetchUserData,
//     user,
//     setUser,
//     isUserLoading,
//     setIsUserLoading,
//     setIsLoggedIn,
//     bookings,
//     refresh,
//     setRefresh,
//     templeData,
//     fetchAllTemples,
//     // fetch pooja
//     poojas,
//     setPoojas,
//     fetchPoojas,
//     // loader
//     loading,
//     setLoading,
//     loadingText,
//     setLoadingText,
//     // pandit booking data
//     panditBookingData,
//     setPanditBookingData,
//   };

//   return (
//     <astroContext.Provider value={value}>{children}</astroContext.Provider>
//   );
// };

// export default AstroProvider;


import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/Apiurl";
// import { API_ENDPOINTS } from "../api/Apiurl"; // हमारा नया Central API Hub

export const astroContext = createContext();

const AstroProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  
  // States for Booking and Kundli
  const [bookingData, setBookingData] = useState(() => {
    const stored = sessionStorage.getItem("bookingData");
    return stored ? JSON.parse(stored) : { poojaid: "", packageId: "", PanditId: "", date: "", slotid: "", pinCode: "" };
  });

  const [matchDetails, setMatchDetails] = useState(() => {
    const local = localStorage.getItem("kundliData");
    return local ? JSON.parse(local) : null;
  });

  // --- 1. LOGIN USER (The Pro Logic) ---
  const loginUser = async (mobile, otp) => {
    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINTS.VERIFY_OTP, { mobile, otp });

      if (response.data.success) {
        const { token, user: userData } = response.data;

        // Token और User को सुरक्षित करें
        localStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        
        setUser(userData);
        setIsLoggedIn(true);
        
        return { success: true };
      } else {
        return { success: false, message: response.data.msg };
      }
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: error.response?.data?.msg || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // --- 2. FETCH USER DETAILS (With Token) ---
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsUserLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS.GET_USER_DATA, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Session expired:", error);
      logoutUser(); // टोकन खराब है तो लॉगआउट कर दो
    } finally {
      setIsUserLoading(false);
    }
  };

  // --- 3. LOGOUT USER ---
  const logoutUser = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  // --- 4. DATA FETCHING (Temples, Poojas, etc.) ---
  const fetchPoojas = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.LIST_POOJAS || `${import.meta.env.VITE_BACKEND_URL}api/allpooja`);
      if (res.data) setPoojas(res.data.data);
    } catch (error) { console.error("Pooja fetch error:", error); }
  };

  // --- USE EFFECTS ---
  useEffect(() => {
    fetchUserData();
    fetchPoojas();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  useEffect(() => {
    if (matchDetails) localStorage.setItem("kundliData", JSON.stringify(matchDetails));
  }, [matchDetails]);

  // Context Value
  const value = {
    user, setUser,
    isLoggedIn, setIsLoggedIn,
    loginUser, logoutUser,
    fetchUserData,
    isUserLoading,
    bookings, setBookings,
    poojas, setPoojas,
    bookingData, setBookingData,
    matchDetails, setMatchDetails,
    loading, setLoading,
    loadingText, setLoadingText
  };

  return (
    <astroContext.Provider value={value}>
      {children}
    </astroContext.Provider>
  );
};

export default AstroProvider;
