import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Rishikesh from "../../assets/image/Rishikesh.png";
import Ujjain from "../../assets/image/Ujjain.png";
import Haridwar from "../../assets/image/Haridwar.png";
import Indore from "../../assets/image/Indore.png";
import Mathura from "../../assets/image/Mathura.png";
import Ayodhya from "../../assets/image/Ayodhya.png";
import Varanashi from "../../assets/image/Varanashi.png";
import Vrindavan from "../../assets/image/Vrindavan.png";
import Pragraj from "../../assets/image/Pragraj.png";
import Gorakhpur from "../../assets/image/Gorakhpur.png";
import Indiamap from "../../assets/image/Indiamap.png";
import Bhopal from "../../assets/image/Bhopal.png";

// Array of images and names
const locations = [
  { imgSrc: Indiamap, name: "All" },
  { imgSrc: Rishikesh, name: "Rishikesh" },
  { imgSrc: Mathura, name: "Mathura" },
  { imgSrc: Ujjain, name: "Ujjain" },
  { imgSrc: Indore, name: "Indore" },
  { imgSrc: Haridwar, name: "Haridwar" },
  { imgSrc: Ayodhya, name: "Ayodhya" },
  { imgSrc: Varanashi, name: "Varanashi" },
  { imgSrc: Vrindavan, name: "Vrindavan" },
  { imgSrc: Bhopal, name: "Bhopal" },
  { imgSrc: Pragraj, name: "Pragraj" },
  { imgSrc: Gorakhpur, name: "Gorakhpur" },
];

// const PoojaSlider = () => {
//   return (
//     <>
//       <div className="m-5">
//         <Swiper
//           slidesPerView={12}
//           spaceBetween={50}
//           loop={false}
//           // pagination={{
//           //   clickable: true,
//           // }}
//           navigation={false}
//           autoplay={false}
//           modules={[]}
//           className="mySwiper"
//         >
//           {locations.map((location, index) => (
//             <SwiperSlide key={index}>
//               <div className="flex flex-col items-center">
//                 <div className="rounded-2xl overflow-hidden w-full">
//                   <img
//                     src={location.imgSrc}
//                     alt={location.name}
//                     className="size-20 object-contain"
//                   />
//                 </div>
//                 <h1 className="text-gray-600 py-2 px-6">{location.name}</h1>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </>
//   );
// };

const PoojaSlider = () => {
  return (
    <div className="bg-white shadow-lg py-px mx-auto px-4 md:px-8 lg:px-10 max-w-screen-xl rounded-lg relative -bottom-6">
      <div className="m-3">
        <Swiper
          slidesPerView={2} // Default for small screens
          breakpoints={{
            640: { slidesPerView: 4 }, // Tablets
            768: { slidesPerView: 6 }, // Small laptops
            1024: { slidesPerView: 8 }, // Larger screens
            1280: { slidesPerView: 12 }, // Full width
          }}
          spaceBetween={10}
          loop={false}
          navigation={false}
          autoplay={false}
          modules={[]}
          className="mySwiper"
        >
          {locations.map((location, index) => (
            <SwiperSlide key={index} className="w-auto">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={location.imgSrc}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-gray-500 text-sm py-1 px-3">
                  {location.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PoojaSlider;
