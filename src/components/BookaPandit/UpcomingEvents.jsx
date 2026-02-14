import React from "react";
import GaneshImage from "../../assets/image/GaneshImage.png";
import ShivImage from "../../assets/image/ShivImage.png";
import DiwaliImage from "../../assets/image/DiwaliImage.png";

const events = [
  {
    title: "Ganesha Chaturthi",
    date: "September 07 2024, Saturday",
    description:
      "Ganesha Chaturthi is celebrated to honor Lord Ganesha. The festival begins on the fourth day of the Hindu month Bhadrapada.",
    image: GaneshImage,
    day: "07",
    dayName: "Saturday",
  },
  {
    title: "Diwali",
    date: "September 17 2024, Tuesday",
    description:
      "The full Moon day in the month of Ashadha is referred to as Sharadpurnima.",
    image: DiwaliImage,
    day: "17",
    dayName: "Tuesday",
  },
  {
    title: "Maha Shivaratri",
    date: "September 17 2024, Tuesday",
    description:
      "Maha Shivaratri is a key period in the Hindu calendar when Hindus pay homage to their ancestors through rituals and food offerings.",
    image: ShivImage,
    day: "17",
    dayName: "Tuesday",
  },
];

const UpcomingEvents = () => {
  return (
    <div className=" max-w-7xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Upcoming Events
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8 ">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden w-80 transform hover:bg-yellow-200 hover:scale-105 transition-transform"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 h-48">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{event.date}</p>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </div>
            <div className="flex justify-center mb-5">
              <div className="bg-yellow-500 text-white font-bold text-center py-2 px-2 w-fit rounded-lg">
                <p className="text-lg">{event.day}</p>
                <p className="text-sm">{event.dayName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
