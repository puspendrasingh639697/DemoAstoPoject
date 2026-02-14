import React from "react";
import profileimg from "./../../assets/image/profileimg.png";
import star from "./../../assets/Star2.png";
import message from "./../../assets/messageicon.png";
import hearticon from "./../../assets/hearticon.png";
// import Features from "./../../components/UserDashboardSection/Features";
import Rating from "@mui/material/Rating";

const SingleBooking = () => {
  const [value, setValue] = React.useState(4);

  return (
    <>
      <div className="h-full w-full ">
        <h1 className="text-xl font-bold">Bookings</h1>
        {/* {<Features />} */}
        <div className="flex flex-col sm:flex-row gap-3 w-full h-auto bg-[#FEF9CA] mb-6 rounded-lg mt-5">
          <div className="w-full sm:w-1/2 p-4">
            <div className="flex  p-3">
              <div className="w-1/2">
                <img
                  src={profileimg}
                  alt="Placeholder"
                  className="w-20 h-20 shadow-lg object-cover rounded-3xl flex justify-center"
                />
                <div className="flex gap-2 mt-3 items-center">
                  <Rating
                    name="customized-10"
                    defaultValue={0.5}
                    max={1}
                    precision={0.5}
                    style={{ fontSize: "20px" }}
                  />
                  <h1>4.8</h1>
                </div>
              </div>
              <div className="w-full h-auto ">
                <h1 className="font-medium">Esther Howard</h1>
                <p className="text-[#666666] font-medium text-xs mt-1">
                  Vedic, Nadi, Prashan
                </p>
                <div className="flex gap-2 w-full h-auto mt-5">
                  <div className="bg-white rounded-md  w-2/4 ">
                    <p className="bg-[#F7F8F8] rounded-xl text-[#222E54] font-medium text-xs p-2 hover:bg-yellow-400 hover:text-black">
                      Appointment
                    </p>
                  </div>
                  <div className="p-2 bg-white rounded-xl flex justify-center items-center hover:cursor-pointer">
                    <img src={message} alt="msg" />
                  </div>
                  <div className="p-2 bg-white rounded-xl flex justify-center items-center hover:cursor-pointer">
                    <img src={hearticon} alt="like" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <p className="font-semibold text-lg text-[#4A5568]">
                Skills:{" "}
                <span className="text-[#4A5568] text-lg font-normal">
                  Vedic
                </span>
              </p>
              <p className="font-semibold text-lg text-[#4A5568]">
                Language:{" "}
                <span className="text-[#4A5568] text-lg font-normal">
                  English
                </span>
              </p>
              <p className="font-semibold text-lg text-[#4A5568]">
                Rating:{" "}
                <span className="text-[#4A5568] text-lg font-normal">
                  Vedic
                </span>
              </p>
              <p className="font-semibold text-lg text-[#4A5568]">
                Total:{" "}
                <span className="text-[#4A5568] text-lg font-normal">₹25</span>
              </p>
              <p className="font-semibold text-lg text-[#4A5568]">
                Session Timing:{" "}
                <span className="text-[#4A5568] text-lg font-normal">
                  15 min
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 mt-5 p-2">
              <button className="bg-[#FFD700] hover:bg-yellow-400 sm:w-60 h-10 text-center rounded-md font-normal">
                Continue Chat
              </button>
              <button className="bg-[#FFD700] hover:bg-yellow-400 sm:w-60 h-10 text-center rounded-md font-normal">
                View Profile
              </button>
              <button className="bg-[#FFD700] hover:bg-yellow-400 sm:w-60 h-10 text-center rounded-md font-normal">
                Chat History
              </button>
            </div>
          </div>
          <div className=" w-full sm:w-1/2 p-4">
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="text-xl text-[#242E42] font-bold p-2 text-center">
                How was your experience?
              </h1>
              <p className="text-[#8A8A8F] text-lg text-center">
                Your feedback will help improve our experience
              </p>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                style={{ fontSize: "44px" }}
                className="mt-10"
              />
              <textarea
                name=""
                id=""
                rows={3}
                placeholder="Additional Comments....... "
                className="w-full rounded-lg border-2 border-black p-4 text-lg mt-10 resize-none"
              ></textarea>
              <button className="bg-[#FFD700] hover:bg-yellow-400 w-full h-11 rounded-lg mt-5 font-semibold text-lg">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBooking;
