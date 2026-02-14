// import React, { useState, useEffect, useRef } from "react";
// import { Star } from "lucide-react";
// import PanditImage2 from "../../assets/image/PanditImage2.jpeg";
// import PanditImage3 from "../../assets/image/PanditImage3.jpeg";
// import PanditImage4 from "../../assets/image/PanditImage4.jpeg";
// import PanditImage5 from "../../assets/image/PanditImage5.jpeg";
// import PanditImage6 from "../../assets/image/PanditImage6.jpeg";
// import PanditImage7 from "../../assets/image/PanditImage7.jpeg";
// import vector from "../../assets/vector1.png";

// const PanditCard = ({ image, firstName, languages, experience, Skills }) => (
//   <div className="bg-[#fff3b5] p-6 rounded-2xl shadow-lg text-center relative border border-gray-100 my-10">
//     <div className="w-32 h-32 mb-4 mx-auto relative flex items-center justify-center">
//       <img
//         src="https://img.freepik.com/premium-vector/classic-circle-ornament-weddings_832862-1059.jpg?semt=ais_hybrid&w=740"
//         className="absolute inset-0 w-full h-full object-contain z-0"
//         alt="vector"
//       />
//       <img
//         src={image}
//         alt={firstName}
//         className="rounded-full w-20 h-20 object-cover z-10"
//       />
//     </div>
//     <h3 className="font-bold text-lg mb-1 line-clamp-1">{firstName}</h3>
//     <div className="text-left">
//       <p className="text-black text-sm mb-1">
//         Language: <span className="text-gray-600">{languages}</span>
//       </p>
//       <p className="text-black text-sm mb-2 line-clamp-1">
//         Experience: <span className="text-gray-600">{experience}</span>
//       </p>
//       <p className="text-black text-sm mb-2 line-clamp-1">
//         Expertise: <span className="text-gray-600">{Skills}</span>
//       </p>
//       <div className="flex justify-center gap-1 mt-4">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className="w-4 h-4 fill-yellow-400 text-yellow-400"
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const PanditsSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [visibleSlides, setVisibleSlides] = useState(2);
//   const intervalRef = useRef(null);

//   const pandits = [
//     {
//       image: PanditImage2,
//       firstName: "Acharya Sheetal",
//       languages: "Hindi, English",
//       experience: "17 years",
//       Skills: "Vedic",
//     },
//     {
//       image: PanditImage3,
//       firstName: "Pandit Suresh Mishra",
//       languages: "Hindi",
//       experience: "10 years",
//       Skills: "Vedic Astrology",
//     },
//     {
//       image: PanditImage4,
//       firstName: "Acharya Shardha",
//       languages: "English",
//       experience: "15 years",
//       Skills: "Vedic Astrology",
//     },
//     {
//       image: PanditImage5,
//       firstName: "Pandit Anil Tripathi",
//       languages: "Hindi, Sanskrit",
//       experience: "22 years",
//       Skills: "Vedic Astrology, Vedic Pujan",
//     },
//     {
//       image: PanditImage7,
//       firstName: "pt. Raghav Mishra",
//       languages: "English, Hindi",
//       experience: "7 years",
//       Skills: "Vedic Astrology, Vedic Pujan",
//     },
//     {
//       image: PanditImage5,
//       firstName: "Acharya Nakul",
//       languages: "Hindi, Sanskrit",
//       experience: "9 years",
//       Skills: "Vedic Astrology",
//     },
//     {
//       image: PanditImage6,
//       firstName: "Pandit Hari Om",
//       languages: "English, Hindi",
//       experience: "6 years",
//       Skills: "Vedic Astrology, Tarot",
//     },
//   ];

//   const calculateVisibleSlides = () => {
//     if (typeof window !== "undefined") {
//       if (window.innerWidth >= 1024) return 4;
//       if (window.innerWidth >= 768) return 3;
//       return 2;
//     }
//     return 2;
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setVisibleSlides(calculateVisibleSlides());
//       setCurrentIndex((cur) => (cur > pandits.length - 1 ? 0 : cur));
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [pandits.length]);

//   const totalDots = pandits.length - visibleSlides + 1;

//   useEffect(() => {
//     if (!isHovered) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex + 1 >= totalDots ? 0 : prevIndex + 1
//         );
//       }, 3000);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [isHovered, totalDots]);

//   const handleDotClick = (dotIndex) => {
//     setCurrentIndex(dotIndex);
//   };

//   return (
//     <div className=" py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4">
//           Our Pandits
//         </h2>

//         <div
//           className="overflow-hidden"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{
//               transform: `translateX(-${
//                 (currentIndex * 100) / visibleSlides
//               }%)`,
//             }}
//           >
//             {pandits.map((pandit, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 px-2"
//                 style={{ width: `${100 / visibleSlides}%` }}
//               >
//                 <PanditCard {...pandit} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center gap-2 mt-6">
//           {Array.from({ length: totalDots }).map((_, dotIndex) => (
//             <button
//               key={dotIndex}
//               onClick={() => handleDotClick(dotIndex)}
//               className={`h-2 rounded-full transition-all ${
//                 currentIndex === dotIndex ? "w-8 bg-black" : "w-2 bg-gray-400"
//               }`}
//               aria-label={`Go to slide ${dotIndex + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PanditsSlider;

