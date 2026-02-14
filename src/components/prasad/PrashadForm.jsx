import React from "react";
import PrashadBanner from "../../assets/image/PrashadForm.jpeg";
import poojaformimage from "../../assets/image/poojaformimage.png";

function PrashadForm() {
  return (
    <>
      <section className="mt-20 flex flex-col items-center">
        <div className="relative h-screen w-full bg-black">
          <img
            src={PrashadBanner}
            alt="Shivlinga"
            className="absolute top-0 left-0 z-10 object-cover w-full h-full opacity-50"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 -translate-y-1/2 text-[#ffffff] text-center w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              Book Prashad
            </h1>
            <p className="font-medium text-xl sm:text-2xl lg:text-3xl mt-2">
              Transform Your space with positive energy
            </p>
            <button className="w-48 h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium mt-4">
              Book Now
            </button>
          </div>
        </div>
        <div className="rounded-2xl shadow-lg mt-10 border flex flex-col justify-center mx-5 sm:mx-10 md:flex-row">
          <div className="lg:w-1/2 flex justify-center md:p-10 p-5">
            <img
              src={poojaformimage}
              alt="Pandit form"
              className="h-[300px] w-full md:w-[500px] md:h-[700px] object-cover rounded-lg"
            />
          </div>
          <form className="lg:w-1/2 flex flex-col gap-8 justify-center md:p-10 p-5">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col w-full">
                <label className="font-bold text-lg">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full h-14 rounded-md border p-4 mt-2"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-bold text-lg">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full h-14 rounded-md border p-4 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Gotra <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="gotra"
                placeholder="Gotra"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Temple <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="temple"
                placeholder="Temple"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Packages <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="packages"
                placeholder="501, 1001, 2001"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                City / Village <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City / Village"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold text-lg">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full h-14 rounded-md border p-4 mt-2"
              />
            </div>
            <button className="md:w-48 w-full h-14 rounded-3xl bg-[#FFD700] hover:bg-[#FACC15] text-black text-2xl font-medium">
              Book Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default PrashadForm;
