// import React from "react";
// import Homevastu from "../../assets/image/Homevastu.png";
// import Officevastu from "../../assets/image/Officevastu.png";
// import Commercialvastu from "../../assets/image/Commercialvastu.png";
// import VastuHelp from "../../assets/image/PoojaHelp.png";
// import Vastutips from "../../assets/image/Vastutips.png";
// import VastuHelpDiv from "../../assets/flagsicon/VastuHelp.png";
// import Apartment from "../../assets/image/apartmentvastu.png";
// import Cancer from "../../assets/flagsicon/Cancer.png";
// import Gemini from "../../assets/flagsicon/Gemini.png";
// import Leo from "../../assets/flagsicon/Leo.png";
// import Taurus from "../../assets/flagsicon/Taurus (1).png";

// const ServicesWeProvide = () => {
//   const services = [
//     {
//       title: "HOME VASTU",
//       description:
//         "Key principles of Home Vastu include the proper orientation of rooms, placement of furniture, and selection of colors to optimize energy flow.",
//       image: Homevastu, // Replace with actual image URL
//       symbol: "♋", // Replace with your zodiac symbols or SVG paths
//     },
//     {
//       title: "APARTMENT VASTU",
//       description:
//         "Office Vastu focuses on the strategic arrangement of office elements to harness positive energy flows.",
//       image: Apartment, // Replace with actual image URL
//       symbol: "♋", // Replace with your zodiac symbols or SVG paths
//     },
//     {
//       title: "OFFICE VASTU",
//       description:
//         "Office Vastu focuses on the strategic arrangement of office elements to harness positive energy flow.",
//       image: Officevastu,
//       symbol: "♌",
//     },
//     {
//       title: "COMMERCIAL VASTU",
//       description:
//         "The layout and orientation of commercial spaces are tailored to enhance financial stability, customer flow, and overall business growth.",
//       image: Commercialvastu,
//       symbol: "♉",
//     },
//     {
//       title: "VASTU TIPS",
//       description:
//         "Vastu tips offer practical guidance for aligning your living or working spaces with harmonious energies to enhance well-being and prosperity.",
//       image: Vastutips,
//       symbol: "♊",
//     },
//   ];

//   return (
//     <>
//       <div className="bg-gradient-to-b from-[#FBFF00] to-[#FFA600] py-12 px-6">
//         <h2 className="text-black text-center mb-3 text-2xl sm:text-4xl font-semibold">
//           SERVICES WE PROVIDE
//         </h2>
//         <h6 className="text-center mb-2 text-lg font-semibold">
//           Tailored Vastu Solutions for Every Space
//         </h6>
//         <div className="grid md:grid-cols-3 gap-x-px gap-y-1 place-items-center max-w-screen-xl mx-auto ">
//           <div className="flex flex-col items-center justify-center text-white text-lg font-bold h-80 md:w-80 p-4 overflow-hidden border border-white">
//             <img
//               src={services[0].image}
//               alt={services[0].title}
//               className="w-full h-40 object-cover  mb-4"
//             />

//             <h3 className="text-black text-xl font-bold">
//               {services[0].title}
//             </h3>

//             <p className="text-gray-700 text-xs mt-2">
//               {services[0].description}
//             </p>
//           </div>

//           <div className="flex items-center justify-center h-80 md:w-80">
//             <img src={Cancer} alt="Placeholder" className="h-20 w-20" />
//           </div>

//           <div className="flex flex-col items-center justify-center text-white text-lg font-bold h-80 md:w-80 p-4 overflow-hidden border border-white">
//             <img
//               src={services[1].image}
//               alt={services[1].title}
//               className="w-full h-40 object-cover  mb-4"
//             />

//             <h3 className="text-black text-xl font-bold">
//               {services[1].title}
//             </h3>

//             <p className="text-gray-700 text-xs mt-2">
//               {services[1].description}
//             </p>
//           </div>

//           <div className="flex items-center justify-center h-80 md:w-80">
//             <img src={Leo} alt="Placeholder" className="h-20 w-20" />
//           </div>

//           <div className="flex flex-col items-center justify-center text-white text-lg font-bold h-80 md:w-80 p-4 overflow-hidden border border-white">
//             <img
//               src={services[2].image}
//               alt={services[2].title}
//               className="w-full h-40 object-cover  mb-4"
//             />

//             <h3 className="text-black text-xl font-bold">
//               {services[2].title}
//             </h3>

//             <p className="text-gray-700 text-xs mt-2">
//               {services[2].description}
//             </p>
//           </div>

//           <div className="flex items-center justify-center h-80 md:w-80">
//             <img src={Gemini} alt="Placeholder" className="h-20 w-20" />
//           </div>

//           <div className="flex flex-col items-center justify-center text-white text-lg font-bold h-80 md:w-80 p-4 overflow-hidden border border-white">
//             <img
//               src={services[3].image}
//               alt={services[3].title}
//               className="w-full h-40 object-cover  mb-4"
//             />

//             <h3 className="text-black text-xl font-bold">
//               {services[3].title}
//             </h3>

//             <p className="text-gray-700 text-xs mt-2">
//               {services[3].description}
//             </p>
//           </div>

//           <div className="flex items-center justify-center h-80 md:w-80">
//             <img src={Taurus} alt="Placeholder" className="h-20 w-20" />
//           </div>

