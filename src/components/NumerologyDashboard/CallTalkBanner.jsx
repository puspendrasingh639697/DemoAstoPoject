import React from "react";

const CallTalkBanner = () => {
  return (
    <div>
      {" "}
      <div className="bg-yellow-100 text-center py-8 px-4 rounded-lg shadow-md max-w-2xl mx-auto my-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          Connect with an Astrologer on Call or Chat for more personalised
          detailed predictions
        </h2>

        <div className="flex justify-center flex-wrap gap-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
            Talk to Astrologer
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Chat to Astrologer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallTalkBanner;
