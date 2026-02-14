import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginpageicon from "../assets/image/loginpageicon.png";
import india from "../assets/flagsicon/india.png";
import downiconlogin from "../assets/flagsicon/downiconlogin.png";

const countries = [{ code: "IN", name: "India", flag: india, dialCode: "+91" }];

const Login = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({ role: "user", phone: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && (!/^[0-9]*$/.test(value) || value.length > 10)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/loginV2`,
        {
          mobile: formData.phone,
          role: formData.role,
          platfrom: "web",
        }
      );

      // console.log("Server Response:", response.data);

      // Store phone number in sessionStorage (or context) for OTP verification page
      sessionStorage.setItem("phone", formData.phone);
      sessionStorage.setItem("role", formData.role);

      navigate("/otp-verification");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="border-2 border-gray-300 rounded-lg shadow-lg w-full max-w-md bg-white">
        <div className="p-6 flex gap-4 items-center">
          <img src={loginpageicon} alt="Login Icon" className="w-12 h-12" />
          <div>
            <h3 className="text-[#FFD700] font-semibold text-lg">
              Astrology on time
            </h3>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              And sign up in no time.
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6">
          <div className="font-medium text-lg sm:text-xl">
            Enter your details
          </div>
          <div className="text-gray-600 text-sm sm:text-base">
            We need this to send your approved visa
          </div>

          <div className="pt-4 relative">
            <div className="flex border-2 border-gray-300 rounded-md items-center overflow-hidden">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white cursor-pointer"
              >
                <img
                  src={selectedCountry.flag}
                  alt="flag"
                  className="w-8 h-8"
                />
                <img
                  src={downiconlogin}
                  alt="Dropdown Icon"
                  className="w-4 h-4"
                />
              </button>

              {isDropdownOpen && (
                <ul className="absolute top-12 left-0 bg-white shadow-md border border-gray-300 w-32 rounded-md z-10">
                  {countries.map((country) => (
                    <li
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-6 h-6"
                      />
                    </li>
                  ))}
                </ul>
              )}

              <input
                className="w-full h-12 px-3 outline-none text-base sm:text-lg"
                placeholder="Enter your phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4 pb-6">
            <button
              type="submit"
              className="bg-[#FFD700] w-full h-12 rounded-md text-xl sm:text-xl"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