//           <div className="flex flex-col items-center justify-center text-white text-lg font-bold h-80 md:w-80 p-4 overflow-hidden border border-white">
//             <img
//               src={services[4].image}
//               alt={services[4].title}
//               className="w-full h-40 object-cover  mb-4"
//             />

//             <h3 className="text-black text-xl font-bold">
//               {services[4].title}
//             </h3>

//             <p className="text-gray-700 text-xs mt-2">
//               {services[4].description}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="p-5 md:p-10">
//         <div className="bg-[#FBEFB1] rounded-[50px] text-center p-10">
//           <h1 className="text-black text-2xl sm:text-4xl  font-semibold">
//             How We Help You
//           </h1>
//           <p className="sm:text-3xl mt-5 text-black text-lg font-semibold">
//             Personalized Vastu Guidance for a Balanced Life
//           </p>
//           <div className="flex flex-col md:flex-row md:mt-10 gap-10">
//             <div className="w-full md:w-1/2">
//               <p className="text-lg sm:text-2xl text-justify text-[#454545]">
//                 Our expert Vastu consultants analyze your space, understand your
//                 needs, and provide actionable recommendations to harmonize your
//                 environment. Whether it’s room placements, furniture
//                 orientation, or structural advice, we ensure every detail is
//                 aligned to attract positivity and prosperity.
//               </p>
//               <div className="mt-5">
//                 <img
//                   src={VastuHelpDiv}
//                   alt="VastuHelpDiv"
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//             <div className="w-full md:w-1/2">
//               <img
//                 src={VastuHelp}
//                 alt="VastuHelp"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServicesWeProvide;
import React from "react";
import Homevastu from "../../assets/image/Homevastu.png";
import Officevastu from "../../assets/image/Officevastu.png";
import Commercialvastu from "../../assets/image/Commercialvastu.png";
import VastuHelp from "../../assets/image/PoojaHelp.png";
import Vastutips from "../../assets/image/Vastutips.png";
import VastuHelpDiv from "../../assets/flagsicon/VastuHelp.png";
import Apartment from "../../assets/image/apartmentvastu.png";
import Cancer from "../../assets/flagsicon/Cancer.png";
import Gemini from "../../assets/flagsicon/Gemini.png";
import Leo from "../../assets/flagsicon/Leo.png";
import Taurus from "../../assets/flagsicon/Taurus (1).png";
const ServicesWeProvide = () => {
  const services = [
    {
      title: "HOME VASTU",
      description:
        "Key principles of Home Vastu include the proper orientation of rooms, placement of furniture, and selection of colors to optimize energy flow.",
      image: Homevastu,
      symbol: "♋",
      color: "from-rose-400 to-pink-500",
    },
    {
      title: "APARTMENT VASTU",
      description:
        "Office Vastu focuses on the strategic arrangement of office elements to harness positive energy flows.",
      image: Apartment,
      symbol: "♋",
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "OFFICE VASTU",
      description:
        "Office Vastu focuses on the strategic arrangement of office elements to harness positive energy flow.",
      image: Officevastu,
      symbol: "♌",
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "COMMERCIAL VASTU",
      description:
        "The layout and orientation of commercial spaces are tailored to enhance financial stability, customer flow, and overall business growth.",
      image: Commercialvastu,
      symbol: "♉",
      color: "from-purple-400 to-violet-500",
    },
    {
      title: "VASTU TIPS",
      description:
        "Vastu tips offer practical guidance for aligning your living or working spaces with harmonious energies to enhance well-being and prosperity.",
      image: Vastutips,
      symbol: "♊",
      color: "from-amber-400 to-orange-500",
    },
  ];

  const zodiacIcons = [
    { symbol: "♋", color: "from-rose-400 to-pink-500" },
    { symbol: "♌", color: "from-blue-400 to-indigo-500" },
    { symbol: "♊", color: "from-green-400 to-emerald-500" },
    { symbol: "♉", color: "from-purple-400 to-violet-500" },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 min-h-screen">
      {/* Services Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
              SERVICES WE PROVIDE
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Tailored Vastu Solutions for Every Space
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <React.Fragment key={service.title}>
                {/* Service Card */}
                <div className="group relative">
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Decorative corner */}
                    <div
                      className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      <span className="text-sm">{service.symbol}</span>
                    </div>
                  </div>
                </div>

                {/* Zodiac Icon (between service cards) */}
                {index < zodiacIcons.length && (
                  <div className="hidden md:flex items-center justify-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${zodiacIcons[index].color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
                    >
                      <span className="text-white text-2xl font-bold">
                        {zodiacIcons[index].symbol}
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* How We Help Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm border border-white/20">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                How We Help You
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-medium">
                Personalized Vastu Guidance for a Balanced Life
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Our expert Vastu consultants analyze your space, understand
                    your needs, and provide actionable recommendations to
                    harmonize your environment. Whether it's room placements,
                    furniture orientation, or structural advice, we ensure every
                    detail is aligned to attract positivity and prosperity.
                  </p>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m8 7 4-4 4 4"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Space Analysis
                    </h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive evaluation of your environment
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Custom Solutions
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tailored recommendations for your needs
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-3 px-8 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Get Consultation
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://www.vihav.com/wp-content/uploads/importance-of-vastu-shastra-in-real-estate.webp"
                    alt="Vastu Consultation"
                    className="w-full h-[400px] lg:h-[500px] object-fit transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-15 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesWeProvide;