import { useState, useEffect, useRef } from "react";
import { Star, Globe, BookOpen, Sparkles } from "lucide-react";
import PanditImage2 from "../../assets/image/PanditImage2.jpeg";
import PanditImage3 from "../../assets/image/PanditImage3.jpeg";
import PanditImage4 from "../../assets/image/PanditImage4.jpeg";
import PanditImage5 from "../../assets/image/PanditImage5.jpeg";
import PanditImage6 from "../../assets/image/PanditImage6.jpeg";
import PanditImage7 from "../../assets/image/PanditImage7.jpeg";
import vector from "../../assets/vector1.png";
import { motion } from "framer-motion";

const PanditCard = ({ image, firstName, languages, experience, Skills }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 border my-3 border-gray-100">
    {/* Header with gradient background */}
    <div className="bg-yellow-300 py-1 text-center relative">
      <div className="relative z-10">
        <div className="w-32 h-32 mb-4 mx-auto relative flex items-center justify-center">
          <img
            src={vector}
            className="absolute inset-0 w-full h-full object-contain z-0"
            alt="vector"
          />
          <img
            src={image}
            alt={firstName}
            className="rounded-full w-20 h-20 object-cover z-10"
          />
        </div>
        <h3 className="font-bold text-base text-white mb-1 drop-shadow-sm">
          {firstName}
        </h3>
        <div className="flex justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-3 h-3 fill-white text-white drop-shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="bg-yellow-100 p-1 rounded-lg">
            <Globe className="w-3 h-3 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-700">Languages</p>
            <p className="text-gray-600 text-xs">{languages}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="bg-yellow-100 p-1 rounded-lg">
            <BookOpen className="w-3 h-3 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-700">Experience</p>
            <p className="text-gray-600 text-xs">{experience}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="bg-yellow-100 p-1 rounded-lg">
            <Sparkles className="w-3 h-3 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-700">Expertise</p>
            <p className="text-gray-600 text-xs line-clamp-2">{Skills}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PanditsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(2);
  const intervalRef = useRef(null);

  const pandits = [
    {
      image: PanditImage2,
      firstName: "Acharya Sheetal",
      languages: "Hindi, English",
      experience: "17 years",
      Skills: "Vedic",
    },
    {
      image: PanditImage3,
      firstName: "Pandit Suresh Mishra",
      languages: "Hindi",
      experience: "10 years",
      Skills: "Vedic Astrology",
    },
    {
      image: PanditImage4,
      firstName: "Acharya Shardha",
      languages: "English",
      experience: "15 years",
      Skills: "Vedic Astrology",
    },
    {
      image: PanditImage5,
      firstName: "Pandit Anil Tripathi",
      languages: "Hindi, Sanskrit",
      experience: "22 years",
      Skills: "Vedic Astrology, Vedic Pujan",
    },
    {
      image: PanditImage7,
      firstName: "pt. Raghav Mishra",
      languages: "English, Hindi",
      experience: "7 years",
      Skills: "Vedic Astrology, Vedic Pujan",
    },
    {
      image: PanditImage5,
      firstName: "Acharya Nakul",
      languages: "Hindi, Sanskrit",
      experience: "9 years",
      Skills: "Vedic Astrology",
    },
    {
      image: PanditImage6,
      firstName: "Pandit Hari Om",
      languages: "English, Hindi",
      experience: "6 years",
      Skills: "Vedic Astrology, Tarot",
    },
  ];
  const calculateVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 450) return 2;
      return 1;
    }
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(calculateVisibleSlides());
      setCurrentIndex((cur) => (cur > pandits.length - 1 ? 0 : cur));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pandits.length]);

  const totalDots = Math.max(1, pandits.length - visibleSlides + 1);

  useEffect(() => {
    if (!isHovered && totalDots > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 >= totalDots ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, totalDots]);

  const handleDotClick = (dotIndex) => {
    setCurrentIndex(dotIndex);
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  return (
    <div className="bg-yellow-50  max-w-7xl mx-auto relative py-6 px-14 h-1/2 overflow-x-hidden ">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center flex-1">
          Our Expert Pandits
        </h2>
        <motion.p
          className="text-gray-600 p-3  text-lg max-w-2xl mx-auto"
          initial={fadeInUp.hidden}
          whileInView={fadeInUp.visible}
          viewport={{ once: true }}
        >
          Connect with experienced spiritual advisors and astrologers for
          guidance and wisdom
        </motion.p>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleSlides}%)`,
          }}
        >
          {pandits.map((pandit, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-4"
              style={{ width: `${100 / visibleSlides}%` }}
            >
              <PanditCard {...pandit} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {totalDots > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalDots }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => handleDotClick(dotIndex)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === dotIndex
                  ? "w-8 bg-gradient-to-r from-yellow-400 to-amber-500"
                  : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PanditsSlider;
