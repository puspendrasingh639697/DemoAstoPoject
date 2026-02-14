;
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginpageicon from "../assets/image/loginpageicon.png";
import { astroContext } from "../context/astroContext";

const OtpVerification = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(astroContext);

  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState({ text: "", color: "" });
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const storedPhone = sessionStorage.getItem("phone");

  useEffect(() => {
    if (storedPhone) {
      setPhone(storedPhone);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]{0,4}$/.test(value)) {
      setOtp(value);
      setOtpMessage({ text: "", color: "" });
    }
  };

  const handleContinue = async () => {
    if (otp.length !== 4) {
      setOtpMessage({
        text: "Please enter a valid 4-digit OTP.",
        color: "text-red-500",
      });
      return;
    }

    setLoading(true);

    const result = await loginUser(phone, otp);

    if (result.success) {
      setOtpMessage({ text: "OTP Verified!", color: "text-green-500" });
      setTimeout(() => navigate("/user-dashboard"), 1000);
    } else {
      setOtpMessage({
        text: result.message || "Invalid OTP. Try again.",
        color: "text-red-500",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="border-2 border-gray-300 rounded-xl shadow-lg w-full max-w-md bg-white">
        {/* Header */}
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

        {/* OTP Section */}
        <div className="px-6">
          <div className="font-medium text-lg sm:text-xl">Enter OTP</div>
          <div className="text-gray-600 text-sm sm:text-base">
            We sent a code to {phone}
          </div>
        </div>

        <div className="px-6 pt-4 relative">
          <div className="flex border-2 border-gray-300 rounded-md items-center overflow-hidden">
            <input
              className="w-full h-12 px-3 outline-none text-base sm:text-lg placeholder:text-xl placeholder:pl-5"
              placeholder="Enter OTP"
              autocomplete="one-time-code"
              type="text"
              value={otp}
              onChange={handleOtpChange}
            />
          </div>
          {otpMessage.text && (
            <div className={`${otpMessage.color} text-sm mt-2`}>
              {otpMessage.text}
            </div>
          )}
        </div>

        <div className="flex gap-2 px-6 pt-4 pb-6">
          <button className="border-2 border-[#FFD700] hover:bg-[#FFD700] w-full h-12 rounded-xl text-lg sm:text-xl">
            Resend
          </button>
          <button
            className="bg-[#FFD700] w-full h-12 rounded-xl text-lg sm:text-xl"
            onClick={handleContinue}
            disabled={loading || otp.length !== 4}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
