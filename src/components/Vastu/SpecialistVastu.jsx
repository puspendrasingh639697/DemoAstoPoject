import React from "react";
import Dheeresh from "../../assets/image/Dheeresh.png";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const SpecialistProfile = () => {
  const specialists = [
    {
      name: "Dr. Dhanwesh Nayak",
      occupation: "Structural Engineer",
      qualifications: [
        "BTECH-Civil Engineering - Motion Minder Mahaviya University of Technology",
        "MTECH-Structural Engineering - Indian Institute of Technology (Banaras Hindu University), Varanasi",
      ],
      achievements: [
        "Seasoned Structural Consultant with extensive experience in designing various types of structures",
        "Expertise includes design of steel structures, water tanks, industrial facilities, commercial structures, and high-rise buildings",
      ],
      experience: "15 years",
    },

    {
      name: "Dr. Dhanwesh Nayak",
      occupation: "Structural Engineer",
      qualifications: [
        "BTECH-Civil Engineering - Motion Minder Mahaviya University of Technology",
        "MTECH-Structural Engineering - Indian Institute of Technology (Banaras Hindu University), Varanasi",
      ],
      achievements: [
        "Seasoned Structural Consultant with extensive experience in designing various types of structures",
        "Expertise includes design of steel structures, water tanks, industrial facilities, commercial structures, and high-rise buildings",
      ],
      experience: "15 years",
    },
  ];

  return (
    <div className="p-5 md:p-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center sm:text-4xl">
          Our <br />
          <span className="text-yellow-400"> Specialists</span>
        </h2>

        <div className="mt-10">
          {specialists.map((specialist, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row mt-10"
            >
              <div className="w-full md:w-1/3 h-full p-5 flex justify-center">
                <img
                  src={Dheeresh}
                  alt={specialist.name}
                  className="w-40 md:w-full h-full object-cover"
                />
              </div>

              <div className="md:w-2/3 p-5">
                <h3 className="text-2xl font-semibold text-[#FFD700]">
                  {specialist.name}
                </h3>
                <p className="text-[#4A5568] text-lg mt-2">
                  <span className="font-semibold">Occupation:</span>{" "}
                  {specialist.occupation}
                </p>

                <div className="mt-5">
                  <h4 className="font-semibold text-xl text-[#1F2937]">
                    🎓 Qualifications
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    {specialist.qualifications.map((qual, idx) => (
                      <li key={idx} className="text-justify">
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h4 className="font-semibold text-xl text-[#1F2937]">
                    🏆 Achievements
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    {specialist.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-justify">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <p className="text-[#4A5568] text-lg">
                    <span className="font-semibold">Experience:</span>{" "}
                    {specialist.experience}
                  </p>
                  <div className="flex gap-3">
                    <FaLinkedin className="w-5 h-5 text-[#1D4ED8] cursor-pointer" />
                    <FaInstagram className="w-5 h-5 text-[#DB2777] cursor-pointer" />
                    <FaTwitter className="w-5 h-5 text-[#60A5FA] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialistProfile;
