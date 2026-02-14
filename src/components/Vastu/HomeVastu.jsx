import React from "react";

const GrahPoojaBenefits = () => {
  const benefits = [
    "Purifies the home environment",
    "Brings positive energy and vibes",
    "Ensures peace and prosperity",
    "Removes any negative influences",
    "Invokes blessings from deities",
  ];

  return (
    <div className="bg-[#FEF9C3] px-5 md:px-20 py-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-[#1F2937]">
        Congrats on Getting Your New Home!
      </h1>
      <p className="text-[#4A5568] text-lg text-center mt-5">
        Moving into a new home is a significant milestone. To ensure prosperity
        and peace in your new abode, it is essential to perform a Grah Pooja.
        This ancient ritual helps purify the space, ward off negative energies,
        and invite positive vibrations, ensuring a harmonious living
        environment.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#1F2937] text-center">
            Why Grah Pooja is Important
          </h2>
          <p className="text-[#718096] text-justify mt-2">
            Grah Pooja is a traditional ritual ceremony performed to cleanse and
            purify new spaces energetically. It is believed to remove any
            negative energies and bring positive vibes to the household. The
            ritual also creates an auspicious beginning, making way for
            blessings to repeatedly and consistently flow into your household.
          </p>
        </div>

        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-[#1F2937] text-center">
            Benefits of Grah Pooja
          </h2>
          <ul className="list-disc space-y-2 mt-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-[#718096]">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="bg-[#FFD700] text-center text-white p-4 rounded-[50px] mt-10">
        How to Perform Grah Pooja
      </button>
    </div>
  );
};

export default GrahPoojaBenefits;
