

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import loginpageicon from "../assets/image/loginpageicon.png";
// import india from "../assets/flagsicon/india.png";
// import downiconlogin from "../assets/flagsicon/downiconlogin.png";
// import { supabase } from '../supabaseClient';

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
//         setError("Please enter a valid 10-digit phone number.");
//         return;
//     }

//     setLoading(true);
    
//     // ✅ IMPORTANT: Check if phone number starts with '88888888' (Pandit)
//     const isPandit = formData.phone.startsWith('88888888');
    
//     // ✅ Get user data from database if pandit
//     let userData;
    
//     if (isPandit) {
//         // Pandit login - get from database
//         const { data: pandit } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('phone', formData.phone)
//             .single();
        
//         if (pandit) {
//             userData = {
//                 id: pandit.id,
//                 phone: pandit.phone,
//                 name: pandit.full_name,
//                 role: 'pandit'
//             };
//         } else {
//             setError("Pandit not found!");
//             setLoading(false);
//             return;
//         }
//     } else {
//         // Normal user login
//         userData = {
//             id: formData.phone,
//             phone: formData.phone,
//             name: `User_${formData.phone.slice(-4)}`,
//             role: 'user'
//         };
        
//         // Save to database
//         await supabase.from('profiles').upsert({
//             id: formData.phone,
//             phone: formData.phone,
//             full_name: `User_${formData.phone.slice(-4)}`,
//             role: 'user',
//             is_online: true
//         });
//     }
    
//     // ✅ Save to localStorage
//     localStorage.setItem('demoUser', JSON.stringify(userData));
    
//     // ✅ Update online status
//     await supabase.from('unified_interactions').upsert({
//         sender_id: userData.id,
//         action_type: 'online',
//         is_active: true
//     });
    
//     setLoading(false);
    
//     // ✅ Redirect based on role
//     if (userData.role === 'pandit') {
//         navigate('/pandit-dashboard');
//     } else {
//         navigate('/pandits');  // User panel with pandit cards
//     }
// };

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
    
    try {
      const isPandit = formData.phone.startsWith('88888888');
      
      // ✅ Create email for Supabase Auth
      const email = `${formData.phone}@user.com`;
      const password = formData.phone; // Using phone as password
      
      // ✅ Try to sign in first
      let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      
      // ✅ If user doesn't exist, sign up
      if (signInError && signInError.message === 'Invalid login credentials') {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              phone: formData.phone,
              full_name: isPandit ? `Pandit_${formData.phone.slice(-4)}` : `User_${formData.phone.slice(-4)}`,
              role: isPandit ? 'pandit' : 'user'
            }
          }
        });
        
        if (signUpError) throw signUpError;
        
        // ✅ Sign in again after signup
        const { data: finalSignIn, error: finalError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });
        
        if (finalError) throw finalError;
        signInData = finalSignIn;
      } else if (signInError) {
        throw signInError;
      }
      
      // ✅ Get or create profile
      let userData;
      
      if (isPandit) {
        // Get pandit from database
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
            role: 'pandit',
            email: pandit.email
          };
        } else {
          // Create pandit profile
          const { data: newPandit } = await supabase
            .from('profiles')
            .insert({
              id: signInData.user.id,
              phone: formData.phone,
              full_name: `Pandit_${formData.phone.slice(-4)}`,
              role: 'pandit',
              email: email
            })
            .select()
            .single();
          
          userData = {
            id: newPandit.id,
            phone: newPandit.phone,
            name: newPandit.full_name,
            role: 'pandit',
            email: newPandit.email
          };
        }
      } else {
        // Normal user
        userData = {
          id: signInData.user.id,
          phone: formData.phone,
          name: `User_${formData.phone.slice(-4)}`,
          role: 'user',
          email: email
        };
        
        // Upsert profile
        await supabase.from('profiles').upsert({
          id: signInData.user.id,
          phone: formData.phone,
          full_name: `User_${formData.phone.slice(-4)}`,
          role: 'user',
          email: email,
          is_online: true
        });
      }
      
      // ✅ Update online status
      await supabase.from('unified_interactions').upsert({
        sender_id: userData.id,
        action_type: 'online',
        is_active: true
      });
      
      // ✅ Save to context/localStorage
      login(userData);
      setLoading(false);
      
      // ✅ Redirect based on role
      if (userData.role === 'pandit') {
        navigate('/pandit-dashboard');
      } else {
        navigate('/pandits');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
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