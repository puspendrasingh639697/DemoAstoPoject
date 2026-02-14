// import React from "react";
// import VastuDesc from "../../assets/image/VastuDesc.jpeg";

// const VastuShastraText = () => {
//   return (
//     <div className="flex flex-col items-center p-10 max-w-7xl mx-auto">
//       <h1 className="text-2xl sm:text-4xl font-bold text-black">
//         Creating Balance and Harmony in Your Living Environment
//       </h1>
//       <div className="flex flex-col md:flex-row mt-2 gap-5 md:gap-0">
//         <div className="w-full md:w-1/2 text-md md:text-lg text-[#454545] text-justify md:p-5">
//           <p>
//             Vastu Shastra, the ancient Indian science of architecture, blends
//             tradition with modern living by harmonizing your space with nature’s
//             energies. It fosters the flow of positive energy, enhancing
//             well-being and tranquility in your home, office, or commercial
//             spaces.
//           </p>
//           <p className="mt-3">
//             Whether you're planning a new construction or reimagining an
//             existing structure, incorporating Vastu principles can
//           </p>
//           <ul className="text-sm md:text-lg list-disc ml-10 flex flex-col gap-3 mt-3">
//             <li>
//               Create a serene home environment filled with peace and positivity.
//             </li>
//             <li>
//               Optimize office layouts to boost productivity and team harmony.
//             </li>
//             <li>
//               Design commercial spaces that attract success and prosperity.
//             </li>
//             <li>Support physical, emotional, and financial health.</li>
//             <li>Enhance happiness and success in daily life.</li>
//             <li>
//               Bring balance and harmony to all aspects of your surroundings with
//               the timeless wisdom of Vastu Shastra.
//             </li>
//           </ul>
//         </div>
//         <div className="w-full md:w-1/2 flex items-center md:py-20 px-10">
//           <img
//             src={VastuDesc}
//             alt=""
//             className="rounded-lg w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VastuShastraText;
import React from "react";
import VastuDesc from "../../assets/image/VastuDesc.jpeg";
const VastuShastraText = () => {
  return (
    <div className="min-h-screen  py-9 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl pb-2 font-bold text-transparent bg-clip-text bg-yellow-400 leading-tight">
            Creating Balance and Harmony
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mt-4 font-light">
            in Your Living Environment
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-gray-700 leading-relaxed">
                Vastu Shastra, the ancient Indian science of architecture,
                blends tradition with modern living by harmonizing your space
                with nature's energies. It fosters the flow of positive energy,
                enhancing well-being and tranquility in your home, office, or
                commercial spaces.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                Whether you're planning a new construction or reimagining an
                existing structure, incorporating Vastu principles can:
              </p>
            </div>

            {/* Benefits List */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Transform Your Space With:
              </h3>
              <ul className="space-y-4">
                {[
                  "Create a serene home environment filled with peace and positivity",
                  "Optimize office layouts to boost productivity and team harmony",
                  "Design commercial spaces that attract success and prosperity",
                  "Support physical, emotional, and financial health",
                  "Enhance happiness and success in daily life",
                  "Bring balance and harmony to all aspects of your surroundings with the timeless wisdom of Vastu Shastra",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-red-500/20 z-10"></div>
              <img
                src={VastuDesc}
                alt="Vastu Shastra architectural design showing balanced living spaces"
                className="w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-red-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-red-400 to-amber-400 rounded-full opacity-15"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-yellow-300 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Discover how Vastu Shastra can bring positive energy and harmony
              to your environment.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold py-3 px-8 rounded-full hover:from-amber-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VastuShastraText;
