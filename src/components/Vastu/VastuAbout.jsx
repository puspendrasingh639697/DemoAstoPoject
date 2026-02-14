import React from "react";
import Pandit from "../../assets/image/pandit.png";

const VastuAbout = () => {
  const AboutData = [
    {
      // img:,
      title: "Type of Space",
      discount: "",
    },
    {
      // img:,
      title: "Energy Map",
      discount: "40%",
    },
    {
      // img:,
      title: "Space Orientation",
      discount: "",
    },
    {
      // img:,
      title: "Furniture Orientation",
      discount: "40%",
    },
    {
      // img:,
      title: "Type of Space",
      discount: "",
    },
    {
      // img:,
      title: "Energy Map",
    },
    {
      // img:,
      title: "Space Orientation",
      discount: "40%",
    },
    {
      // img:,
      title: "Furniture Orientation",
      discount: "",
    },
    {
      // img:,
      title: "Type of Space",
      discount: "",
    },
    {
      // img:,
      title: "Energy Map",
      discount: "40%",
    },
    {
      // img:,
      title: "Space Orientation",
      discount: "",
    },
    {
      // img:,
      title: "Furniture Orientation",
      discount: "",
    },
    {
      // img:,
      title: "Type of Space",
      discount: "",
    },
    {
      // img:,
      title: "Energy Map",
      discount: "",
    },
    {
      // img:,
      title: "Space Orientation",
      discount: "40%",
    },
  ];

  return (
    <>
      <section className="my-20 flex flex-col items-center">
        <h1 className="uppercase text-center text-2xl sm:text-4xl  font-semibold">
          Discover about Vastu
        </h1>
        <p className="sm:text-3xl mt-2 text-center text-lg font-semibold">
          Personalized Vastu Guidance for a Balanced Life
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-20 mt-10 px-10">
          {AboutData.map((about,index) => (
            <div key={index} className="relative shadow-lg rounded-[40px] flex flex-col justify-center items-center p-10">
              <div className="h-36 w-36">
                <img
                  src={Pandit}
                  alt="AboutImages"
                  className="object-cover h-full w-full rounded-full"
                />
              </div>
              <h4 className="font-semibold text-xl text-center text-[#1E1E1E] mt-4">
                {about.title}
              </h4>
              <a
                href=""
                className="font-medium text-md underline text-[#555555] mt-2"
              >
                Load More
              </a>
              <label
                className={`absolute top-2 right-3 rounded-[35px] text-white p-2 ${
                  about.discount ? "bg-[#039855]" : "bg-white"
                }`}
              >
                {about.discount}
              </label>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default VastuAbout;
