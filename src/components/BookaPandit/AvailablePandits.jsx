import React, { useContext } from "react";
import PanditCard from "./PanditCard";
import { astroContext } from "../../context/astroContext";

const AvailablePandits = ({ panditsRef }) => {
  const { availPandits } = useContext(astroContext);
  console.log(availPandits);

  return (
    <>
      <section id="availablePandits" className="max-w-7xl mx-auto p-4">
        <div className="text-yellow-400 py-2 px-4 text-center mb-4">
          <h1 className="font-bold text-3xl">Book Pandit</h1>
          <h1 className="text-semibold text-md mt-4">
            Find Your Perfect Pandit for your pooja
          </h1>
        </div>

        {/* <div
          ref={panditsRef}
          className="flex flex-col lg:flex-row justify-between items-center mb-4 px-4"
        >
          <div className="flex justify-between items-center gap-8 sm:gap-28 w-full max-w-4xl mx-auto">
            <div className="bg-yellow-400 font-bold rounded-md px-6 py-2 text-center sm:text-left">
              Book a Pandit
            </div>
            <div className="text-sm font-medium mr-10 sm:ml-10">
              Available Balance: INR: 0.00
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
            <div className=" border border-green-800  text-green-800 rounded-md px-8 py-2 cursor-pointer w-full sm:w-auto">
              Recharge
            </div>
            <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
              <option>Filter</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
              <option>Sort by</option>
            </select>
            <div className="relative w-full sm:w-auto">
              <input
                type="search"
                placeholder="Search name..."
                className="border rounded pl-2 pr-8 py-2 text-sm w-full sm:w-auto"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-xs px-2 rounded">
                🔍
              </button>
            </div>
          </div>
        </div> */}

        <div className="flex flex-wrap gap-2 items-center justify-center p-4 bg-gray-50  w-full">
          {availPandits?.map((pandit) => (
            <PanditCard key={pandit._id} pandit={pandit} />
          ))}
        </div>
      </section>
    </>
  );
};
export default AvailablePandits;
