import React from "react";
import Fivestar from "../../icons/Fivestar.png";

const Review = () => {
  return (
    <>
      <div className="flex bg-[#F8FFEE] flex-col sm:flex-row  px-4 py-8">
        {/* First Child Div */}
        <div className="relative flex-1  rounded-lg">
  <div className="absolute right-0 pl-20 w-full h-auto">
    <h3 className="text-2xl font-semibold">Reviews</h3>
    <img src={Fivestar} alt="stars" className="mb-4" />

    <div className="w-1/2 bg-blue-400 rounded-lg">
      {[5, 4, 3, 2, 1].map((star) => (
        <div className="flex items-center space-x-2 mb-2 justify-end" key={star}>
          <p className="text-sm font-medium p-1">{star}</p>
          <div className="flex-1 bg-gray-200 h-2 rounded">
            <div
              className="bg-yellow-500 h-full rounded"
              style={{ width: `${star * 20}%` }}
            ></div>
          </div>
          <p className="text-sm font-medium px-2">({star * 2})</p>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Second Child Div */}
        <div className="flex-1  px-6 py-2 rounded-lg">
          <h3 className="text-xl ml-14 text-gray-600 font-semibold">
            0-5 of 22 Reviews
          </h3>

          <div>
            <div className="border-b-2 bg-white p-6 m-5 rouned-lg border-green-500">
              <h1>Mohit Gupta</h1>
              <div className="flex">
                <img src={Fivestar} alt="ratingstars" />
                <h3>Excellent</h3>
              </div>
              <p className="text-gray-600 text-xs">
                The Consultation Process Is Smooth And Convenient. The Super
                Astrologers Platform Is User-friendly, Allowing Me To Easily
                Schedule Appointments And Choose From A Variety Of Astrologers
                Based On Their Expertise And Availability. The Astrologers
                Themselves Are Professional, Compassionate, And Attentive
                Listeners.
              </p>
              <p className="text-gray-500">26-06-2023 01:04:15 PM</p>
            </div>
          </div>
          <div>
            <div className="border-b-2 m-5 bg-white p-6 rouned-lg border-green-500">
              <h1>Mohit Gupta</h1>
              <div className="flex">
                <img src={Fivestar} alt="ratingstars" />
                <h3>Excellent</h3>
              </div>
              <p className="text-gray-600 text-xs">
                The Consultation Process Is Smooth And Convenient. The Super
                Astrologers Platform Is User-friendly, Allowing Me To Easily
                Schedule Appointments And Choose From A Variety Of Astrologers
                Based On Their Expertise And Availability. The Astrologers
                Themselves Are Professional, Compassionate, And Attentive
                Listeners.
              </p>
              <p className="text-gray-500">26-06-2023 01:04:15 PM</p>
            </div>
            <div className="border-b-2 bg-white p-6 m-5 rouned-lg border-green-500">
              <h1>Mohit Gupta</h1>
              <div className="flex">
                <img src={Fivestar} alt="ratingstars" />
                <h3>Excellent</h3>
              </div>
              <p className="text-gray-600 text-xs">
                The Consultation Process Is Smooth And Convenient. The Super
                Astrologers Platform Is User-friendly, Allowing Me To Easily
                Schedule Appointments And Choose From A Variety Of Astrologers
                Based On Their Expertise And Availability. The Astrologers
                Themselves Are Professional, Compassionate, And Attentive
                Listeners.
              </p>
              <p className="text-gray-500">26-06-2023 01:04:15 PM</p>
            </div>
            <div className="border-b-2 bg-white p-6 m-5 rouned-lg border-green-500">
              <h1>Mohit Gupta</h1>
              <div className="flex">
                <img src={Fivestar} alt="ratingstars" />
                <h3>Excellent</h3>
              </div>
              <p className="text-gray-600 text-xs">
                The Consultation Process Is Smooth And Convenient. The Super
                Astrologers Platform Is User-friendly, Allowing Me To Easily
                Schedule Appointments And Choose From A Variety Of Astrologers
                Based On Their Expertise And Availability. The Astrologers
                Themselves Are Professional, Compassionate, And Attentive
                Listeners.
              </p>
              <p className="text-gray-500">26-06-2023 01:04:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
