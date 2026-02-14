import React from "react";
import poojaprofileimg from "../../assets/image/poojaprofileimg.png";
import AssistantIcon from "../../assets/image/AssistantIcon.png";
import UserReviewImage from "../../assets/image/UserReviewImage.png";
import Pandits from "../../assets/flagsicon/Pandits.png";
import fire from "../../assets/flagsicon/fire.png";
import lights from "../../assets/flagsicon/lights.png";
import Tirupati from "../../assets/image/TirupatiBalaJi.png";
import KashiVishwanath from "../../assets/image/KashiVishwanath.jpeg";
import VaishnoDevi from "../../assets/image/VaishnoDevi.png";
import { FaInfoCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLocation, useNavigate } from "react-router-dom";

const PoojaProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filteredTempleData = location.state?.filteredTempleData || null;
  console.log("Filtered Temple Data:", filteredTempleData);

  // console.log("Filtered Temple Data:", filteredTempleData);
  // console.log("Related Pooja:", filteredTempleData?.relatedPooja);

  // const userId = "Ihdf76786756bfndf";
  // const poojaDetails = filteredTempleData
  //   ? {
  //       poojaId: filteredTempleData.relatedPooja || "defaultPoojaId",
  //       templeId: filteredTempleData._id || "defaultTempleId",
  //       userId: userId,
  //       selectedate: filteredTempleData.selectedDate || "defaultDate",
  //     }
  //   : {
  //       poojaId: "defaultPoojaId",
  //       templeId: "defaultTempleId",
  //       selectedate: "defaultDate",
  //     };

  // console.log("Extracted Pooja Details:", poojaDetails);

  if (!filteredTempleData) {
    return (
      <div className="text-center text-gray-600 text-lg p-6">
        No temple data available.
      </div>
    );
  }

  const destinations = [
    {
      image: Tirupati,
      heading: "Tirupati Balaji",
      location: "Tirumala",
      state: "Andhra Pradesh",
    },
    {
      image: KashiVishwanath,
      heading: "Kashi Vishwanath",
      location: "Varanasi",
      state: "Uttar Pradesh",
    },
    {
      image: VaishnoDevi,
      heading: "Vaishno Devi Temple",
      location: "Katra",
      state: "Jammu and Kashmir",
    },
  ];

  return (
    <>
      <section className="mt-20">
        <div className="relative h-96 md:h-screen w-full bg-black">
          <img
            src={poojaprofileimg}
            alt="Shivlinga"
            className="absolute top-0 left-0 z-10 object-cover w-full h-full opacity-80"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 -translate-y-1/2 text-[#ffffff] text-center w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              Book Pooja
            </h1>
            <p className="font-medium text-xl sm:text-2xl lg:text-3xl mt-2">
              Transform Your space with positive energy
            </p>
            <button
              onClick={() =>
                navigate("/poojaform", { state: { filteredTempleData } })
              }
              className="w-48 h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium mt-4"
            >
              Book Now
            </button>
          </div>
        </div>
        <section className="p-5 md:p-10">
          <h2 className="text-3xl font-semibold text-center">
            <span className="text-black">About </span>
            <span className="text-[#F6C300]">Pooja</span>
          </h2>
          <ul className="list-disc pl-5 mt-4 text-[#4A5568] text-justify">
            <li>CA Inter (Group I)</li>
            <li>Member of the Indian Council for Astrological Sciences</li>
            <li>Expert in Vedic Astrology (Parashara method)</li>
            <li>
              Practices Prashnam, Jaimini System of Astrology, Muhurtha Fixing,
              Numerology, Horoscope Matching, and Medical Astrology
            </li>
          </ul>
          <h2 className="text-3xl font-semibold text-center mt-10">
            <span className="text-black">About </span>
            <span className="text-[#F6C300]">Temple</span>
          </h2>
          <ul className="list-disc pl-5 mt-4 text-[#4A5568] text-justify">
            <li>CA Inter (Group I)</li>
            <li>Member of the Indian Council for Astrological Sciences</li>
            <li>Expert in Vedic Astrology (Parashara method)</li>
            <li>
              Practices Prashnam, Jaimini System of Astrology, Muhurtha Fixing,
              Numerology, Horoscope Matching, and Medical Astrology
            </li>
          </ul>
          <div className="flex items-center flex-col justify-center w-full mt-10 px-4 sm:px-6 md:px-8">
            <h1 className="font-bold text-4xl text-[#FFD700] text-center">
              Our Stats
            </h1>
            <p className="text-[#FFD700] text-xl font-semibold text-center mt-2">
              Details about our full updated stats
            </p>
            <div className="flex flex-col md:flex-row mt-10 justify-between w-full space-y-10 md:space-y-0 md:space-x-10">
              <div className="flex flex-col items-center">
                <img src={fire} alt="fire" className="h-[100px] w-[100px]" />
                <label className="text-3xl md:text-5xl font-bold mt-4">
                  7,000+
                </label>
                <label className="text-xl md:text-3xl font-normal text-center">
                  Visited per month
                </label>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={Pandits}
                  alt="pandit"
                  className="h-[100px] w-[150px]"
                />
                <label className="text-3xl md:text-5xl font-bold mt-4">
                  2,000+
                </label>
                <label className="text-xl md:text-3xl font-normal text-center">
                  Pandits and Purohits
                </label>
              </div>
              <div className="flex flex-col items-center">
                <img src={lights} alt="rank" className="h-[100px] w-[150px]" />
                <label className="text-3xl md:text-5xl font-bold mt-4">
                  # 30
                </label>
                <label className="text-xl md:text-3xl font-normal text-center">
                  Rankings
                </label>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1">
              <div className="border-2 p-4 rounded-md">
                <h2 className="text-xl font-semibold text-[#454545] mb-4">
                  Rating & Reviews
                </h2>
                <div className="flex flex-col sm:flex-row justify-center sm:gap-14  items-center">
                  <div>
                    <p className="text-3xl flex justify-center text-[#313131] font-semibold">
                      4.83
                    </p>
                    <span className="text-sm text-gray-600 ml-2">
                      based on 5 reviews
                    </span>
                  </div>

                  <div className="w-1/2 ">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div
                        className="flex items-center space-x-2 mb-2"
                        key={star}
                      >
                        <p className="text-sm font-medium">{star}</p>
                        <div className="flex-1 bg-gray-200 h-2 rounded">
                          <div
                            className="bg-yellow-500 h-full rounded"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-medium">{star * 2}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between max-w-screen-md mx-auto border-2 p-4 rounded-md mt-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={AssistantIcon}
                    alt="chat-icon"
                    className="w-6 h-6"
                  />
                  <h1 className="text-md  text-[#212529]">
                    Chat with Assistant?
                  </h1>
                </div>
                <div className="text-xl text-black">&gt;</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="border-2 p-3 rounded-md flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#454545]">
                  Check Similar Consultants
                </h2>
                <FaInfoCircle className="h-6 w-6" />
              </div>
              <div className="border-2 p-3 rounded-md text-[#454545] text-xl font-bold mt-4">
                <h1>Users Review</h1>
                <div>
                  <ul className="space-y-4 mt-4">
                    {["Dixon", "Maverick", "Veronica"].map((consultant) => (
                      <li
                        key={consultant}
                        className="p-4 border-2 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <div className="flex">
                          <img
                            src={UserReviewImage}
                            alt="img"
                            className="rounded-full mr-4"
                          />
                          <p className="font-normal text-base text-[#212529]">
                            {consultant}
                          </p>
                        </div>
                        <p className="text-base font-normal text-[#666666]">
                          Amazing advice and clear guidance!
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-3xl text-center">
              Top <span className="text-[#FFD700]">E-Pooja</span> Destinations
            </h1>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                500: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper m-5 md:m-10"
            >
              {destinations.map((item) => (
                <SwiperSlide key={item}>
                  <div className="rounded-lg text-center bg-black p-1">
                    <img
                      src={item.image}
                      alt={item.heading}
                      className="object-cover h-[190px] w-full"
                    />
                    <h3 className="text-white text-base font-normal mt-1">
                      {item.heading}
                    </h3>
                    <p className="text-white text-xs font-normal">
                      {item.location}
                    </p>
                    <p className="text-white text-xs font-normal">
                      {item.state}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </section>
    </>
  );
};

export default PoojaProfile;
