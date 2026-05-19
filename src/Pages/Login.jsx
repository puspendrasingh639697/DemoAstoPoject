// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";
// // // import loginpageicon from "../assets/image/loginpageicon.png";
// // // import india from "../assets/flagsicon/india.png";
// // // import downiconlogin from "../assets/flagsicon/downiconlogin.png";

// // // const countries = [{ code: "IN", name: "India", flag: india, dialCode: "+91" }];

// // // const Login = () => {
// // //   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
// // //   const [formData, setFormData] = useState({ role: "user", phone: "" });
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();
// // //   const { login } = useAuth();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     if (name === "phone") {
// // //       if (!/^[0-9]*$/.test(value) || value.length > 10) return;
// // //     }
// // //     setFormData({ ...formData, [name]: value });
// // //     setError("");
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (formData.phone.length !== 10) {
// // //       setError("Please enter a valid 10-digit phone number.");
// // //       return;
// // //     }

// // //     setLoading(true);
    
// // //     // Demo Login
// // //     setTimeout(() => {
// // //       const userData = {
// // //         id: formData.phone,
// // //         phone: formData.phone,
// // //         name: `User_${formData.phone.slice(-4)}`,
// // //         role: formData.role,
// // //         loginTime: new Date().toISOString()
// // //       };
      
// // //       login(userData);
// // //       setLoading(false);
      
// // //       // ✅ Pandit (8888888888) को Dashboard पर भेजो
// // //       if (formData.phone === '8888888888') {
// // //         navigate('/pandit-dashboard');
// // //       } else {
// // //         navigate('/');
// // //       }
// // //     }, 1000);
// // //   };

// // //   return (
// // //     <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
// // //       <div className="border-2 border-gray-200 rounded-2xl shadow-xl w-full max-w-md bg-white overflow-hidden">
// // //         <div className="p-6 flex gap-4 items-center bg-white border-b border-gray-100">
// // //           <img src={loginpageicon} alt="Login Icon" className="w-14 h-14 object-contain" />
// // //           <div>
// // //             <h3 className="text-[#FFD700] font-bold text-xl uppercase tracking-tight">
// // //               Astrology on time
// // //             </h3>
// // //             <p className="text-gray-500 text-sm font-medium">
// // //               Login to continue
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <form onSubmit={handleSubmit} className="p-8">
// // //           <div className="mb-6">
// // //             <h2 className="font-bold text-2xl text-gray-800">Welcome Back</h2>
// // //             <p className="text-gray-500 text-sm mt-1">
// // //               Enter your mobile number to login
// // //             </p>
// // //             <p className="text-xs text-green-500 mt-1">
// // //               ✨ Demo: Enter any 10-digit number
// // //             </p>
// // //             <p className="text-xs text-yellow-600 mt-1 font-bold">
// // //               📞 Pandit Login: 8888888888
// // //             </p>
// // //           </div>

// // //           <div className="relative">
// // //             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
// // //             <div className="flex border-2 border-gray-200 rounded-xl mt-2 items-center focus-within:border-[#FFD700] transition-all overflow-hidden bg-gray-50">
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // //                 className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-r border-gray-200 hover:bg-gray-200 transition-colors"
// // //               >
// // //                 <img src={selectedCountry.flag} alt="flag" className="w-6 h-6 rounded-sm shadow-sm" />
// // //                 <span className="font-semibold text-gray-700">{selectedCountry.dialCode}</span>
// // //                 <img src={downiconlogin} alt="down" className="w-3 h-3 opacity-60" />
// // //               </button>

// // //               <input
// // //                 className="w-full h-12 px-4 bg-transparent outline-none text-lg font-medium text-gray-800 placeholder:text-gray-300"
// // //                 placeholder="Enter 10 digit number"
// // //                 type="tel"
// // //                 name="phone"
// // //                 value={formData.phone}
// // //                 onChange={handleChange}
// // //                 autoFocus
// // //               />
// // //             </div>
// // //           </div>

// // //           {error && (
// // //             <div className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1">
// // //               <span>⚠️</span> {error}
// // //             </div>
// // //           )}

// // //           <div className="mt-8">
// // //             <button
// // //               type="submit"
// // //               disabled={loading || formData.phone.length !== 10}
// // //               className={`w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all transform active:scale-95 ${
// // //                 loading || formData.phone.length !== 10
// // //                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// // //                   : "bg-[#FFD700] text-gray-900 hover:bg-[#e6c200] hover:shadow-[#ffd7004d]"
// // //               }`}
// // //             >
// // //               {loading ? (
// // //                 <span className="flex items-center justify-center gap-2">
// // //                   <svg className="animate-spin h-5 w-5 text-gray-600" viewBox="0 0 24 24">
// // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
// // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                   </svg>
// // //                   Logging in...
// // //                 </span>
// // //               ) : (
// // //                 "Login"
// // //               )}
// // //             </button>
// // //           </div>

// // //           <p className="text-center text-xs text-gray-400 mt-6 px-4">
// // //             By continuing, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.
// // //           </p>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import loginpageicon from "../assets/image/loginpageicon.png";
// // import india from "../assets/flagsicon/india.png";
// // import downiconlogin from "../assets/flagsicon/downiconlogin.png";

// // const countries = [{ code: "IN", name: "India", flag: india, dialCode: "+91" }];

// // // 🛠️ टेस्टिंग के लिए फिक्स UUID मैप (ताकि सुपाबेस में UUID एरर न आए)
// // const TEST_UUIDS = {
// //   "8888888888": "f47ac10b-58cc-4372-a567-0e02b2c3d479", // पंडित की फिक्स UUID
// //   "default_user": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d" // यूजर की फिक्स UUID
// // };

// // const Login = () => {
// //   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
// //   const [formData, setFormData] = useState({ role: "user", phone: "" });
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name === "phone") {
// //       if (!/^[0-9]*$/.test(value) || value.length > 10) return;
// //     }
// //     setFormData({ ...formData, [name]: value });
// //     setError("");
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (formData.phone.length !== 10) {
// //       setError("Please enter a valid 10-digit phone number.");
// //       return;
// //     }

// //     setLoading(true);
    
// //     // Demo Login System
// //     setTimeout(() => {
// //       const isPandit = formData.phone === '8888888888';
      
// //       // रोल और आईडी दोनों को डायनामिक और सुपाबेस फ्रेंडली बनाया
// //       const userData = {
// //         id: isPandit ? TEST_UUIDS["8888888888"] : TEST_UUIDS["default_user"],
// //         phone: formData.phone,
// //         name: isPandit ? "Pandit Ji" : `User_${formData.phone.slice(-4)}`,
// //         role: isPandit ? "pandit" : "user", // रोल को सही किया
// //         loginTime: new Date().toISOString()
// //       };
      
// //       login(userData);
// //       setLoading(false);
      
// //       // ✅ सही रूट पर नेविगेट करना
// //       if (isPandit) {
// //         navigate('/pandit-dashboard');
// //       } else {
// //         navigate('/');
// //       }
// //     }, 1000);
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
// //       <div className="border-2 border-gray-200 rounded-2xl shadow-xl w-full max-w-md bg-white overflow-hidden">
// //         <div className="p-6 flex gap-4 items-center bg-white border-b border-gray-100">
// //           <img src={loginpageicon} alt="Login Icon" className="w-14 h-14 object-contain" />
// //           <div>
// //             <h3 className="text-[#FFD700] font-bold text-xl uppercase tracking-tight">
// //               Astrology on time
// //             </h3>
// //             <p className="text-gray-500 text-sm font-medium">
// //               Login to continue
// //             </p>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-8">
// //           <div className="mb-6">
// //             <h2 className="font-bold text-2xl text-gray-800">Welcome Back</h2>
// //             <p className="text-gray-500 text-sm mt-1">
// //               Enter your mobile number to login
// //             </p>
// //             <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl space-y-1">
// //               <p className="text-xs text-green-700 font-medium">
// //                 ✨ <b>User Login:</b> Enter any number (e.g. 9999999999)
// //               </p>
// //               <p className="text-xs text-amber-800 font-bold">
// //                 📞 <b>Pandit Login:</b> 8888888888
// //               </p>
// //             </div>
// //           </div>

// //           <div className="relative">
// //             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
// //             <div className="flex border-2 border-gray-200 rounded-xl mt-2 items-center focus-within:border-[#FFD700] transition-all overflow-hidden bg-gray-50">
// //               <button
// //                 type="button"
// //                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// //                 className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-r border-gray-200 hover:bg-gray-200 transition-colors"
// //               >
// //                 <img src={selectedCountry.flag} alt="flag" className="w-6 h-6 rounded-sm shadow-sm" />
// //                 <span className="font-semibold text-gray-700">{selectedCountry.dialCode}</span>
// //                 <img src={downiconlogin} alt="down" className="w-3 h-3 opacity-60" />
// //               </button>

// //               <input
// //                 className="w-full h-12 px-4 bg-transparent outline-none text-lg font-medium text-gray-800 placeholder:text-gray-300"
// //                 placeholder="Enter 10 digit number"
// //                 type="tel"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 autoFocus
// //               />
// //             </div>
// //           </div>

// //           {error && (
// //             <div className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1">
// //               <span>⚠️</span> {error}
// //             </div>
// //           )}

// //           <div className="mt-8">
// //             <button
// //               type="submit"
// //               disabled={loading || formData.phone.length !== 10}
// //               className={`w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all transform active:scale-95 ${
// //                 loading || formData.phone.length !== 10
// //                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// //                   : "bg-[#FFD700] text-gray-900 hover:bg-[#e6c200] hover:shadow-[#ffd7004d]"
// //               }`}
// //             >
// //               {loading ? (
// //                 <span className="flex items-center justify-center gap-2">
// //                   <svg className="animate-spin h-5 w-5 text-gray-600" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   Logging in...
// //                 </span>
// //               ) : (
// //                 "Login"
// //               )}
// //             </button>
// //           </div>

// //           <p className="text-center text-xs text-gray-400 mt-6 px-4">
// //             By continuing, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import loginpageicon from "../assets/image/loginpageicon.png";
// import india from "../assets/flagsicon/india.png";
// import downiconlogin from "../assets/flagsicon/downiconlogin.png";

// const countries = [{ code: "IN", name: "India", flag: india, dialCode: "+91" }];

// const Login = () => {
//   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
//   const [formData, setFormData] = useState({ phone: "" });
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone") {
//       if (!/^[0-9]*$/.test(value) || value.length > 10) return;
//     }
//     setFormData({ ...formData, [name]: value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.phone.length !== 10) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     setLoading(true);
    
//     setTimeout(() => {
//       // 🚩 नियम: 8888888888 नंबर वाला हमेशा पंडित होगा, बाकी कोई भी नंबर यूजर होगा!
//       const isPandit = formData.phone === '8888888888';
      
//       const userData = {
//         id: formData.phone, // 🌟 कोई स्टैटिक UUID नहीं, अब फ़ोन नंबर ही असली ID है!
//         phone: formData.phone,
//         name: isPandit ? "Pandit Ji" : `User_${formData.phone.slice(-4)}`,
//         role: isPandit ? "pandit" : "user",
//         loginTime: new Date().toISOString()
//       };
      
//       login(userData);
//       setLoading(false);
      
//       // सही स्क्रीन पर भेजना
//       if (isPandit) {
//         navigate('/pandit-dashboard');
//       } else {
//         navigate('/'); // यूजर डैशबोर्ड या चैट स्क्रीन का रूट
//       }
//     }, 1000);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
//       <div className="border-2 border-gray-200 rounded-2xl shadow-xl w-full max-w-md bg-white overflow-hidden">
//         <div className="p-6 flex gap-4 items-center bg-white border-b border-gray-100">
//           <img src={loginpageicon} alt="Login Icon" className="w-14 h-14 object-contain" />
//           <div>
//             <h3 className="text-[#FFD700] font-bold text-xl uppercase tracking-tight">
//               Astrology on time
//             </h3>
//             <p className="text-gray-500 text-sm font-medium">Login to continue</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8">
//           <div className="mb-6">
//             <h2 className="font-bold text-2xl text-gray-800">Welcome Back</h2>
//             <p className="text-gray-500 text-sm mt-1">Enter your mobile number to login</p>
//           </div>

//           <div className="relative">
//             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
//             <div className="flex border-2 border-gray-200 rounded-xl mt-2 items-center focus-within:border-[#FFD700] transition-all overflow-hidden bg-gray-50">
//               <button
//                 type="button"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-r border-gray-200"
//               >
//                 <img src={selectedCountry.flag} alt="flag" className="w-6 h-6" />
//                 <span className="font-semibold text-gray-700">{selectedCountry.dialCode}</span>
//                 <img src={downiconlogin} alt="down" className="w-3 h-3 opacity-60" />
//               </button>

//               <input
//                 className="w-full h-12 px-4 bg-transparent outline-none text-lg font-medium text-gray-800"
//                 placeholder="Enter 10 digit number"
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 autoFocus
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1">
//               <span>⚠️</span> {error}
//             </div>
//           )}

//           <div className="mt-8">
//             <button
//               type="submit"
//               disabled={loading || formData.phone.length !== 10}
//               className={`w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all ${
//                 loading || formData.phone.length !== 10
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-[#FFD700] text-gray-900 hover:bg-[#e6c200]"
//               }`}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginpageicon from "../assets/image/loginpageicon.png";
import india from "../assets/flagsicon/india.png";
import downiconlogin from "../assets/flagsicon/downiconlogin.png";
import { supabase } from '../supabaseClient';

const countries = [{ code: "IN", name: "India", flag: india, dialCode: "+91" }];

const Login = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({ phone: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^[0-9]*$/.test(value) || value.length > 10) return;
    }
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
        setError("Please enter a valid 10-digit phone number.");
        return;
    }

    setLoading(true);
    
    // ✅ IMPORTANT: Check if phone number starts with '88888888' (Pandit)
    const isPandit = formData.phone.startsWith('88888888');
    
    // ✅ Get user data from database if pandit
    let userData;
    
    if (isPandit) {
        // Pandit login - get from database
        const { data: pandit } = await supabase
            .from('profiles')
            .select('*')
            .eq('phone', formData.phone)
            .single();
        
        if (pandit) {
            userData = {
                id: pandit.id,
                phone: pandit.phone,
                name: pandit.full_name,
                role: 'pandit'
            };
        } else {
            setError("Pandit not found!");
            setLoading(false);
            return;
        }
    } else {
        // Normal user login
        userData = {
            id: formData.phone,
            phone: formData.phone,
            name: `User_${formData.phone.slice(-4)}`,
            role: 'user'
        };
        
        // Save to database
        await supabase.from('profiles').upsert({
            id: formData.phone,
            phone: formData.phone,
            full_name: `User_${formData.phone.slice(-4)}`,
            role: 'user',
            is_online: true
        });
    }
    
    // ✅ Save to localStorage
    localStorage.setItem('demoUser', JSON.stringify(userData));
    
    // ✅ Update online status
    await supabase.from('unified_interactions').upsert({
        sender_id: userData.id,
        action_type: 'online',
        is_active: true
    });
    
    setLoading(false);
    
    // ✅ Redirect based on role
    if (userData.role === 'pandit') {
        navigate('/pandit-dashboard');
    } else {
        navigate('/pandits');  // User panel with pandit cards
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <div className="border-2 border-gray-200 rounded-2xl shadow-xl w-full max-w-md bg-white overflow-hidden">
        <div className="p-6 flex gap-4 items-center bg-white border-b border-gray-100">
          <img src={loginpageicon} alt="Login Icon" className="w-14 h-14 object-contain" />
          <div>
            <h3 className="text-[#FFD700] font-bold text-xl uppercase tracking-tight">
              Astrology on time
            </h3>
            <p className="text-gray-500 text-sm font-medium">Login to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <h2 className="font-bold text-2xl text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your mobile number to login</p>
          </div>

          <div className="relative">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
            <div className="flex border-2 border-gray-200 rounded-xl mt-2 items-center focus-within:border-[#FFD700] transition-all overflow-hidden bg-gray-50">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-r border-gray-200"
              >
                <img src={selectedCountry.flag} alt="flag" className="w-6 h-6" />
                <span className="font-semibold text-gray-700">{selectedCountry.dialCode}</span>
                <img src={downiconlogin} alt="down" className="w-3 h-3 opacity-60" />
              </button>

              <input
                className="w-full h-12 px-4 bg-transparent outline-none text-lg font-medium text-gray-800"
                placeholder="Enter 10 digit number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading || formData.phone.length !== 10}
              className={`w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all ${
                loading || formData.phone.length !== 10
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#FFD700] text-gray-900 hover:bg-[#e6c200]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;