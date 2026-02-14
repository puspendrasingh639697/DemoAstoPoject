import React from "react";
import { Link } from "react-router-dom";
import ram from "../../assets/image/ram.png";
import exam from "../../assets/image/exam.webp";
const OtherServices = () => {
  const cards = [
    {
      title: "Vastu Shastra",
      description:
        "Harness the power of spatial energy to align your home with cosmic forces.",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqCpcTyqd6d6pJkiWE3DdnuRa_8GEThx_GunuGVyjTkoWPO__A4uX5WD8SVWE8edb3pfk&usqp=CAU",
      link: "/vastu-making",
    },
    {
      title: "Numerology",
      description:
        "Unlock the secrets hidden in numbers to guide your life path and destiny.",
      bgImage:
        "https://i.pinimg.com/474x/0d/a6/57/0da657b2a9397593a40d6a837324153a.jpg",
      link: "/numerology-calculator",
    },
    {
      title: "Ram Prashnavali",
      description:
        "Seek divine answers through sacred questions rooted in ancient tradition.",
      bgImage: ram,
      link: "/ram-shalaka",
    },
    {
      title: "Competitive Edge",
      description:
        "Explore your chances of success in competitive exams through astrology.",
      bgImage: exam,
      link: "/Competitive-Edge-prediction",
    },
    {
      title: "Travel Destiny",
      description:
        "Explore your chances of foreign travel through astrology based on your date of birth.",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxs82kXQiaA8EdRyKwDlhR5HkFsx0I7-3Fn7pXUIqTbihSZkLCQXL7DqplmODjP9FFI_U&usqp=CAU",
      link: "/foreign-travel-detail",
    },
  ];

  return (
    <div className="py-10 px-2 max-w-7xl mx-auto">
      <div className="text-center mb-9">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Our Other Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg sm:text-xl">
          Explore a range of ancient wisdom and practices to guide you on your
          life's journey.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative flex w-80 flex-col rounded-xl bg-white text-gray-700 shadow-md border-2 border-yellow-400 hover:scale-95 transition-transform duration-300"
          >
            {/* Top background banner */}
            <div
              className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${card.bgImage})` }}
            ></div>

            {/* Content */}
            <div className="p-6">
              <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
                {card.title}
              </h5>
              <p className="text-base text-gray-700">{card.description}</p>
            </div>

            {/* Button */}
            <div className="p-6 pt-0">
              <Link to={card.link}>
                <button className="bg-yellow-750 text-red-600 border border-yellow-600 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                  <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                  Read More..
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;
